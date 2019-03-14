<template>
  <v-toolbar class="header" :height="headerHeight">
    <v-toolbar-title class="header__logo" @click="$router.push('/home')">
      <img class="" v-lazy="imgPathLogoHorizon" alt="">
    </v-toolbar-title>
    <v-toolbar-items class="header__menu">
      <headerButton
        v-for="(item, idx) in menuList"
        :key="`menuList${idx}`"
        :text="item.text"
        :target="item.target"
        :directToPage="item.directToPage"
        :class="item.regex.test(currentUrl) ? 'active' :''"
      />
    </v-toolbar-items>
    <div class="header__social">
      <social-button :directionTop="false"/>
    </div>
    <div class="header-background">
      <img id="clooud03" :src="cloud03" alt="">
      <img id="clooud02" :src="cloud02" alt="">
      <img id="clooud01" :src="cloud01" alt="">
    </div>
  </v-toolbar>
</template>
<script>
import socialButton from '@/components/socialButton.vue';
import headerButton from '@/components/headerButton.vue';
import imgPathLogoHorizon from '../../../assets/logo/logo_horizon.svg';
// import bgHeader from '../../../assets/bg_image/bg_header.jpg';
import cloud01 from '../../../assets/header/cloud01.png';
import cloud02 from '../../../assets/header/cloud02.png';
import cloud03 from '../../../assets/header/cloud03.png';
import {
  Power0, TimelineMax, TweenLite,
} from 'gsap';

export default {
  name: 'layoutHeader',
  components: {
    socialButton,
    headerButton,
  },
  mounted() {
    CustomEase.create('cloudBottom', 'M0,0 C0.076,0 0.077,0.118 0.118,0.158 0.166,0.204 0.214,0.194 0.274,0.246 0.336,0.294 0.331,0.311 0.372,0.354 0.45,0.436 0.432,0.486 0.498,0.522 0.577,0.565 0.64,0.582 0.678,0.632 0.71,0.696 0.768,0.716 0.808,0.758 0.824,0.775 0.838,0.831 0.852,0.844 0.894,0.878 0.894,0.918 0.928,0.954 0.947,0.974 1,1 1,1');
    CustomEase.create('cloudTop', ' "M0,0 C0.06,0.08 -0.005,0.017 0.09,0.1 0.134,0.138 0.136,0.176 0.176,0.212 0.244,0.272 0.224,0.256 0.288,0.282 0.381,0.32 0.464,0.396 0.61,0.59 0.67,0.67 0.688,0.714 0.722,0.76 0.756,0.82 0.777,0.816 0.796,0.83 0.815,0.844 0.866,0.849 0.88,0.862 0.908,0.882 0.911,0.936 0.932,0.97 0.95,1 1,1 1,1"');
    const elmCloud01 = document.getElementById('clooud01');
    const cloudAni1 = TweenLite.fromTo(
      elmCloud01,
      50,
      { left: 0, ease: Power0.easeNone },
      { left: '-89%', repeat: -1, ease: 'cloudBottom' },
    );

    const elmCloud02 = document.getElementById('clooud02');
    const cloudAni2 = TweenLite.fromTo(
      elmCloud02,
      80,
      { right: 0, ease: Power0.easeNone },
      { right: '-89%', repeat: -1, ease: 'cloudBottom' },
    );

    const elmCloud03 = document.getElementById('clooud03');
    const cloudAni3 = TweenLite.fromTo(
      elmCloud03,
      95,
      { left: 0, ease: Power0.easeNone, delay: 1 },
      { left: '-89%', repeat: -1, ease: 'cloudTop' },
    );
    const timeMax = new TimelineMax({
      tweens: [
        cloudAni1,
        cloudAni2,
        cloudAni3,
      ],
    });
  },
  data() {
    return {
      // bgHeader,
      cloud01,
      cloud02,
      cloud03,
      imgPathLogoHorizon,
      menuList: [
        {
          text: '最新消息', target: 'news', directToPage: false, regex: /^\/news/,
        },
        {
          text: '房間介紹', target: 'rooms', directToPage: false, regex: /^\/rooms/,
        },
        {
          text: '交通位置', target: 'location', directToPage: true, regex: /^\/location/,
        },
        {
          text: '澎湖找樂子', target: 'fun', directToPage: false, regex: /^\/fun/,
        },
        {
          text: '跟我醬玩', target: 'follow', directToPage: false, regex: /^\/follow/,
        },
        {
          text: '線上訂房', target: 'order', directToPage: true, regex: /^\/order/,
        },
        {
          text: '聯絡我們', target: 'contact', directToPage: false, regex: /^\/contact/,
        },
      ],
    };
  },
  computed: {
    headerHeight() {
      // this.$vuetify.breakpoint
      const deviceWidth = this.$vuetify.breakpoint.width;

      return deviceWidth / 1920 * 323.633;
    },
    currentUrl() {
      // this.$route
      return this.$route.path;
    },
    // mdScale() {
    //   // this.$vuetify.breakpoint
    //   const deviceWidth = this.$vuetify.breakpoint.width;
    //   let scaleStyle = null;
    //   if (deviceWidth < 1920) {
    //     const scaleSize = deviceWidth / 1920 * 1.2;
    //     scaleStyle = {
    //       transformOrigin: '0% 50%',
    //       transform: `scale(${scaleSize})`,
    //     };
    //   }

    //   return scaleStyle;
    // },
  },
  methods: {
    methodOnComplete(val) {
      console.log('TCL: methodOnComplete -> val', val);
    },
  },
};
</script>
