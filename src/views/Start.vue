<template>
<div>
  <vue-headful title="Grass erinnert Sie!" />
  <p>Fügen Sie über folgenden Button eine Erinnerung hinzu und veröffentlichen Sie diese im Günter Grass Zeitstrahl.</p>
  <router-link tag="button" class="btn btn-primary btn-block mb-4" :to="{name: 'EreignisAuswählen'}">Erinnerung hinzufügen</router-link>
  <h2>Meine Erinnerungen</h2>
  <div v-if="error" class="alert alert-info" role="alert">
    {{error}}
  </div>
  <div v-if="memories.length > 0">
    <p>Hier sehen Sie Ihre eigenen bisher erstellten Erinnerungen, die Sie bei Bedarf nachträglich bearbeiten oder löschen können.</p>
    <div class="row">
      <div class="col-md-6" v-for="memory in memories" :key="memory.Id">
        <memory-card :memory="memory" @edit="editMemory(memory)" @delete="deleteMemory(memory)"></memory-card>
      </div>
    </div>
  </div>
  <p v-else>Sie haben noch keine eigenen Erinnerungen erstellt. Ändern Sie dies und fügen Sie über den obenstehenden Button Ihre erste Erinnerung hinzu.</p>
  <br>
  <hr>
  <survey></survey>
</div>
</template>

<script>
import MemoryCard from '@/components/MemoryCard.vue'
import Survey from '@/components/Survey.vue'

export default {
  name: 'start',
  components: {
    MemoryCard,
    Survey
  },
  data() {
    return {
      error: null
    }
  },
  computed: {
    memories() {
      return this.$store.state.memories;
    }
  },
  created() {
    this.$store.dispatch('loadMemories').catch(() => this.error = "Ihre Erinnerungen konnten nicht geladen werden");
  },
  methods: {
    deleteMemory(memory) {
      this.$store.dispatch('deleteMemory', memory);
    },
    editMemory(memory) {
      this.$store.commit('memoryLoad', memory);
      this.$store.commit('edit', true);
      this.$router.push('/erstellen/inhalt');
    }
  }
}
</script>
