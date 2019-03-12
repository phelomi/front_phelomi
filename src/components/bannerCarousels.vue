<template>
  <v-carousel class="banner-carousels" height="58.81vw" hide-controls :interval="10000">
    <v-carousel-item
      v-for="(item, idx) in bannerList"
      :key="`bannerList${idx}`"
      :src="item.src"
      class="banner-carousels__content"
    >
      <p class="banner-carousels__text">{{item.text}}</p>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
import bannerImg001 from '../assets/banner/banner001.jpg';
import bannerImg002 from '../assets/banner/banner002.jpg';
import bannerImg003 from '../assets/banner/banner003.jpg';
import bannerImg004 from '../assets/banner/banner004.jpg';

export default {
  name: 'bannerCarousels',
  data() {
    return {
      bannerList: [
        {
          src: bannerImg001,
          text: '',
        },
        {
          src: bannerImg002,
          text: '',
        },
        {
          src: bannerImg003,
          text: '',
        },
        {
          src: bannerImg004,
          text: '',
        },
      ],
    };
  },
  methods: {

  },
};
</script>
