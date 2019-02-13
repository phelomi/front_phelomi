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
        @click="$router.push(item.url)"
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
        { text: '飛樂米\n私房行程', url: '/follow', color: 'info' },
        { text: '必遊行程', url: '/follow', color: 'warning' },
        { text: '2019花火節', url: '/follow', color: 'error' },
      ],
    };
  },
};
</script>
