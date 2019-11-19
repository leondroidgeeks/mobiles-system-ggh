<!-- This is the component presenting the Progress Card relating to the current step in the Process -->
<template>
<div class="row">
  <div class="col">
    <div class="card">
      <h4 class="card-header bg-primary text-white">{{heading}}</h4>
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div v-if="feedbackText" class="alert alert-info">{{feedbackText}}</div>
            <p>{{infoText}}</p>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true
    },
    infoText: {
      type: String
    },
    feedbackText: {
      type: String
    }
  }
};
</script>

<style scoped>
</style>
