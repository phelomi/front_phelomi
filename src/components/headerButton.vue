<template>
  <a
    class="header__button"
    @click="methodGoTo"
  >
    <span class="header__button__head"></span>
    <div class="header__button__body">
      <img :src="buttonBodyFront" alt="" class="header__button__body__front">
      <div class="header__button__body__text"><span>{{this.text}}</span></div>
      <img :src="buttonBodyEnd" alt="" class="header__button__body__end">
    </div>
  </a>
</template>
<script>
import buttonBodyFront from '../assets/button/button_header_body_front.svg';
import buttonBodyEnd from '../assets/button/button_header_body_end.svg';
import constVar from '@/utils/constVar';

export default {
  name: 'headerButton',
  props: ['text', 'target'],
  data() {
    return {
      buttonBodyFront,
      buttonBodyEnd,
      localText: '',
    };
  },
  computed: {
    currentURL() {
      return this.$route.path;
    },
    buttonLg() {
      return this.text.length > 4 ? 'header__button__lg' : '';
    },
  },
  methods: {
    methodGoTo() {
      const targetClass = `.${this.target}`;
      if (document.querySelectorAll(targetClass).length > 0) {
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
