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
        },
        {
          textUp: '房型介紹',
          textDown: 'ROOMS',
          introText: '藍藍的海水、星光點點的夜空，與所愛的家人、\n朋友、伴侶來一趟難忘的澎湖之旅吧！',
          contentPath: 'components/index/rooms.vue',
          backgroundColor: 'accent',
          backgroundImage: '',
        },
        {
          textUp: '交通位置',
          textDown: 'LOCATION',
          introText: '如何來到Family Starry Sky——',
          contentPath: 'components/index/rooms.vue',
          backgroundColor: '',
          backgroundImage: '',
        },
      ],
    };
  },
};
</script>
