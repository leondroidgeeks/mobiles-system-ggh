<template>
<div>
  <vue-headful :title="edit ? 'Inhalt bearbeiten' : 'Inhalt hinzufügen'" />
  <steps :steps="$store.state.steps" active=1></steps>
  <process-card :heading="edit ? 'Inhalt bearbeiten' : 'Inhalt hinzufügen'" infoText="Als nächsten Schritt können Sie den Inhalt Ihrer Erinnerung verfassen. Dies können Sie nach Belieben in Textform und/ oder durch Hinzufügen eines Fotos tun." :feedbackText="error">
    <exhibit-card v-if="event" :exhibit="event"></exhibit-card>
    <button class="btn btn-primary btn-block mt-2 mb-4" data-toggle="modal" data-target="#changeModal">{{event ? 'Ereignis ändern' : 'Ereignis hinzufügen'}}</button>
    <textarea :value="memory.Content" @input="updateContent" class="form-control" name="name" rows="8" cols="80" placeholder="Erinnerung"></textarea>
    <div class="text-center mt-4">
      <button v-if="!currentPicture" class="btn btn-primary media-button" data-toggle="modal" data-target="#mediaModal">
        Foto hinzufügen
        <br>
        <i class="fa fa-camera" aria-hidden="true"></i>
      </button>
      <div v-if="currentPicture">
        <img :src="currentPicture" alt="" class="img-fluid">
        <button @click="deletePicture()" class="btn btn-primary btn-block mt-4" type="button" name="button">
          <i class="fa fa-trash"></i>
          Foto löschen
        </button>
      </div>
    </div>
  </process-card>
  <button class="btn btn-primary btn-block my-4" data-toggle="modal" data-target="#sendModal">{{edit ? 'Erinnerung aktualisieren' : 'Erinnerung abschicken'}}</button>
  <div class="modal fade" id="sendModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Soll die Erinnerung {{edit ? 'aktualisiert' : 'abgeschickt'}} werden?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
          <p class="m-0">Die Erinnerung wird direkt auf dem Zeitstrahl veröffentlicht.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-block mt-0" data-dismiss="modal">Abbrechen</button>
          <button @click="send()" type="button" class="btn btn-primary btn-block mt-0">{{edit ? 'Aktualisieren' : 'Abschicken'}}</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="changeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">{{event ? 'Wollen Sie ein anderes Ereignis auswählen?' : 'Wollen Sie ein Ereignis hinzufügen?'}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-block mt-0" data-dismiss="modal">Abbrechen</button>
          <button @click="change()" type="button" class="btn btn-primary btn-block mt-0">Ja</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="mediaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Wollen Sie ein vorhandenes Foto auswählen oder ein Foto aufnehmen?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid m-0 p-0 no-gutters">
            <div class="row justify-content-between">
              <div class="col-6 col-sm-5 col-md-auto">
                <label v-if="!currentPicture" class="btn btn-primary media-button w-100">
                  Foto auswählen
                  <br>
                  <i class="fa fa-image" aria-hidden="true"></i>
                  <input @change="readData($event)" type="file" class="d-none" accept="image/*">
                </label>
              </div>
              <div class="col-6 col-sm-5 col-md-auto">
                <label v-if="!currentPicture" class="btn btn-primary media-button w-100">
                  Foto aufnehmen
                  <br>
                  <i class="fa fa-camera" aria-hidden="true"></i>
                  <input @change="readData($event)" type="file" class="d-none" accept="image/*" capture="camera">
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'

import Steps from '@/components/Steps.vue'
import ProcessCard from '@/components/ProcessCard.vue'
import ExhibitCard from '@/components/ExhibitCard.vue'

import uuid from 'uuid/v4'

export default {
  name: 'MemoryContent',
  components: {
    Steps,
    ProcessCard,
    ExhibitCard
  },
  data() {
    return {
      error: null,
      id: null,
      currentPicture: null
    }
  },
  computed: {
    memory() {
      return this.$store.state.memory;
    },
    event() {
      return this.$store.state.choosenEvent;
    },
    edit() {
      return this.$store.state.edit;
    }
  },
  created() {
    this.id = this.$route.query.id;
    if (!this.event) {
      if (this.memory.RelatedEvent == "OwnEvent") {
        this.$store.commit('eventChoose', {
          Id: "OwnEvent",
          Name: "Eigener Zeitpunkt",
          Start: this.memory.Start,
          End: this.memory.End,
          Type: this.memory.Type,
          MediaSource: "@/assets/holstentor.jpg"
        });
      } else if (this.memory.RelatedEvent && this.memory.RelatedEvent != "OwnEvent") {
        this.$store.dispatch('loadEvent', this.memory.RelatedEvent);
      }
    }
    if (this.memory.MediaSource) {
      this.currentPicture = this.memory.MediaSource;
    }
    if (this.edit) {
      this.error = "Sie bearbeiten derzeit eine bestehende Erinnerung. Um eine neue Erinnerung zu erstellen, brechen Sie vorerst das Bearbeiten der aktuellen Erinnerung ab."
    }
  },
  methods: {
    readData(e) {
      $('#mediaModal').modal('hide');
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      if (this.currentPicture) URL.revokeObjectURL(this.currentPicture);
      this.currentPicture = URL.createObjectURL(files[0]);
      this.$store.commit('memoryPicture', files[0]);
    },
    deletePicture() {
      if (this.currentPicture) {
        URL.revokeObjectURL(this.currentPicture);
        this.currentPicture = null;
      }
      this.$store.commit('memoryPicture', null);
    },
    send() {
      $('#sendModal').modal('hide');
      if (!this.event) {
        this.error = "Bitte fügen Sie ein Exponat oder Ereignis hinzu, das diese Erinnerung bei Ihnen ausgelöst hat. Klicken Sie dazu auf den Button 'Ereignis hinzufügen'.";
        $('#sendModal').on('hidden.bs.modal', function() {
          window.scrollTo(0, 0);
        });
        return;
      }
      if (this.memory.Content) this.memory.Content = this.memory.Content.trim();
      if (this.memory.Content == "" && this.currentPicture == null) {
        this.error = "Bitte schreiben Sie einen Text oder fügen Sie der Erinnerung ein Bild hinzu.";
        $('#sendModal').on('hidden.bs.modal', function() {
          window.scrollTo(0, 0);
        });
        return;
      }
      if (this.edit) {
        this.$store.dispatch('updateMemory', this.memory.Id)
          .then(() => this.$router.push('/start'), () => {
            window.scrollTo(0, 0);
            this.error = "Ein Fehler beim Aktualisieren der Erinnerung ist aufgetreten.";
          });
      } else {
        this.$store.dispatch('sendMemory')
          .then(() => this.$router.push('/start'), () => {
            window.scrollTo(0, 0);
            this.error = "Ein Fehler beim Absenden der Erinnerung ist aufgetreten.";
          });
      }
    },
    change() {
      $('#changeModal').modal('hide');
      this.$router.push('/erstellen/ereignis');
    },
    updateContent(e) {
      this.$store.commit('memoryContent', e.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
// .picture-delete {
//     top: 0;
//     right: 0;
//     cursor: pointer;
// }
</style>
