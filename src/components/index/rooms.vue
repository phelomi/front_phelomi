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
            title: '星空號愛琴海四人房',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms002,
            title: '星空號加勒比海四人房',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms003,
            title: '星空號愛爾蘭海雙人房',
            intro: '缺描述',
            url: '/rooms',
          },
        ],
        [
          {
            img: rooms001,
            title: '星空號珊瑚海雙人房',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms002,
            title: '星空號印度洋雙人房',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms003,
            title: '星空號北冰洋四人房',
            intro: '缺描述',
            url: '/rooms',
          },
        ],
        [
          {
            img: rooms001,
            title: '星空號太平洋雙人房',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms002,
            title: '星空號大西洋雙人房',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms003,
            title: '彩虹堡栗梅紅四人房',
            intro: '缺描述',
            url: '/rooms',
          },
        ],
        [
          {
            img: rooms001,
            title: '彩虹堡天空藍雙人房',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms002,
            title: '彩虹堡桔子橙四人房',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms003,
            title: '彩虹堡紫蘿蘭四人房',
            intro: '缺描述',
            url: '/rooms',
          },
        ],
        [
          {
            img: rooms001,
            title: '彩虹堡蘋果綠四人房',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms002,
            title: '彩虹堡可可粽四人房',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms003,
            title: '彩虹堡珊瑚海四人房',
            intro: '缺描述',
            url: '/rooms',
          },
        ],
      ],
    };
  },
};
</script>
