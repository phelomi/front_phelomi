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
import rooms001 from '../../assets/rooms_sm/a2-irish-sea.jpg';
import rooms003 from '../../assets/rooms_sm/a4-aegean-sea.jpg';
import rooms004 from '../../assets/rooms_sm/a2-coral-sea.jpg';
import rooms005 from '../../assets/rooms_sm/a2-indian-ocean.jpg';
import rooms006 from '../../assets/rooms_sm/a4-arctic-ocean.jpg';
import rooms007 from '../../assets/rooms_sm/a2-the-pacific-ocean.jpg';
import rooms008 from '../../assets/rooms_sm/a2-atlantic.jpg';
import rooms009 from '../../assets/rooms_sm/b4-chestnut-red.jpg';
import rooms010 from '../../assets/rooms_sm/b2-sky-blue.jpg';
import rooms011 from '../../assets/rooms_sm/b4-orange-and-orange.jpg';
import rooms012 from '../../assets/rooms_sm/b4-violet.jpg';
import rooms013 from '../../assets/rooms_sm/b4-apple-green.jpg';
import rooms014 from '../../assets/rooms_sm/b4-cocoa.jpg';
import rooms015 from '../../assets/rooms_sm/b4-coral-sea.jpg';

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
            type: 'afas',
            intro: '缺描述',
            url: '/rooms',
          },
          // {
          //   img: null,
          //   title: '星空號加勒比海四人房',
          //   type: 'afcs',
          //   intro: '缺描述',
          //   url: '/rooms',
          // },
          {
            img: rooms009,
            title: '彩虹堡栗梅紅四人房',
            type: 'bfcr',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms003,
            title: '星空號愛爾蘭海雙人房',
            type: 'atis',
            intro: '缺描述',
            url: '/rooms',
          },
        ],
        [
          {
            img: rooms004,
            title: '星空號珊瑚海雙人房',
            type: 'atcs',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms005,
            title: '星空號印度洋雙人房',
            type: 'atio',
            intro: '遠眺窗外無邊際的大海，也許吧！這是一趟航向夢想與想像的旅行',
            url: '/rooms',
          },
          {
            img: rooms006,
            title: '星空號北冰洋四人房',
            type: 'afao',
            intro: '缺描述',
            url: '/rooms',
          },
        ],
        [
          {
            img: rooms007,
            title: '星空號太平洋雙人房',
            type: 'atpo',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms008,
            title: '星空號大西洋雙人房',
            type: 'ata',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms013,
            title: '彩虹堡蘋果綠四人房',
            type: 'bfag',
            intro: '帶著童心未泯的雀躍與期待，探索彩虹堡裡的秘密基地',
            url: '/rooms',
          },
        ],
        [
          {
            img: rooms010,
            title: '彩虹堡天空藍雙人房',
            type: 'btsb',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms011,
            title: '彩虹堡桔子橙四人房',
            type: 'bfoo',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms012,
            title: '彩虹堡紫蘿蘭四人房',
            type: 'bfv',
            intro: '缺描述',
            url: '/rooms',
          },
        ],
        [
          {
            img: rooms013,
            title: '彩虹堡蘋果綠四人房',
            type: 'bfag',
            intro: '帶著童心未泯的雀躍與期待，探索彩虹堡裡的秘密基地',
            url: '/rooms',
          },
          {
            img: rooms014,
            title: '彩虹堡可可棕四人房',
            type: 'bfc',
            intro: '缺描述',
            url: '/rooms',
          },
          {
            img: rooms015,
            title: '彩虹堡珊瑚海四人房',
            type: 'bfcs',
            intro: '缺描述',
            url: '/rooms',
          },
        ],
      ],
    };
  },
};
</script>
