<template>
  <div class="page-location page-container">
    <v-layout row>
      <v-flex xs6 class="primary-title">
        <title-boat
          :targetClass="title.targetClass"
          :textUp="title.textUp"
          :textDown="title.textDown"
        />
      </v-flex>
    </v-layout>
    <div class="page-location__content">
      <location-list
        v-for="(item, idx) in locationList"
        :key="`locationList${idx}`"
        :title = item.title
        :titleIcon = item.titleIconSrc
        :targetTitle = item.targetTitle
        :targetAddress = item.targetAddress
        :trafficTitle = item.trafficTitle
        :trafficTitleTip = item.trafficTitleTip
        :trafficList = item.trafficList
        :image = item.imageSrc
      />
    </div>
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';
import locationList from '@/components/locationList.vue';
import iconPosition from '../../assets/location/icon_position.svg';
import iconAirplane from '../../assets/location/icon_airplane.svg';
import iconShip from '../../assets/location/icon_ship.svg';

import mapPosition from '../../assets/location/map_position.png';
import mapAirplane from '../../assets/location/map_airplane.png';
import mapShip from '../../assets/location/map_ship.png';

import constVar from '@/utils/constVar';

export default {
  name: 'pageLocation',
  components: {
    titleBoat,
    locationList,
  },
  mounted() {
    this.scrollToTop();
  },
  data() {
    return {
      constVar,
      title: {
        textUp: '交通位置',
        textDown: 'LOCATION',
        targetClass: 'target-location',
      },
      locationList: [
        {
          title: '民宿地理位置',
          titleIconSrc: iconPosition,
          targetTitle: '飛樂米星空號位於',
          targetAddress: '澎湖縣馬公市山水里22鄰珠江182號',
          trafficTitle: '民宿距離',
          trafficList: [
            {
              target: '馬公機場',
              describe: '車程約',
              number: '12',
              unit: '分鐘',
              moreInfo: '',
              targetUrl: '',
            },
            {
              target: '馬公港口',
              describe: '車程約',
              number: '15',
              unit: '分鐘',
              moreInfo: '',
              targetUrl: '',
            },
            {
              target: '馬公市區',
              describe: '車程約',
              number: '15',
              unit: '分鐘',
              moreInfo: '',
              targetUrl: '',
            },
            {
              target: '山水沙灘',
              describe: '車程約',
              number: '2',
              unit: '分鐘',
              moreInfo: '',
              targetUrl: '',
            },
          ],
          imageSrc: mapPosition,
        },
        {
          title: '搭船',
          titleIconSrc: iconShip,
          targetTitle: '馬公碼頭位於',
          targetAddress: '澎湖縣馬公市新營路25號',
          trafficTitle: '船班資訊',
          trafficTitleTip: '(游標移至下方顯示更多)',
          trafficList: [
            {
              target: '滿天星號',
              describe: '航程約',
              number: '80',
              unit: '分鐘',
              moreInfo: '滿天星航運：馬公 06-9269721、布袋 05-3470948',
              targetUrl: 'http://www.aaaaa.com.tw/',
            },
            {
              target: '凱旋三號',
              describe: '航程約',
              number: '85',
              unit: '分鐘',
              moreInfo: '凱旋航運：馬公 06-9277995、布袋 05-3471886',
              targetUrl: 'http://www.no3-farnlin.com.tw/',
            },
            {
              target: '凱旋六號',
              describe: '航程約',
              number: '85',
              unit: '分鐘',
              moreInfo: '凱旋航運：馬公 06-9277995、布袋 05-3471886',
              targetUrl: 'http://www.no3-farnlin.com.tw/',
            },
            {
              target: '百麗客輪',
              describe: '航程約',
              number: '60',
              unit: '分鐘',
              moreInfo: '百麗客輪: 馬公 06-9268199 布袋 05-3472366',
              targetUrl: 'https://www.pescadoresferry.com.tw',
            },
            {
              target: '台華輪(高雄)',
              describe: '航程約',
              number: '270',
              unit: '分鐘',
              moreInfo: '台華輪：馬公 06-9264087',
              targetUrl: 'http://www.tnc-kao.com.tw/about.aspx',
            },
          ],
          imageSrc: mapShip,
        },
        {
          title: '搭飛機',
          titleIconSrc: iconAirplane,
          targetTitle: '澎湖機場位於',
          targetAddress: '澎湖縣湖西鄉隘門村126-5號',
          trafficTitle: '班機資訊',
          trafficTitleTip: '(點擊航空名稱前往該航空官網)',
          trafficList: [
            {
              target: '立榮航空',
              describe: '航程約',
              number: '30～50',
              unit: '分鐘',
              moreInfo: '',
              targetUrl: 'https://www.uniair.com.tw/uniweb/index.aspx',
            },
            {
              target: '華信航空',
              describe: '航程約',
              number: '30～50',
              unit: '分鐘',
              moreInfo: '',
              targetUrl: 'https://www.mandarin-airlines.com/',
            },
          ],
          imageSrc: mapAirplane,
        },
      ],
    };
  },
  methods: {
    scrollToTop() {
      setTimeout(() => {
        this.$vuetify.goTo(-200, constVar.scrollPagAni);
      });
    },
  },
};
</script>
