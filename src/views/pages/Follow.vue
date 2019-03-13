<template>
  <div class="page-follow page-container">
    <v-layout row>
      <v-flex xs6 class="primary-title">
        <title-boat
          :targetClass="title.targetClass"
          :textUp="title.textUp"
          :textDown="title.textDown"
        />
      </v-flex>
    </v-layout>
    <div class="primary-content">
      <h2 class="page-follow__theme secondary--text text-under-line">{{theme[themeType] || ''}}</h2>
      <div>
        <!-- v-if="themeType === 'necessary'" -->
        <v-layout
          row
          v-for="(item, idx) in info[themeType]"
          :key="`info${themeType}${idx}`"
          class="page-follow__content mb-5"
        >
          <v-flex xs4>
            <div class="page-follow__content--img">
              <img class="sm" :src="item.img" alt="">
            </div>
          </v-flex>
          <v-flex xs8 class="page-follow__content--info">
            <h4
              v-if="item.title"
              class="page-follow__content--title textBlack--text"
            >・{{item.title}}</h4>
            <p class="page-follow__content--text textBlack--text">{{item.text}}</p>
          </v-flex>
        </v-layout>
      </div>
      <!-- <div v-if="themeType === 'phelomi'">
        <p
          v-for="(item, idx) in info[themeType]"
          :key="`info${themeType}${idx}`"
        >{{item}}</p>
      </div> -->
      <div class="primary-img" v-if="primaryImg[themeType]">
        <img class="lg" :src="primaryImg[themeType]" alt="">
      </div>
    </div>
    <show-rooms />
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';
import showRooms from '@/views/layout/components/showRooms.vue';
import primaryImg001 from '../../assets/follow/ad001.jpg';
import adSm001 from '../../assets/follow/ad_sm001.jpg';
import adSm002 from '../../assets/follow/ad_sm002.jpg';
import adSm003 from '../../assets/follow/ad_sm003.jpg';
import adPh01 from '../../assets/follow/follow-phelomi01.jpg';
import adPh02 from '../../assets/follow/follow-phelomi02.jpg';
import adPh03 from '../../assets/follow/follow-phelomi03.jpg';
import adPh04 from '../../assets/follow/follow-phelomi04.jpg';
import adPh05 from '../../assets/follow/follow-phelomi05.jpg';
import constVar from '@/utils/constVar';

export default {
  name: 'pageFollow',
  components: {
    titleBoat,
    showRooms,
  },
  mounted() {
    this.$vuetify.goTo(0, constVar.scrollPagAni);
  },
  computed: {
    themeType() {
      return this.$route.query.theme;
    },
  },
  data() {
    return {
      constVar,
      title: {
        textUp: '跟我醬玩！',
        textDown: '澎湖行程建議',
        targetClass: 'target-follow',
      },
      theme: {
        necessary: '必遊行程',
        phelomi: '飛樂米私房行程',
        fireworks: '2019花火節',
      },
      primaryImg: {
        necessary: '',
        phelomi: '',
        fireworks: primaryImg001,
      },
      info: {
        necessary: [
          {
            img: adSm003,
            title: 'DAY1：蛇頭山遊憩區－風櫃聽濤－山水沙灘－專業海上浮潛＆立式划漿',
            text: '機場登機→馬公機場→在機場辦理民宿貼心贈送摩托車登記領車→行李由民宿帶回→騎車自由行。【蛇頭山遊憩區】是遠眺馬公港和側天島及四角嶼等澎湖內灣最佳景點。→【風櫃聽濤】海潮灌入玄武岩底下的海蝕溝槽，發出有如風箱鼓風的巨大聲響，實乃視覺與聽覺之饗宴！→【山水沙灘】貝殼沙灘潔淨漂亮，海水澄澈透藍→下午參加民宿精心安排海上浮潛&立式划漿體驗，穿著浮潛裝備在專業教練的帶領下一睹最美的世界級海底景觀，七彩繽紛的熱帶魚群，讓您嘆為觀止！→觀音亭夜賞炫麗煙火或陸上的鐵達尼號–菊島之星、海產小吃街，享受澎湖風情→夜宿飛樂米星空號民宿享受觀星寧靜夜晚。',
          },
          {
            img: adSm002,
            title: 'DAY2：南海七美嶼&西吉藍洞新航線一日遊',
            text: '品嚐健康美味活力早餐→前往馬公南海觀光碼頭搭乘快艇→前往南海巡航之旅囉！【西吉嶼-巡航藍洞】西吉嶼的「灶籠」是澎湖絕無僅有的透天海蝕洞，保留了完整的天然景觀→【七美嶼】如世外桃源的祕密花園、讓人讚嘆！體會大自然的感動；→感人肺腑的望夫石傳說；→鬼斧神工的巨獅→龍埕美景．寸草不生的月世界洪荒→心心相印的雙心石滬美景→返回飛樂米星空號民宿享受觀星寧靜夜晚。',
          },
          {
            img: adSm001,
            title: 'DAY3：跨海大橋→玄武岩祕境→二崁古厝→摩西分海→機場',
            text: '品嚐健康美味活力早餐→環島之旅啟程→通樑古榕(吃仙人掌冰/花枝丸)→跨海大橋拍跳躍照→祕境(玄武岩)→二崁古厝(吃烤小管/杏仁茶/仙人掌汁)→午餐(40年老店魚麵)→摩西分海之奎壁山→祕境(天仁湖)→晚餐(馬路益燒肉飯)→機場→帶著充電滿滿的心情回到溫馨幸福的家。',
          },
        ],
        phelomi: [
          {
            img: adPh01,
            title: '澎湖馬公山水30高地公園',
            text: '遠眺山水黃金貝殼沙灘美麗海岸線，猶如置身黃金海岸，令人讚嘆不已！',
          },
          {
            img: adPh02,
            title: '龍門港',
            text: '海水藍綠交疊清澈透底，落日余暉光芒光耀眼，令人高度舒壓留連忘返！',
          },
          {
            img: adPh03,
            title: '菜園3D彩繪情人灣',
            text: '走上長長的橋通往幸福的愛情、親情之路，幸福百分百，3D彩繪讓人身歷其境，驚奇不斷！',
          },
          {
            img: adPh04,
            title: '飛樂米星空號觀星台',
            text: '看著滿天的星星，猜猜星座，無比的寧靜適合發呆天馬行空的夢想，就在銀河中得到實現，找回赤子真心！遨翔在廣闊星際中，度過美麗的夜晚！',
          },
          {
            img: adPh05,
            title: '飛樂米星空號植栽体驗',
            text: '看著飽滿的多肉植物，發揮設計想像力，構出屬於自已的獨創巧思盆栽，用心呵護享受成長的樂趣！',
          },
        ],
      }
      ,
    };
  },
};
</script>
