<template>
  <v-toolbar class="header" :height="headerHeight" fixed>
    <v-toolbar-title class="header__logo">
      <img class="" :src="imgPathLogoHorizon" alt="">
    </v-toolbar-title>
    <!-- <v-spacer></v-spacer> -->
    <v-toolbar-items class="header__menu">
      <headerButton
        v-for="(item, idx) in menuList"
        :key="`menuList${idx}`"
        :text="item.text"
        :url="item.url"
      />
    </v-toolbar-items>
  </v-toolbar>
  <!-- <div class="header">
    <div class="header__logo">
    </div>
    <nav class="header__nav">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </nav>
    <div class="header__social">
      <socialButton />
    </div>
  </div> -->
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
        { text: '最新消息', url: '/news' },
        { text: '房型介紹', url: '/rooms' },
        { text: '交通位置', url: '/location' },
        { text: '澎湖找樂子', url: '/fun' },
        { text: '跟我醬玩', url: '/follow' },
        { text: '線上訂房', url: '/order' },
        { text: '聯絡我們', url: '/contact' },
      ],
    };
  },
  computed: {
    headerHeight() {
      // this.$vuetify.breakpoint
      const deviceWidth = this.$vuetify.breakpoint.width;

      console.log('TCL: headerHeight -> deviceWidth / 1920 * 1311', deviceWidth / 1920 * 1311);
      return deviceWidth / 1920 * 323.633;
    },
  },
  methods: {

  },
};
</script>
