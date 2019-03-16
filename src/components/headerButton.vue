<template>
  <a
    class="header__button"
    @click="methodGoTo"
    v-lazy:background-image="buttonHeader"
  >
    <div class="header__button--text white--text">{{this.text}}</div>
  </a>
</template>
<script>
import constVar from '@/utils/constVar';
import buttonHeader from '../assets/button/button_header.png';

export default {
  name: 'headerButton',
  props: ['text', 'target', 'directToPage'],
  data() {
    return {
      localText: '',
      buttonHeader,
    };
  },
  computed: {
    currentURL() {
      return this.$route.path;
    },
  },
  methods: {
    methodGoTo() {
      const targetClass = `.outer-${this.target}`;
      if (this.directToPage) {
        this.$router.push(this.target);
      } else if (
        document.querySelectorAll(targetClass).length > 0
        && this.$route.name !== this.target
      ) {
        this.$vuetify.goTo(targetClass, constVar.scrollPagAni);
      } else {
        this.$router.push('/home');
        setTimeout(() => {
          this.$vuetify.goTo(targetClass, constVar.scrollPagAni);
        }, 300);
      }
    },
  },
};
</script>
