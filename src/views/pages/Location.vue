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
    this.$vuetify.goTo(0, constVar.scrollPagAni);
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
              target: '馬公機場', describe: '車程約', number: '15', unit: '分鐘（6.5km）',
            },
            {
              target: '馬公港口', describe: '車程約', number: '30', unit: '分鐘（8.9km）',
            },
            {
              target: '馬公市區', describe: '車程約', number: '20', unit: '分鐘（9.2km）',
            },
            {
              target: '山水沙灘', describe: '車程約', number: '10', unit: '分鐘（1.9km）',
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
          trafficList: [
            {
              target: '台華輪', describe: '航程約', number: '80', unit: '分鐘',
            },
            {
              target: '滿天星號', describe: '航程約', number: '80', unit: '分鐘',
            },
            {
              target: '凱旋三號', describe: '航程約', number: '85', unit: '分鐘',
            },
            {
              target: '凱旋六號', describe: '航程約', number: '85', unit: '分鐘',
            },
            {
              target: '百麗客輪', describe: '航程約', number: '60', unit: '分鐘',
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
          trafficList: [
            {
              target: '立榮航空',
              describe: '航程約',
              number: '30～50',
              unit: '分鐘',
              moreInfo: '華信航空 06-999888',
              targetUrl: 'https://www.mandarin-airlines.com/',
            },
            {
              target: '華信航空',
              describe: '航程約',
              number: '30～50',
              unit: '分鐘',
              moreInfo: '立榮航空 06-999888',
              targetUrl: 'https://www.uniair.com.tw/uniweb/index.aspx',
            },
            {
              target: '遠東航空',
              describe: '航程約',
              number: '30～50',
              unit: '分鐘',
              moreInfo: '遠東航空 06-999888',
              targetUrl: 'http://www.fat.com.tw/',
            },
          ],
          imageSrc: mapAirplane,
        },
      ],
    };
  },
  methods: {
  },
};
</script>
