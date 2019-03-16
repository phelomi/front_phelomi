<template>
  <div class="index-order">
    <v-layout row>
      <v-flex xs6  offset-xs6 class="index-order__outer">
        <a
          @click="$router.push('/order')"
          :class="[
            'index-order__button',
            $vuetify.breakpoint.mdAndDown ? 'index-order__button--mobile':''
          ]"
          v-lazy:background-image="buttonBg"
        >
          <p class="index-order__text white--text">{{text}}</p>
        </a>
      </v-flex>
    </v-layout>
    <div class="index-order__background">
      <!-- <div class="index-order__foreground" v-lazy:background-image="footerForeground"></div> -->
      <img class="index-order__background--background" :src="footerBackground" alt="">
      <img class="index-order__background--left" :src="cloudLeft" alt="">
      <img class="index-order__background--center" :src="cloudCenter" alt="">
      <img class="index-order__background--right" :src="cloudRight" alt="">
      <img class="index-order__background--foreground" :src="footerForeground" alt="">
      <img class="index-order__background--map" :src="footerMap" alt="">
      <img class="index-order__background--ship" :src="footerShip" alt="">
    </div>
  </div>
</template>
<script>
import buttonBg from '../../assets/button/button_bg_order.png';
import footerBackground from '../../assets/footer/footer_background.svg';
import footerForeground from '../../assets/footer/footer_foreground.svg';
import footerShip from '../../assets/footer/footer_ship.svg';
import footerMap from '../../assets/footer/footer_map.svg';
import cloudLeft from '../../assets/footer/cloud_left.svg';
import cloudCenter from '../../assets/footer/cloud_center.svg';
import cloudRight from '../../assets/footer/cloud_right.svg';

export default {
  name: 'indexOrder',
  data() {
    return {
      buttonBg,
      footerBackground,
      footerForeground,
      footerShip,
      footerMap,
      cloudLeft,
      cloudCenter,
      cloudRight,
      title: '馬上\n訂房',
      text: '現在就為自己預約\n一個美好假期~',
    };
  },
};
</script>
