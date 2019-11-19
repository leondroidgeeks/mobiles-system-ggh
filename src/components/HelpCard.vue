<template>
<div class="card my-2">
  <div class="card-body">
    <h5 class="card-title">{{help.title}}</h5>
    <p v-html="help.content" class="card-text" style="white-space: pre-wrap;"></p>
  </div>
</div>
</template>

<script>
export default {
  name: "help-card",
  props: ['help']
}
</script>

<style scoped>
.card-body,
.card-footer {
  padding: 0.75rem;
}
</style>
