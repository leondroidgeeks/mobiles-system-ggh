<template>
<div>
  <vue-headful title="Ausgeloggt" />
  <div class="row justify-content-center">
    <div class="col-12 col-md-6">
      <h1 class="text-center">Sie sind nun ausgeloggt</h1>
      <survey></survey>
      <br>
      <p>Sie wollen sich wieder anmelden?
        <router-link to="/">Hier</router-link> können Sie sich wieder anmelden.</p>
    </div>
  </div>
</div>
</template>

<script>
import Survey from '@/components/Survey.vue'

export default {
  components: {
    Survey
  }
}
</script>
