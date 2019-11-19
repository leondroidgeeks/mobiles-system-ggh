<template>
<div>
  <vue-headful title="Gescanntes Ereignis" />
  <steps :steps="$store.state.steps" active=0></steps>
  <div v-if="error" class="alert alert-info" role="alert">
    {{error}}
  </div>
  <p v-if="!error && !event" class="text-center">Ereignis wird geladen ...</p>
  <exhibit-card v-if="!error && event" :exhibit="event"></exhibit-card>
  <router-link tag="button" class="btn btn-primary btn-block my-4" :to="{name: 'EreignisAuswählen'}">Anderes Ereignis auswählen</router-link>
  <button v-if="!error && event" @click="selectEvent()" class="btn btn-primary btn-block my-4">Ereignis übernehmen</button>
</div>
</template>

<script>
import Steps from '@/components/Steps.vue'
import ExhibitCard from '@/components/ExhibitCard.vue'

export default {
  name: 'qr-exhibit',
  components: {
    Steps,
    ExhibitCard
  },
  data() {
    return {
      error: null
    }
  },
  computed: {
    event() {
      return this.$store.state.choosenEvent;
    }
  },
  created() {
    if (this.$route.query.id) {
      this.$store.dispatch('loadEvent', this.$route.query.id)
        .catch(() => {
          this.error = "Der QR Code wurde nicht erkannt.";
        });
    } else {
      this.error = "Das Ereignis konnte nicht geladen werden.";
    }
  },
  methods: {
    selectEvent() {
      this.$router.push('/erstellen/inhalt')
    }
  }
}
</script>
