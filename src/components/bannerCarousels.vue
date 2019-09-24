<template>
  <v-carousel class="banner-carousels" height="58.81vw" hide-controls :interval="10000">
    <v-carousel-item
      v-for="(item, idx) in banner"
      :key="`bannerList${idx}`"
      class="banner-carousels__content"
    >
      <img class="lg" v-lazy="item.img" alt="">
      <p
        v-if="item.text"
        class="banner-carousels__text">{{item.text}}</p>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'bannerCarousels',
  computed: {
    ...mapGetters(['banner']),
  },
  methods: {

  },
};
</script>
