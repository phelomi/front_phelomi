<template>
  <div class="social-button">
    <a
      v-for="(item, idx) in socialButtonList"
      :key="`socialButtonList${idx}`"
      :href="item.url"
    >
      <img :src="item.imgPath" alt="">
    </a>
  </div>
</template>
<script>
import imgPathFacebook from '../assets/social_icon/icon_facebook.svg';
import imgPathLine from '../assets/social_icon/icon_line.svg';
import imgPathWechat from '../assets/social_icon/icon_wechat.svg';
import imgPathInstagram from '../assets/social_icon/icon_instagram.svg';

export default {
  name: 'socialButton',
  data() {
    return {
      socialButtonList: [
        { url: 'https://www.facebook.com/', imgPath: imgPathFacebook },
        { url: 'https://line.me/zh-hant/', imgPath: imgPathLine },
        { url: 'https://www.wechat.com/zh_TW/', imgPath: imgPathWechat },
        { url: 'https://www.instagram.com/?hl=zh-tw', imgPath: imgPathInstagram },
      ],
    };
  },
  methods: {

  },
};
</script>
