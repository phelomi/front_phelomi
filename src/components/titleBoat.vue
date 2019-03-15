<template>
  <div :class="['title-boat', targetClass]">
    <v-layout row class="title-boat__up">
      <v-flex xs9 justify-center align-end class="title-boat__text">
        <h2 class="primary--text">{{this.textUp}}</h2>
      </v-flex>
      <v-flex xs3 class="title-boat__img">
        <img v-lazy="titleImg" alt="">
        <img
          :class="[`title-boat__star title-boat-start-one-${textUp}`]"
          :src="titleBoatStar" alt=""
        >
        <img
          :class="[`title-boat__star title-boat-start-two-${textUp}`]"
          :src="titleBoatStar" alt=""
        >
        <img
          :class="[`title-boat__star title-boat-start-three-${textUp}`]"
          :src="titleBoatStar" alt=""
        >
        <img
          :class="[`title-boat__star title-boat-start-four-${textUp}`]"
          :src="titleBoatStar" alt=""
        >
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
    const timeMaxOne = new TimelineMax();
    const titleBoatStarItemOne = document.querySelectorAll(`.title-boat-start-one-${this.textUp}`);
    const star01One = timeMaxOne.to(
      titleBoatStarItemOne,
      1,
      {
        top: '50%', right: '0', scale: 1.2, rotation: '0', ease: Power0.easeNone, autoAlpha: 0,
      },
    );
    const star01Two = timeMaxOne.to(
      titleBoatStarItemOne,
      1,
      {
        top: '17%', right: '5%', scale: 1, rotation: '90', ease: Power0.easeNone, autoAlpha: 1,
      },
    );
    const star01Three = timeMaxOne.to(
      titleBoatStarItemOne,
      1,
      {
        top: '-3%', right: '16%', scale: 0.55, rotation: '180', ease: Power0.easeNone,
      },
    );
    const star01Four = timeMaxOne.to(
      titleBoatStarItemOne,
      1,
      {
        top: '-14%', right: '28%', scale: 0, rotation: '360', ease: Power0.easeNone,
      },
    );
    timeMaxOne.repeat(-1);

    const titleBoatStarItemTwo = document.querySelectorAll(`.title-boat-start-two-${this.textUp}`);
    const timeMaxTwo = new TimelineMax();
    const star02One = timeMaxTwo.to(
      titleBoatStarItemTwo,
      1,
      {
        top: '50%', right: '0', scale: 1.2, rotation: '0', ease: Power0.easeNone, autoAlpha: 0,
      },
    );
    const star02Two = timeMaxTwo.to(
      titleBoatStarItemTwo,
      1,
      {
        top: '17%', right: '5%', scale: 1, rotation: '90', ease: Power0.easeNone, autoAlpha: 1,
      },
    );
    const star02Three = timeMaxTwo.to(
      titleBoatStarItemTwo,
      1,
      {
        top: '-3%', right: '16%', scale: 0.55, rotation: '180', ease: Power0.easeNone,
      },
    );
    const star02Four = timeMaxTwo.to(
      titleBoatStarItemTwo,
      1,
      {
        top: '-14%', right: '28%', scale: 0, rotation: '360', ease: Power0.easeNone,
      },
    );
    timeMaxTwo.repeat(-1);
    timeMaxTwo.delay(1);

    const titleBoatStarItemThree = document
      .querySelectorAll(`.title-boat-start-three-${this.textUp}`);
    const timeMaxThree = new TimelineMax();
    const star03One = timeMaxThree.to(
      titleBoatStarItemThree,
      1,
      {
        top: '50%', right: '0', scale: 1.2, rotation: '0', ease: Power0.easeNone, autoAlpha: 0,
      },
    );
    const star03Two = timeMaxThree.to(
      titleBoatStarItemThree,
      1,
      {
        top: '17%', right: '5%', scale: 1, rotation: '90', ease: Power0.easeNone, autoAlpha: 1,
      },
    );
    const star03Three = timeMaxThree.to(
      titleBoatStarItemThree,
      1,
      {
        top: '-3%', right: '16%', scale: 0.55, rotation: '180', ease: Power0.easeNone,
      },
    );
    const star03Four = timeMaxThree.to(
      titleBoatStarItemThree,
      1,
      {
        top: '-14%', right: '28%', scale: 0, rotation: '360', ease: Power0.easeNone,
      },
    );
    timeMaxThree.repeat(-1);
    timeMaxThree.delay(2);

    const titleBoatStarItemFour = document
      .querySelectorAll(`.title-boat-start-four-${this.textUp}`);
    const timeMaxFour = new TimelineMax();
    const star04One = timeMaxFour.to(
      titleBoatStarItemFour,
      1,
      {
        top: '50%', right: '0', scale: 1.2, rotation: '0', ease: Power0.easeNone, autoAlpha: 0,
      },
    );
    const star04Two = timeMaxFour.to(
      titleBoatStarItemFour,
      1,
      {
        top: '17%', right: '5%', scale: 1, rotation: '90', ease: Power0.easeNone, autoAlpha: 1,
      },
    );
    const star04Three = timeMaxFour.to(
      titleBoatStarItemFour,
      1,
      {
        top: '-3%', right: '16%', scale: 0.55, rotation: '180', ease: Power0.easeNone,
      },
    );
    const star04Four = timeMaxFour.to(
      titleBoatStarItemFour,
      1,
      {
        top: '-14%', right: '28%', scale: 0, rotation: '360', ease: Power0.easeNone,
      },
    );
    timeMaxFour.repeat(-1);
    timeMaxFour.delay(3);
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
