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


export default {
  name: 'pageLocation',
  components: {
    titleBoat,
    locationList,
  },
  data() {
    return {
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
              target: '馬公機場', describe: '車程約', number: '15～30', unit: '分鐘',
            },
            {
              target: '馬公港口', describe: '車程約', number: '30', unit: '分鐘',
            },
            {
              target: '馬公市區', describe: '車程約', number: '20', unit: '分鐘',
            },
            {
              target: '山水沙灘', describe: '車程約', number: '10', unit: '分鐘',
            },
          ],
          imageSrc: mapPosition,
        },
        {
          title: '搭船',
          titleIconSrc: iconAirplane,
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
          ],
          imageSrc: mapAirplane,
        },
        {
          title: '搭飛機',
          titleIconSrc: iconShip,
          targetTitle: '澎湖機場位於',
          targetAddress: '澎湖縣湖西鄉隘門村126-5號',
          trafficTitle: '班機資訊',
          trafficList: [
            {
              target: '立榮航空', describe: '航程約', number: '30～50', unit: '分鐘',
            },
            {
              target: '華信航空', describe: '航程約', number: '30～50', unit: '分鐘',
            },
            {
              target: '德安航空', describe: '航程約', number: '30～50', unit: '分鐘',
            },
            {
              target: '遠東航空', describe: '航程約', number: '30～50', unit: '分鐘',
            },
          ],
          imageSrc: mapShip,
        },
      ],
    };
  },
  methods: {
  },
};
</script>
