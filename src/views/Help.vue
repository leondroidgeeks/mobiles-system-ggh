<template>
<div>
  <vue-headful title="Hilfe" />
  <p>Hier finden Sie hilfreiche Informationen zu den aktuell verfügbaren Funktionen. Unter "Weitere Themen anzeigen" werden Ihnen außerdem Informationen zu anderen Bereichen der Webseite angezeigt.</p>
  <help-card v-if="mainCard" :help="mainCard"></help-card>
  <br>
  <h3 @click="shown ? shown = false : shown = true">Weitere Themen anzeigen <i v-if="!shown" class="fa fa-caret-down"></i><i v-if="shown" class="fa fa-caret-up"></i></h3>
  <div v-if="shown">
    <help-card v-for="item in otherCards" :help="item" :key="item.name"></help-card>
  </div>
  <br>
  <hr>
  <survey></survey>
</div>
</template>

<script>
import HelpCard from '@/components/HelpCard.vue'
import Survey from '@/components/Survey.vue'

export default {
  name: 'help',
  components: {
    HelpCard,
    Survey
  },
  data() {
    return {
      shown: false,
      previous: null,
      mainCard: null,
      otherCards: []
    }
  },
  computed: {
    help() {
      return this.$store.state.help;
    }
  },
  mounted() {
    if (this.help.length == 0) this.$store.dispatch('loadHelp');
  },
  watch: {
    previous: {
      immediate: true,
      handler() {
        this.update();
      }
    },
    help: {
      immediate: true,
      handler() {
        this.update();
      }
    }
  },
  methods: {
    update() {
      console.log(this.previous);
      console.log(this.help);
      this.otherCards = [];
      for (var item of this.help) {
        if (item.name == this.previous) {
          this.mainCard = item;
          this.shown = false;
        } else {
          this.otherCards.push(item);
        }
      }
      if (!this.mainCard) this.shown = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.previous = from.name;
    });
  }
}
</script>
