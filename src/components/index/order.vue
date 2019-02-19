<template>
  <div class="index-order">
    <v-layout row>
      <v-flex xs6  offset-xs6 class="index-order__outer">
        <a @click="$router.push('/order')" class="index-order__button">
          <p class="index-order__text white--text">{{text}}</p>
        </a>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: 'indexOrder',
  data() {
    return {
      title: '馬上\n訂房',
      text: '現在就為自己預約\n一個美好假期~',
    };
  },
};
</script>
