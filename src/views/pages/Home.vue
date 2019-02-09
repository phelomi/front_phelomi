<template>
  <div class="home">
    <banner-carousels />
    <indexTopic />
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
          textDown: 'Good news',
          introText: '',
          contentPath: '',
          background: '',
        },
      ],
    };
  },
};
</script>
