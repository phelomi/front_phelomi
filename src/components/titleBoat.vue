<template>
  <div :class="['title-boat', targetClass]">
    <v-layout row class="title-boat__up">
      <v-flex xs9 justify-center align-end class="title-boat__text">
        <h2 class="primary--text">{{this.textUp}}</h2>
      </v-flex>
      <v-flex xs3 class="title-boat__img">
        <img v-lazy="titleImg" alt="">
        <img id="titleBoatStar01" class="title-boat__star" :src="titleBoatStar" alt="">
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
import {
  Power0, TimelineMax, TweenLite, TimelineLite,
} from 'gsap';
import titleImg from '../assets/title/icon_header.svg';
import titleBoatStar from '../assets/title/titleBoatStar.svg';

export default {
  name: 'titleBoat',
  props: ['targetClass', 'textUp', 'textDown'],
  mounted() {
    const timeMax = new TimelineMax();
    const titleBoatStar01 = document.getElementById('titleBoatStar01');
    const star01One = timeMax.to(
      titleBoatStar01,
      1,
      {
        top: '50%', left: '65%', scale: 1.2, rotation: '0', ease: Power0.easeNone,
      },
    );
    const star01Two = timeMax.to(
      titleBoatStar01,
      1,
      {
        top: '17%', left: '62%', scale: 1, rotation: '90', ease: Power0.easeNone,
      },
    );
    const star01Three = timeMax.to(
      titleBoatStar01,
      1,
      {
        top: '-3%', left: '54%', scale: 0.55, rotation: '180', ease: Power0.easeNone,
      },
    );
    const star01Four = timeMax.to(
      titleBoatStar01,
      1,
      {
        top: '-8%', left: '47%', scale: 0, rotation: '360', ease: Power0.easeNone,
      },
    );
    timeMax.repeat(-1);
  },
  data() {
    return {
      titleImg,
      titleBoatStar,
    };
  },
  methods: {

  },
};
</script>
