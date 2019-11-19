<template>
<div>
  <vue-headful title="Ereignis auswählen" />
  <steps :steps="$store.state.steps" active=0></steps>
  <process-card heading="Ereignis auswählen" infoText="Im ersten Schritt wählen Sie das Exponat oder Ereignis aus dem Leben von Günter Grass aus, welches die Erinnerung ausgelöst hat, die Sie hinzufügen möchten. Dazu können Sie den QR-Code eines bestimmten Ausstellungsstücks scannen oder das Ereignis in der Liste unten suchen. Sollte sich Ihre Erinnerung auf einen individuellen Zeitpunkt beziehen, können Sie diesen über den Button 'Eigenen Zeitpunkt auswählen' angeben.">
    <router-link tag="button" class="btn btn-primary btn-block mb-4" :to="{name: 'QRScan'}">Exponat scannen</router-link>
    <router-link tag="button" class="btn btn-primary btn-block mb-4" :to="{name: 'EreignisErstellen'}">Eigenen Zeitpunkt auswählen</router-link>
    <input @keyup="filter($event)" class="form-control" type="text" name="" value="" placeholder="Ereignisse durchsuchen">
    <exhibit-card v-for="event in filteredEvents" :key="event.Id" :exhibit="event" @clicked="clickExhibit(event)"></exhibit-card>
    <div v-if="error" class="alert alert-info mt-3" role="alert">
      {{error}}
    </div>
    <p v-if="!filteredEvents || filteredEvents.length == 0" class="text-center mt-3">Keine Ereignisse gefunden</p>
  </process-card>
  <div class="modal fade" id="exhibitModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 v-if="clickedEvent" class="modal-title" id="exampleModalCenterTitle">Das Ereignis '{{clickedEvent.Name}}' auswählen?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-block mt-0" data-dismiss="modal">Abbrechen</button>
          <button @click="chooseExhibit()" type="button" class="btn btn-primary btn-block mt-0">Auswählen</button>
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

export default {
  name: 'choose-event',
  components: {
    Steps,
    ProcessCard,
    ExhibitCard
  },
  data() {
    return {
      clickedEvent: undefined,
      filteredEvents: null,
      error: null
    }
  },
  computed: {
    events() {
      return this.$store.state.events;
    }
  },
  watch: {
    events: {
      immediate: true,
      handler: function() {
        this.filteredEvents = this.events;
      }
    }
  },
  created() {
    if (this.events.length == 0) this.$store.dispatch('loadEvents').catch(() => this.error = "Die Ereignisse konnten nicht geladen werden.");
  },
  methods: {
    filter(e) {
      var term = e.target.value;
      if (term == "" || term == undefined) {
        this.filteredEvents = this.events;
      } else {
        this.filteredEvents = this.events.filter(event => event.Name.toLowerCase().includes(term.toLowerCase().trim()));
      }
    },
    clickExhibit(event) {
      this.clickedEvent = event;
      $('#exhibitModal').modal('show');
    },
    chooseExhibit() {
      $('#exhibitModal').modal('hide');
      this.$store.commit('eventChoose', this.clickedEvent);
      this.$router.push('/erstellen/inhalt');
    }
  }
}
</script>
