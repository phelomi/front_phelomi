<template>
  <v-carousel class="banner-carousels" height="58.81vw" hide-controls>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      class="banner-carousels__content"
    >
      <p class="banner-carousels__text">{{item.text}}</p>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
import bannerImg001 from '../assets/banner/banner001.jpg';

export default {
  name: 'bannerCarousels',
  data() {
    return {
      items: [
        {
          src: bannerImg001,
          text: '搭上飛樂米星空號，\n在澎湖的星海裡慢溯———',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          text: '搭上飛樂米星空號，\n在澎湖的星海裡慢溯———',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          text: '搭上飛樂米星空號，\n在澎湖的星海裡慢溯———',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          text: '搭上飛樂米星空號，\n在澎湖的星海裡慢溯———',
        },
      ],
    };
  },
  methods: {

  },
};
</script>
