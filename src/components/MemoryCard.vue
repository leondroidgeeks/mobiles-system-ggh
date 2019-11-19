<template>
<div class="card my-2">
  <div class="card-body d-flex flex-row justify-content-between align-items-center w-100">
    <img v-if="memory.MediaSource" class="card-img-left" :src="memory.MediaSource" alt="">
    <img v-else-if="event && memory.RelatedEvent != 'OwnEvent' && event.MediaSource" class="card-img-left" :src="event.MediaSource" alt="">
    <img v-else-if="event && memory.RelatedEvent != 'OwnEvent' && !event.MediaSource" class="card-img-left" src="../assets/grass_schnecke_viereckig.jpg" alt="">
    <img v-else-if="memory.RelatedEvent == 'OwnEvent'" class="card-img-left" src="../assets/own-event.png" alt="">
    <div class="content">
      <p class="card-text" style="white-space: pre-wrap;">{{memory.Content}}</p>
      <p v-if="memory.Type == 'range'" class="text-muted"><span v-if="event">{{event.Name}} </span>{{(event && event.Name) ? 'von' : 'Von'}} {{start}} bis {{end}}</p>
      <p v-if="memory.Type == 'point'" class="text-muted"><span v-if="event">{{event.Name}} </span>{{(event && event.Name) ? 'in' : 'In'}} {{start}}</p>
    </div>
  </div>
  <div class="card-footer d-flex flow-row justify-content-between">
    <button @click="editMemory()" class="btn btn-primary" type="button" name="button">
      <i class="fa fa-pencil"></i>
      Bearbeiten
    </button>
    <button class="btn btn-primary" type="button" name="button" data-toggle="modal" data-target="#deleteModal">
      <i class="fa fa-trash"></i>
      Löschen
    </button>
  </div>
  <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Soll die Erinnerung gelöscht werden?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-block mt-0" data-dismiss="modal">Abbrechen</button>
          <button @click="deleteMemory()" type="button" class="btn btn-primary btn-block mt-0">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "memory-card",
  props: [
    'memory'
  ],
  data() {
    return {
      event: null
    }
  },
  computed: {
    start() {
      return moment(this.memory.Start).local().year();
    },
    end() {
      return moment(this.memory.End).local().year();
    }
  },
  created() {
    if (this.memory.RelatedEvent != "OwnEvent") {
      $.get('https://dev-imis-xapi.nemo.network/xapi/historytelling/memory?pId=' + this.memory.RelatedEvent, data => {
        this.event = data;
      });
    } else if (this.memory.RelatedEvent == 'OwnEvent') {
      this.event = {
        Name: "Eigener Zeitpunkt",
        MediaSource: null
      };
    }
  },
  methods: {
    deleteMemory() {
      $('#deleteModal').modal('hide');
      this.$emit('delete');
    },
    editMemory() {
      this.$emit('edit');
    }
  }
}
</script>

<style scoped>
.card-img-left {
  width: 30%;
  height: auto;
  padding-right: 1rem;
}

.content {
  width: 70%;
  float: right;
}

.card-body,
.card-footer {
  padding: 0.75rem;
}
</style>
