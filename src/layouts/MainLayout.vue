<template>
  <div class="main-layout">
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <vNavBar @isOpenSidebar="isOpenSidebar" />
      <vSideBar :isOpen="isOpen" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link
          to="/record"
          class="btn-floating btn-large blue"
          v-tooltip="'New'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import vNavBar from '@/components/v-navbar';
import vSideBar from '@/components/v-sidebar';
import { mapActions } from 'vuex';
export default {
  name: 'main-layout',
  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },
  components: {
    vNavBar,
    vSideBar,
  },
  mounted() {
    if (!Object.keys(this.FETCH_INFO).length) {
      this.FETCH_INFO();
    }
    this.loading = false;
  },
  methods: {
    ...mapActions(['FETCH_INFO']),
    isOpenSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss">
.app-content {
  padding-left: 285px;
}
</style>
