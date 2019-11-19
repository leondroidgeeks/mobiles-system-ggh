<template>
<div class="container-fluid">
  <nav class="navbar navbar-border navbar-expand-xs navbar-light bg-light fixed-top justify-content-center">
    <ul class="nav nav-justified w-100">
      <li v-if="($route.path != '/start') && ($route.path != '/') && ($route.path != '/abmelden')" class="nav-item">
        <a @click.prevent="$router.go(-1)" href="" class="nav-link navbar-item" align="center">
          <i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i><br>Zurück
        </a>
      </li>
      <li v-if="$route.path == '/start'" class="nav-item">
        <a href="" data-toggle="modal" data-target="#logoutModal" class="nav-link navbar-item" align="center">
          <i class="fa fa-sign-out fa-2x" aria-hidden="true"></i><br>Abmelden
        </a>
      </li>
      <li v-if="$route.path == '/abmelden'" class="nav-item">
        <router-link class="nav-link navbar-item" align="center" active-class="navbar-active" to="/">
          <i class="fa fa-sign-in fa-2x" aria-hidden="true"></i><br>Anmelden
        </router-link>
      </li>
      <li v-if="($route.path != '/start') && ($route.path != '/hilfe') && ($route.path != '/') && ($route.path != '/impressum') && ($route.path != '/datenschutzerklaerung') && ($route.path != '/abmelden')" class="nav-item">
        <a href="" data-toggle="modal" data-target="#abortModal" class="nav-link navbar-item" align="center">
          <i class="fa fa-trash fa-2x" aria-hidden="true"></i><br>Abbrechen
        </a>
      </li>
      <li v-if="($route.path != '/impressum') && ($route.path != '/datenschutzerklaerung') && ($route.path != '/abmelden')" class="nav-item">
        <router-link class="nav-link navbar-item" align="center" active-class="navbar-active" to="/hilfe">
          <i class="fa fa-question-circle fa-2x" aria-hidden="true"></i><br>Hilfe
        </router-link>
      </li>
    </ul>
  </nav>
  <div class="modal fade" id="abortModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Soll das Erstellen der Erinnerung abgebrochen werden?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-block mt-0" data-dismiss="modal">Nein</button>
          <button @click="abort()" type="button" class="btn btn-primary btn-block mt-0">Ja</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Wollen Sie sich wirklich abmelden?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-block mt-0" data-dismiss="modal">Nein</button>
          <button @click="logout()" type="button" class="btn btn-primary btn-block mt-0">Ja</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'navbar',
  methods: {
    abort() {
      $('#abortModal').modal('hide');
      this.$store.commit('memoryClear');
      this.$store.commit('eventClear');
      this.$router.push('/start');
    },
    logout() {
      $('#logoutModal').modal('hide');
      this.$store.commit('logout');
      this.$router.push('/abmelden');
    }
  }
}
</script>
