<template>
<div @click="emit()" class="card my-2">
  <div class="card-body d-flex flex-row align-items-center w-100">
    <img v-if="exhibit.Id == 'OwnEvent'" class="card-img-left" src="../assets/own-event.png" alt="">
    <img v-else-if="exhibit.MediaSource" class="card-img-left" :src="exhibit.MediaSource" alt="">
    <img v-else class="card-img-left" src="../assets/grass_schnecke_viereckig.jpg" alt="">
    <div class="content">
      <h5 class="card-title">{{exhibit.Name}}</h5>
      <p v-if="exhibit.Type == 'range'">Von {{start}} bis {{end}}</p>
      <p v-if="exhibit.Type == 'point'">In {{start}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "exhibit-card",
  props: [
    'exhibit'
  ],
  computed: {
    start() {
      return moment(this.exhibit.Start).local().year();
    },
    end() {
      return moment(this.exhibit.End).local().year();
    }
  },
  methods: {
    emit() {
      this.$emit('clicked');
    }
  }
}
</script>

<style scoped>
.card-img-left {
  width: 30%;
  height: auto;
  padding-right: 1rem;
}

.content {
  width: 70%;
  float: right;
}

.card-body {
  padding: 0.8rem;
  cursor: pointer;
}
</style>
