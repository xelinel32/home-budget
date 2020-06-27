<template>
  <div class="v-sidebar">
    <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
      <router-link tag="li" to="/" exact-active-class="active"
        ><a href="#" class="waves-effect waves-orange pointer"
          >Счет</a
        ></router-link
      >
      <router-link tag="li" to="/history" exact-active-class="active"
        ><a href="#" class="waves-effect waves-orange pointer"
          >История</a
        ></router-link
      >
      <router-link tag="li" to="/planning" exact-active-class="active"
        ><a href="#" class="waves-effect waves-orange pointer"
          >Планирование</a
        ></router-link
      >
      <router-link tag="li" to="/record" exact-active-class="active"
        ><a href="#" class="waves-effect waves-orange pointer"
          >Новая запись</a
        ></router-link
      >
      <router-link tag="li" to="/categories" exact-active-class="active"
        ><a href="#" class="waves-effect waves-orange pointer"
          >Категории</a
        ></router-link
      >
    </ul>
  </div>
</template>

<script>
export default {
  name: 'v-sidebar',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default() {
        return false;
      },
    },
  },
};
</script>

<style lang="scss">
.v-sidebar {
  .sidenav {
    top: 65px;
    li.active {
      background: #ffb74d;
    }
  }
}
</style>
