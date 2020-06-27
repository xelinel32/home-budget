<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <vHomeBill :rates="currency.rates" />
      <vHomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import vHomeBill from '@/components/v-homebill';
import vHomeCurrency from '@/components/v-homecurrency';
export default {
  name: 'home',
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
  async mounted() {
    this.currency = await this.$store.dispatch('FETCH_CURRENCY');
    this.loading = false;
  },
  components: {
    vHomeBill,
    vHomeCurrency,
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('FETCH_CURRENCY');
      this.loading = false;
    },
  },
};
</script>
