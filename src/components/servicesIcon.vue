<template>
  <div class="service-icon">
    <img :src="serviceIconList[type].img || ''" alt="" class="service-icon__img">
    <p class="service-icon__text textBlack--text">{{serviceIconList[type].p || ''}}</p>
  </div>
</template>
<script>
import iconShower from '../assets/rooms/icon/icon-shower.svg';
import iconTea from '../assets/rooms/icon/icon-tea.svg';
import iconTv from '../assets/rooms/icon/icon-tv.svg';
import iconWifi from '../assets/rooms/icon/icon-wifi.svg';

export default {
  name: 'serviceIcon',
  props: ['type'],
  data() {
    return {
      serviceIconList: {
        wifi: { img: iconWifi, p: 'WiFi\n有線寬頻' },
        tv: { img: iconTv, p: '液晶電視\n冰箱\n熱水壺' },
        shower: { img: iconShower, p: '盥洗備品\n吹風機' },
        tea: { img: iconTea, p: '茶包\n咖啡包\n礦泉水' },
      },
    };
  },
};
</script>
