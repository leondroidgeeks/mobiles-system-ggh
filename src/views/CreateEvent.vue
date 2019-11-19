<template>
<div>
  <vue-headful title="Zeitpunkt erstellen" />
  <steps :steps="$store.state.steps" active=0></steps>
  <process-card heading="Zeitpunkt erstellen" infoText="Bezieht sich Ihre Erinnerung auf einen individuellen Zeitpunkt oder Zeitraum? Dann geben Sie bitte hier das Jahr der Erinnerung an.">
    <div v-if="!range" class="form-group">
      <label for="id">Jahr</label>
      <input v-model="start" id="id" class="form-control" type="number" name="" value="" placeholder="jjjj">
    </div>
    <div v-if="range" class="form-group">
      <label for="id">Beginn</label>
      <input v-model="start" id="id" class="form-control" type="number" name="" value="" placeholder="jjjj">
    </div>
    <div v-if="range" class="form-group">
      <label for="id">Ende</label>
      <input v-model="end" id="id" class="form-control" type="number" name="" value="" placeholder="jjjj">
    </div>
    <button v-if="!range" @click="range = true" type="button" class="btn btn-primary btn-block" name="button">Zeitraum angeben</button>
    <button v-if="range" @click="range = false" type="button" class="btn btn-primary btn-block" name="button">Zeitpunkt angeben</button>
  </process-card>
  <button @click="selectRange()" type="button" class="btn btn-primary btn-block my-4">{{range ? 'Eigenen Zeitraum übernehmen' : 'Eigenen Zeitpunkt übernehmen'}}</button>
</div>
</template>

<script>
import Steps from '@/components/Steps.vue'
import ProcessCard from '@/components/ProcessCard.vue'
import ExhibitCard from '@/components/ExhibitCard.vue'

export default {
  name: 'create-event',
  components: {
    Steps,
    ProcessCard,
    ExhibitCard
  },
  data() {
    return {
      range: false,
      start: null,
      end: null
    }
  },
  methods: {
    selectRange() {
      if (this.start) this.start = this.start.trim();
      if (this.end) this.end = this.end.trim();
      if ((!moment(this.start, 'YYYY').isValid()) || (this.range ? !moment(this.end, 'YYYY').isValid() : !moment(this.start, 'YYYY').isValid())) {
        alert("Bitten geben Sie ein richtiges Jahr ein");
        this.start = null;
        this.end = null;
        return;
      }
      if (this.range && !moment(this.end, 'YYYY').isAfter(moment(this.start, 'YYYY'))) {
        alert("Keine Zeitspanne angegeben. Start und Ende dürfen nicht das gleiche Jahr sein. Geben Sie stattdessen einen Zeitpunkt an.");
        this.start = "";
        this.end = "";
        return;
      }
      var type = this.range ? "range" : "point";
      this.$store.commit('eventChoose', {
        Name: "Eigener Zeitpunkt",
        Id: "OwnEvent",
        Start: moment(this.start, 'YYYY').local().format(),
        End: this.range ? moment(this.end, 'YYYY').local().format() : moment(this.start, 'YYYY').local().format(),
        Type: type
      });
      this.$router.push('/erstellen/inhalt');
    }
  }
}
</script>
