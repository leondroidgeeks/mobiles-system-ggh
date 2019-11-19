<template>
<div class="row text-center mb-1">
  <div id="progress-bar" class="progress-wrap progress" data-progress-percent="12">
    <div class="progress-bar progress bg-primary" :style="styleObject"></div>
  </div>
  <div v-for="(step, index) in steps" class="col" :key="index">
    <button @click="$router.push({name: step.link})" type="button" class="btn btn-circle" :class="{'active':index==active}">
        <i :class="step.icon" aria-hidden="true "></i>
      </button>
    <p :class="{'active-font':index==active}">{{step.name}}
      <i v-if="(active>index)" class="fa fa-2x fa-check" aria-hidden="true"></i>
    </p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      styleObject: {
        width: "15%"
      }
    };
  },
  created() {
    var start = (100 / this.steps.length) / 2;
    if (this.active == 0) {
      this.styleObject.width = start + "%";
    } else if (this.active == this.steps.length) {
      this.styleObject.width = "100%";
    } else {
      this.styleObject.width = (start + (2 * start * this.active)) + "%";
    }
  },
  props: ['steps', 'active']
};
</script>
