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
  </div>
</template>
<script>
import buttonBg from '../../assets/button/button_bg_order.png';

export default {
  name: 'indexOrder',
  data() {
    return {
      buttonBg,
      title: '馬上\n訂房',
      text: '現在就為自己預約\n一個美好假期~',
    };
  },
};
</script>
