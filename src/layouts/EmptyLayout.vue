<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import messages from '@/plugins/messages';
export default {
  name: 'emptylayout',
  computed: {
    ...mapGetters(['GET_ERROR']),
    error() {
      return this.GET_ERROR;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так');
    },
  },
};
</script>
