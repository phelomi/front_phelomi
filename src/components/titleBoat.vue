<template>
  <div :class="['title-boat', targetClass]">
    <v-layout row class="title-boat__up">
      <v-flex xs9 justify-center align-end class="title-boat__text">
        <h2 class="primary--text">{{this.textUp}}</h2>
      </v-flex>
      <v-flex xs3 class="title-boat__img">
        <img v-lazy="titleImg" alt="">
      </v-flex>
    </v-layout>
    <v-layout row class="title-boat__down">
      <v-flex xs9 justify-center align-start class="title-boat__text">
        <h3 class="primary--text">{{this.textDown}}</h3>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import titleImg from '../assets/title/icon_header.svg';

export default {
  name: 'titleBoat',
  props: ['targetClass', 'textUp', 'textDown'],
  data() {
    return {
      titleImg,
    };
  },
  methods: {

  },
};
</script>
