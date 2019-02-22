<template>
  <div class="calendar-list">
    <div class="calendar-list__year">
      <h2 class="primary--text">{{year}}</h2>
    </div>
    <div class="calendar-list__date-list">
      <calendar-date
        v-for="(item, idx) in dateList"
        :key="`dateList${idx}`"
        :date="item.date"
        :rooms="item.rooms"
        :class="idx === 0 ?  calendarDateOffset(item.date) : ''"
      />
    </div>
  </div>
</template>
<script>
import calendarDate from '@/components/calendarDate.vue';
import { getDate } from '@/utils/dateMethod';

export default {
  name: 'calendarList',
  components: {
    calendarDate,
  },
  props: ['year', 'dateList'],
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {
    calendarDateOffset(date) {
      const haveOffset = getDate(date, 'dayIndex');
      return haveOffset ? `calendar-date-offset-${haveOffset}` : '';
    },
  },
};
</script>
