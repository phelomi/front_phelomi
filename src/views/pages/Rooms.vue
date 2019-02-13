<template>
  <div class="page-rooms page-container">
    <v-layout row>
      <v-flex xs6 class="primary-title">
        <title-boat
          :targetClass="title.targetClass"
          :textUp="title.textUp"
          :textDown="title.textDown"
        />
      </v-flex>
    </v-layout>
    <div class="primary-img">
      <img src="../../assets/rooms/ad001.jpg" alt="">
    </div>
    <div class="primary-content">

    </div>
    <show-rooms />
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';
import showRooms from '@/views/layout/components/showRooms.vue';

export default {
  name: 'pageRooms',
  components: {
    titleBoat,
    showRooms,
  },
  data() {
    return {
      title: {
        textUp: '彩虹堡雙人房',
        textDown: 'ROOMS',
        targetClass: 'target-rooms',
      },
      info: [
        {
          title: 'DAY1：璀璨花火X玄武岩祕境',
          text: '6:50 台北松山機場登機 → 7：50 馬公機場→通樑古榕(吃仙人掌冰/花枝丸)  → 跨海大橋拍跳躍照 → 祕境(玄武岩) → 二崁古厝(吃烤小管/杏仁茶/仙人掌汁)→午餐(40年老店魚麵)→摩西分海之奎壁山→下午茶(超浪漫的白灣沙灘海景)  →祕境(天仁湖)→晚餐(馬路益燒肉飯)→觀音亭澎湖花火節  →夜宿彼得潘民宿',
        },
        {
          title: 'DAY2：山水沙灘X人間美景吉貝沙尾海灘',
          text: '08：30 起床吃飽飽 →龍門紀念碑 →山水沙灘 →菊島居民家中吃點心→午餐(金鎖港飲食店)→13：30 北海遊客中心赤崁碼頭搭船 → 吉貝石滬與綠石槽→   吉貝沙尾八合一水上活動 → 16：00 搭船回本島→ 拍照(落跑吧愛情!拍攝地) →下午茶(回家澎湖狗蝦炸粿/玉冠仙草冰)→ 逛中央老街(四眼井/天后宮)→晚餐(老媽媽道地海產)  → 夜宿彼得潘民宿',
        },
        {
          title: 'DAY3：浮潛X潮間帶巡禮',
          text: '08：30 民宿早餐 → 10：00 搭船白坑→白灣坑休閒一日遊（巡航東海大、小雞善嶼、錠鉤嶼，奎壁山踏浪、體驗浮潛、潮間帶巡禮、抱墩圍網捕魚抓螃蟹、觸摸海星/海參/寄居蟹等各種海底生物）→龜壁港社彩繪村→不給拍肉圓→採買媽宮伴手禮→20:00回溫暖的家。',
        },
      ],
    };
  },
};
</script>
