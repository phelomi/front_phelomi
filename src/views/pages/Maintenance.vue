<template>
  <div class="page-maintenance">
    <div class="page-maintenance__img">
      <img v-lazy="bgMaintenance" alt="">
    </div>
  </div>
</template>
<script>
import bgMaintenance from '../../assets/maintenance/bg_maintenance.svg';

export default {
  name: 'pageMaintenance',
  data() {
    return {
      bgMaintenance,
    };
  },
};
</script>
