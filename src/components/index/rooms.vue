<template>
  <div class="index-rooms">
    <v-carousel class="index-topic__carousels" height="36.22vw" hide-delimiters>
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
            :img="item.img"
            :title="item.title"
            :intro="item.intro"
            :url="item.url"
          />
        </v-flex>
      </v-layout>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import roomsList from '@/components/roomsList.vue';
import rooms001 from '../../assets/img_sm/rooms001.jpg';
import rooms002 from '../../assets/img_sm/rooms002.jpg';
import rooms003 from '../../assets/img_sm/rooms003.jpg';

export default {
  name: 'indexRooms',
  components: {
    roomsList,
  },
  data() {
    return {
      roomsList: [
        [
          {
            img: rooms001,
            title: '彩虹堡雙人房',
            intro: '讓您彷彿置身銀河般的夢幻',
            url: '/rooms',
          },
          {
            img: rooms002,
            title: '彩虹堡四人房',
            intro: '帶您進入夢幻的七彩國度',
            url: '/rooms',
          },
          {
            img: rooms003,
            title: '星空號四人房',
            intro: '出發！帶您遨遊星空',
            url: '/rooms',
          },
        ],
        [
          {
            img: rooms001,
            title: '彩虹堡雙人房',
            intro: '讓您彷彿置身銀河般的夢幻',
            url: '/rooms',
          },
          {
            img: rooms002,
            title: '彩虹堡四人房',
            intro: '帶您進入夢幻的七彩國度',
            url: '/rooms',
          },
          {
            img: rooms003,
            title: '星空號四人房',
            intro: '出發！帶您遨遊星空',
            url: '/rooms',
          },
        ],
      ],
    };
  },
};
</script>
