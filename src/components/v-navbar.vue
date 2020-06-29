<template>
  <div class="v-navbar">
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="isOpenSidebar">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{ date | dateFilter('datetime') }}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
            >
              {{ name.name }}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id="dropdown" class="dropdown-content">
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import dateFilter from '@/filters/dateFilter';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'v-navbar',
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
    };
  },
  filters: {
    dateFilter,
  },
  methods: {
    ...mapActions(['LOGOUT']),
    isOpenSidebar() {
      this.$emit('isOpenSidebar');
    },
    async logout() {
      await this.LOGOUT;
      this.$router.push('/login?message=logout');
    },
  },
  computed: {
    ...mapGetters(['GET_INFO']),
    name() {
      return this.GET_INFO;
    },
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
      hover: true,
      alignment: 'right'
    });
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>

<style></style>
