<template>
  <div class="show-rooms">
    <v-layout row class="show-rooms__outer">
      <v-flex xs5 class="show-rooms__line">
        <h2 class="text-under-line"></h2>
      </v-flex>
      <v-flex xs2 class="show-rooms__text">
        <h2 class="show-rooms__title secondary--text">探索房型</h2>
      </v-flex>
      <v-flex xs5 class="show-rooms__line">
        <h2 class="text-under-line"></h2>
      </v-flex>
    </v-layout>
    <rooms-carousels />
  </div>
</template>
<script>
import roomsCarousels from '@/components/index/rooms.vue';

export default {
  name: 'showRooms',
  components: {
    roomsCarousels,
  },
  data() {
    return {

    };
  },
};
</script>
