<template>
  <div class="home">
    <banner-carousels />
    <indexTopic
      v-for="(item, idx) in indexTopicList"
      :key="`indexTopicList${idx}`"
      :textUp="item.textUp"
      :textDown="item.textDown"
      :introText="item.introText"
      :contentPath="item.contentPath"
      :backgroundColor="item.backgroundColor"
      :backgroundImage="item.backgroundImage"
      :outerCssClass="item.outerCssClass"
      :targetClass="item.targetClass"
    />
  </div>
</template>

<script>
import bannerCarousels from '@/components/bannerCarousels.vue';
import indexTopic from '@/views/layout/components/indexTopic.vue';

export default {
  name: 'home',
  components: {
    bannerCarousels,
    indexTopic,
  },
  data() {
    return {
      indexTopicList: [
        {
          textUp: '最新消息',
          textDown: 'GOOD NEWS',
          introText: '',
          contentPath: 'components/index/news.vue',
          backgroundColor: '',
          backgroundImage: '',
          outerCssClass: 'outer-news',
          targetClass: 'target-news',
        },
        {
          textUp: '房間介紹',
          textDown: 'ROOMS',
          introText: '藍藍的海水、星光點點的夜空，與所愛的家人、\n朋友、伴侶來一趟難忘的澎湖之旅吧！',
          contentPath: 'components/index/rooms.vue',
          backgroundColor: 'accent',
          backgroundImage: '',
          outerCssClass: 'outer-rooms',
          targetClass: 'target-rooms',
        },
        {
          textUp: '交通位置',
          textDown: 'LOCATION',
          introText: '如何來到Family Starry Sky——',
          contentPath: 'components/index/location.vue',
          backgroundColor: '',
          backgroundImage: '',
          outerCssClass: 'outer-location',
          targetClass: 'target-location',
        },
        {
          textUp: '澎湖找樂子',
          textDown: 'HAVE FUN',
          introText: '',
          contentPath: 'components/index/fun.vue',
          backgroundColor: '',
          // backgroundImage: '',
          // outerCssClass: '',
          backgroundImage: 'img/bg_image/bg_haveFun.jpg',
          outerCssClass: 'index-topic--fun outer-fun',
          targetClass: 'target-fun',
        },
        {
          textUp: '跟我醬玩！',
          textDown: '澎湖行程建議',
          introText: '',
          contentPath: 'components/index/follow.vue',
          backgroundColor: '',
          backgroundImage: '',
          outerCssClass: 'outer-follow',
          targetClass: 'target-follow',
        },
        {
          textUp: '',
          textDown: '',
          introText: '',
          contentPath: 'components/index/order.vue',
          backgroundColor: '',
          // backgroundImage: 'img/bg_image/bg_order.png',
          backgroundImage: '',
          outerCssClass: 'index-topic--order outer-order',
          targetClass: 'target-order',
        },
      ],
    };
  },
};
</script>
