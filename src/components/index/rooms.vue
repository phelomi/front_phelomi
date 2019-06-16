<template>
  <div class="index-rooms">
    <v-carousel
      class="index-topic__carousels"
      height="36.22vw"
      hide-delimiters
      :interval="18000"
    >
      <v-carousel-item
        v-for="(roomsListGroup, idx) in roomsList"
        :key="`roomsList${idx}`"
        prev-icon="mdi-chevron-left-circle"
        next-icon="mdi-chevron-right-circle"
      >
      <v-layout row class="index-rooms__content">
        <v-flex
          xs4
          v-for="(item, idx) in roomsListGroup"
          :key="`roomsListGroup${idx}`"
        >
          <rooms-list
            url="/rooms"
            :img="item.img"
            :title="item.title"
            :intro="item.intro"
            :info="{t: item.type}"
          />
        </v-flex>
      </v-layout>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import roomsList from '@/components/roomsList.vue';
import roomsSM from '../../config/roomsSM.json';

export default {
  name: 'indexRooms',
  components: {
    roomsList,
  },
  data() {
    return {
      roomsList: roomsSM
        .reduce((acc, cur, index) => {
          const realIndex = parseInt(index / 3, 10);
          if (acc[realIndex]) acc[realIndex].push(cur);
          else acc.push([cur]);
          return acc;
        }, []),
    };
  },
};
</script>
