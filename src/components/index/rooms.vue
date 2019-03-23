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
            intro: '夜裡，總是幻想著星空裡那神秘的宇宙，到底有多大多遠多浩瀚啊？',
            url: '/rooms',
          },
          // {
          //   img: null,
          //   title: '星空號加勒比海四人房',
          //   type: 'afcs',
          //   intro: '人家都說，加勒比海是海盜橫行的海域，也許可以讓這趟旅行，帶點刺激的冒險行程',
          //   url: '/rooms',
          // },
          {
            img: rooms009,
            title: '彩虹堡栗梅紅四人房',
            type: 'bfcr',
            intro: '白色純淨、紅色熱情、藍色自由...你心裡渴望什麼色彩？用旅行的心情，彩繪心裡那一個，屬於自己的顏色...',
            url: '/rooms',
          },
          {
            img: rooms003,
            title: '星空號愛爾蘭海雙人房',
            type: 'atis',
            intro: '喝點小酒，微醺的感覺很浪漫，讓這趟旅行，在那不經意的瞬間成行吧！',
            url: '/rooms',
          },
        ],
        [
          {
            img: rooms004,
            title: '星空號珊瑚海雙人房',
            type: 'atcs',
            intro: '踏著沙灘、踩著腳印，呼吸裡帶點鹹鹹味道的空氣，也許你已等不及與海洋相遇了',
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
            intro: '地球的某個角落，有個神秘的地方，在過去現在未來裡自由穿梭著，想去探險嗎？',
            url: '/rooms',
          },
        ],
        [
          {
            img: rooms007,
            title: '星空號太平洋雙人房',
            type: 'atpo',
            intro: '航行的第一夢想，就是徜徉在地球最大的海洋',
            url: '/rooms',
          },
          {
            img: rooms008,
            title: '星空號大西洋雙人房',
            type: 'ata',
            intro: '海洋，總是有一個浪漫的愛情故事，也許是電影裡的鐵達尼，亦或是童話裡的美人魚？',
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
            intro: '你多久沒仰望天空了?彩虹、星星、月亮、太陽...還有那一片片像棉花糖的白雲',
            url: '/rooms',
          },
          {
            img: rooms011,
            title: '彩虹堡桔子橙四人房',
            type: 'bfoo',
            intro: '通往童話世界的小路，我相信，你也曾經做過這樣的愛麗絲夢境',
            url: '/rooms',
          },
          {
            img: rooms012,
            title: '彩虹堡紫蘿蘭四人房',
            type: 'bfv',
            intro: '紫色是神秘的、高雅的、夢幻的...快來這裡尋找屬於你的紫色浪漫吧！',
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
            intro: '小時候的你，玩過方塊拼圖嗎？熱一杯濃郁的可可拿鐵，和好友們來場回憶之旅...',
            url: '/rooms',
          },
          {
            img: rooms015,
            title: '彩虹堡珊瑚粉四人房',
            type: 'bfcp',
            intro: '不行！該出去走走了，準備好行囊，帶著一顆粉紅少女心，一起去感受星空裡的海洋世界吧！',
            url: '/rooms',
          },
        ],
      ],
    };
  },
};
</script>
