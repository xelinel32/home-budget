<template>
  <div class="app-main-layout">
    <vNavBar @isOpenSidebar="isOpenSidebar" />
    <vSideBar :isOpen="isOpen" />
    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>
    <div class="fixed-action-btn">
      <router-link to="/record" class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import vNavBar from '@/components/v-navbar';
import vSideBar from '@/components/v-sidebar';
export default {
  name: 'main-layout',
  data() {
    return {
      isOpen: true,
    };
  },
  components: {
    vNavBar,
    vSideBar,
  },
  methods: {
    isOpenSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
