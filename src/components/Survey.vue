<template>
<div>
  <p>Wir würden uns freuen, wenn Sie unter folgendem Button an unserer Evaluation von <i>Grass erinnert Sie!</i> teilnehmen würden</p>
  <a :href="'http://limesurvey.imis.uni-luebeck.de/index.php/948815/newtest/Y?user=' + id" class="btn btn-primary btn-block">Zum Fragebogen</a>
</div>
</template>

<script>
export default {
  computed: {
    id() {
      return this.$store.state.user.id;
    }
  }
}
</script>
