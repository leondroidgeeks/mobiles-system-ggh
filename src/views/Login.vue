<template>
<div>
  <vue-headful title="Grass erinnert Sie!" />
  <div class="row justify-content-center">
    <div class="col-12 col-md-6">
      <div class="logo mb-4">
        <img class="img-fluid mx-auto d-block mb-3" src="../assets/logo_grass_haus.svg" alt="">
        <h3 class="text-white text-center">Grass erinnert Sie!</h3>
        <p class="text-white text-center m-0">Finden Sie heraus, wie.</p>
      </div>
      <div v-if="error" class="alert alert-info" role="alert">
        {{error}}
      </div>
      <div class="form-group">
        <label for="username">Pseudonym (optional)</label>
        <input v-model="username" id="username" class="form-control" type="text" name="" value="" placeholder="Optionales Pseudonym">
      </div>
      <div class="form-group">
        <div class="form-check">
          <input v-model="checked" class="form-check-input" type="checkbox" value="" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            Ihre Daten werden nicht an Dritte weitergegeben. Ich habe die <router-link to="/datenschutzerklaerung">Datenschutzerklärung</router-link> gelesen und bin mit dieser einverstanden.
          </label>
        </div>
      </div>
      <button @click="login()" class="btn btn-primary btn-block">Starten</button>
      <h2 class="mt-4">Was ist GESA?</h2>
      <p>Auf Ihrem Weg durch die Ausstellung können Sie Erinnerungen, die von den Exponaten ausgelöst werden, in digitaler Form festhalten. Hierfür können Sie diese mobile Webseite GESA auf Ihrem Smartphone benutzen.</p>
      <p>Ihre gespeicherten Erinnerungen werden mit denen der anderen Besucherinnen und Besuchern in GESAs interaktivem Zeitstrahl dargestellt:</p>
      <img class="img-fluid mb-3" src="@/assets/Zeitleiste.jpg" alt="GESA Zeitstrahl">
      <p>Klicken Sie auf den Hilfe Button am oberen Rand des Bildschirms, um weitere Informationen zu erfahren, wie Sie auf dieser Seite fortfahren können.</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: null,
      error: null,
      checked: false
    }
  },
  methods: {
    login() {
      if (!this.checked) {
        this.error = "Bitte stimmen Sie der Datenschutzerklärung zu.";
        return;
      }
      if (this.username) this.username = this.username.trim();
      if (this.username == null || this.username == "") {
        this.username = "anonym";
      }
      if (this.username == localStorage.getItem('username')) {
        this.$store.dispatch('login', {
          username: this.username,
          new: false
        }).then(() => {
          alert("Sie melden sich mit ihrem alten Nicknamen '" + this.username + "' an. Ihr Konto wird wiederhergestellt.");
          this.$router.push('/start');
        }).catch(() => this.error = "Die Anwendung kann nicht gestartet werden.");
      } else {
        this.$store.dispatch('login', {
          username: this.username,
          new: true
        }).then(() => {
          this.$router.push('/start');
        }).catch(() => this.error = "Die Anwendung kann nicht gestartet werden.");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
    background-color: #4b645f;
    width: auto;
    border-radius: 2px;
    padding: 2rem 1rem;
}
</style>
