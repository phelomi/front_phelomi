<template>
  <v-toolbar class="header" :height="headerHeight">
    <v-toolbar-title class="header__logo" @click="$router.push('/home')">
      <img class="" :src="imgPathLogoHorizon" alt="">
    </v-toolbar-title>
    <v-toolbar-items class="header__menu">
      <headerButton
        v-for="(item, idx) in menuList"
        :key="`menuList${idx}`"
        :text="item.text"
        :target="item.target"
        :directToPage="item.directToPage"
      />
    </v-toolbar-items>
    <div class="header__social">
      <socialButton />
    </div>
  </v-toolbar>
</template>
<script>
import socialButton from '@/components/socialButton.vue';
import headerButton from '@/components/headerButton.vue';
import imgPathLogoHorizon from '../../../assets/logo/logo_horizon.svg';

export default {
  name: 'layoutHeader',
  components: {
    socialButton,
    headerButton,
  },
  data() {
    return {
      imgPathLogoHorizon,
      menuList: [
        { text: '最新消息', target: 'news', directToPage: false },
        { text: '房型介紹', target: 'rooms', directToPage: false },
        { text: '交通位置', target: 'location', directToPage: true },
        { text: '澎湖找樂子', target: 'fun', directToPage: false },
        { text: '跟我醬玩', target: 'follow', directToPage: false },
        { text: '線上訂房', target: 'order', directToPage: true },
        { text: '聯絡我們', target: 'contact', directToPage: false },
      ],
    };
  },
  computed: {
    headerHeight() {
      // this.$vuetify.breakpoint
      const deviceWidth = this.$vuetify.breakpoint.width;

      return deviceWidth / 1920 * 323.633;
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

  },
};
</script>
