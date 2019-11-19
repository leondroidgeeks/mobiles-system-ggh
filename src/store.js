import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid/v4'
import $ from 'jquery'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: {
      username: null,
      id: null
    },
    loggedinStatus: false,
    steps: [
      {
        name: "Ereignis",
        link: "EreignisAuswählen",
        icon: "fa fa-calendar fa-2x"
      }, {
        name: "Inhalt",
        link: "Inhalt",
        icon: "fa fa-align-left fa-2x"
      }
    ],
    events: [],
    choosenEvent: false,
    memory: {
      Content: "",
      Start: "",
      End: "",
      Type: "",
      MediaSource: null,
      MediaType: null
    },
    memories: [],
    edit: false,
    help: [],
    started: false,
    cameraAllowed: false
  },
  mutations: {
    memoriesLoad(state, memories) {
      state.memories = memories;
    },
    memoryContent(state, content) {
      state.memory.Content = content;
    },
    memoryPicture(state, picture) {
      if (picture) {
        state.memory.MediaSource = picture;
        state.memory.MediaType = picture.type;
      } else {
        state.memory.MediaSource = null;
        state.memory.MediaType = null;
      }
    },
    memoryNew(state, memory) {
      state.memories.push(memory);
    },
    memoryLoad(state, memory) {
      state.memory = memory;
    },
    memoryClear(state) {
      state.memory = {};
      state.memory.event = null;
      state.memory.Content = "";
      state.memory.Start = "";
      state.memory.End = "";
      state.memory.MediaSource = null;
      state.memory.MediaType = null;
      state.edit = false;
    },
    memoryDelete(state, memory) {
      state.memories.splice(state.memories.indexOf(memory), 1);
    },
    memoryUpdate(state, update) {
      for (var memory of state.memories) {
        if (memory.Id == update.Id) {
          state.memories.splice(state.memories.indexOf(memory), 1, update);
          break;
        }
      }
    },
    login(state, payload) {
      localStorage.setItem('username', payload.username);
      localStorage.setItem('id', payload.id);
      localStorage.setItem('loggedinStatus', JSON.stringify(true));
      state.user.username = payload.username;
      state.user.id = payload.id;
      state.loggedinStatus = true;
    },
    logout(state) {
      localStorage.setItem('loggedinStatus', JSON.stringify(false));
      state.user.username = null;
      state.user.id = null;
      state.loggedinStatus = false;
    },
    eventsLoad(state, events) {
      state.events = [];
      state.events = events;
    },
    eventChoose(state, event) {
      state.choosenEvent = event;
    },
    eventClear(state) {
      state.choosenEvent = false;
    },
    edit(state, edit) {
      state.edit = edit;
    },
    helpLoad(state, help) {
      state.help = help;
    },
    started(state, started) {
      state.started = started;
    },
    cameraAllowed(state, cameraAllowed) {
      state.cameraAllowed = cameraAllowed;
    }
  },
  actions: {
    loadMemories({commit, state}) {
      return new Promise(function(resolve, reject) {
        $.get('https://dev-imis-xapi.nemo.network/xapi/historytelling/memory/bycategory?pCategoryId=' + state.user.id, data => {
          commit('memoriesLoad', data);
          resolve();
        }).fail(() => reject());
      });
    },
    sendMemory({commit, state}) {
      var memory = {
        Id: uuid(),
        CategoryId: state.user.id,
        Nickname: state.user.username,
        Name: "",
        Content: state.memory.Content,
        RelatedEvent: state.choosenEvent.Id,
        Start: state.choosenEvent.Start,
        End: state.choosenEvent.End,
        Type: state.choosenEvent.Type,
        EventType: "visitor",
        Created: moment().local().format()
      }

      return new Promise(function(resolve, reject) {
        if (state.memory.MediaSource) {
          ImageTools.resize(state.memory.MediaSource, {
            width: 600,
            height: 100000
          }, (blob, didItResize) => {
            var data = new FormData();
            data.append('', blob);
            console.log(memory);

            $.when($.post('https://dev-imis-xapi.nemo.network/xapi/historytelling/memory/new', memory), $.ajax({
              url: 'https://dev-imis-xapi.nemo.network/xapi/historytelling/memory/media/add?pMemoryId=' + memory.Id,
              data: data,
              cache: false,
              contentType: false,
              processData: false,
              mimeType: "multipart/form-data",
              method: 'POST'
            })).then(() => {
              commit('memoryNew', memory);
              commit('memoryClear');
              commit('eventClear');
              resolve();
            }, () => {
              reject();
            });
          });
        } else {
          $.post('https://dev-imis-xapi.nemo.network/xapi/historytelling/memory/new', memory, () => {
            commit('memoryNew', memory);
            commit('memoryClear');
            commit('eventClear');
            resolve();
          }).fail(() => reject());
        }
      });

    },
    updateMemory({
      commit,
      state
    }, id) {
      return new Promise((resolve, reject) => {
        var memory = {
          Id: id,
          CategoryId: state.user.id,
          Nickname: state.user.username,
          Name: "",
          Content: state.memory.Content,
          RelatedEvent: state.choosenEvent.Id,
          Start: state.choosenEvent.Start,
          End: state.choosenEvent.End,
          Type: state.choosenEvent.Type,
          EventType: "visitor",
          Created: state.memory.Created
        }

        if (!state.memory.MediaSource || state.memory.MediaSource == "") {
          $.when($.post('https://dev-imis-xapi.nemo.network/xapi/historytelling/memory/update', memory), $.post('https://dev-imis-xapi.nemo.network/xapi/historytelling/memory/media/remove?pMemoryId=' + memory.Id)).then(() => {
            commit('memoryUpdate', memory);
            commit('memoryClear');
            commit('eventClear');
            resolve();
          }, () => reject());
        } else if (typeof state.memory.MediaSource == "string") {
          $.post('https://dev-imis-xapi.nemo.network/xapi/historytelling/memory/update', memory, data => {
            commit('memoryUpdate', memory);
            commit('memoryClear');
            commit('eventClear');
            resolve();
          }).fail(() => reject());
        } else {
          ImageTools.resize(state.memory.MediaSource, {
            width: 600,
            height: 10000
          }, (blob, didItResize) => {
            var data = new FormData();
            data.append('', blob);
            $.when($.post('https://dev-imis-xapi.nemo.network/xapi/historytelling/memory/update', memory), $.ajax({
              url: 'https://dev-imis-xapi.nemo.network/xapi/historytelling/memory/media/add?pMemoryId=' + memory.Id,
              data: data,
              cache: false,
              contentType: false,
              processData: false,
              mimeType: "multipart/form-data",
              method: 'POST'
            })).then(() => {
              commit('memoryUpdate', memory);
              commit('memoryClear');
              commit('eventClear');
              resolve();
            }, () => reject());
          });
        }
      });
    },
    deleteMemory({
      commit
    }, memory) {
      $.ajax({
        url: 'https://dev-imis-xapi.nemo.network/xapi/historytelling/memory/delete?pId=' + memory.Id,
        type: 'DELETE',
        success: function() {
          commit('memoryDelete', memory);
        }
      });
    },
    loadEvents({commit}) {
      return new Promise(function(resolve, reject) {
        $.get('https://dev-imis-xapi.nemo.network/xapi/historytelling/memory/bycategory?pCategoryId=gg', data => {
          commit('eventsLoad', data);
          resolve();
        }).fail(() => reject());
      });
    },
    loadEvent({
      commit
    }, id) {
      return new Promise((resolve, reject) => {
        $.get('https://dev-imis-xapi.nemo.network/xapi/historytelling/memory?pId=' + id, data => {
          if (data == null) {
            reject();
          } else {
            commit('eventChoose', data);
          }
          resolve();
        }).fail(() => reject());
      });
    },
    loadHelp({commit}) {
      commit('helpLoad', require('./assets/help.json'))
    },
    login({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        var id;
        var username;
        if (payload.new) {
          id = uuid();
          username = payload.username;
          $.post('https://dev-imis-xapi.nemo.network/xapi/historytelling/category/new', {
            Id: id,
            Name: username,
            Created: moment().toISOString()
          }, () => {
            commit('login', {
              id: id,
              username: username
            });
            resolve();
          }).fail(() => reject());
        } else {
          id = localStorage.getItem('id');
          username = localStorage.getItem('username');
          commit('login', {
            id: id,
            username: username
          });
          resolve();
        }
      });
    }
  }
})
