<template>
  <div class="index-follow">
    <v-layout row>
      <v-flex
        v-for="(item, idx) in followList"
        :key="`followList${idx}`"
        justify-center
        xs4
        class="index-follow__outer"
      >
      <a
        @click="$router.push({path:item.url,query: { theme: item.theme }})"
        :class="`index-follow__button index-follow__button--${item.color}`"
      >
        <p
          :class="`${item.color}--text index-follow__text`"
        >{{item.text}}</p>
      </a>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: 'indexFollow',
  data() {
    return {
      followList: [
        {
          text: '跳島趣行程', url: '/follow', color: 'warning', theme: 'necessary',
        },
        {
          text: '愛玩水行程', url: '/follow', color: 'info', theme: 'phelomi',
        },
        {
          text: '愛浪漫行程', url: '/follow', color: 'error', theme: 'fireworks',
        },
      ],
    };
  },
};
</script>
