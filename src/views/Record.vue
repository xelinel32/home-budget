<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading" />

    <p v-else-if="!cats.length" class="center">
      Категорий пока нет
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form class="form" v-else @submit.prevent="handlerSubmit">
      <div class="input-field">
        <select ref="select" v-model="cat">
          <option v-for="c in cats" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            v-model="type"
            value="income"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            v-model="type"
            value="outcome"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.$minValue"
          >amount пароль</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required,
          }"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
          >description пароль</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'record',
  data() {
    return {
      loading: true,
      select: null,
      cats: [],
      cat: null,
      type: 'outcome',
      amount: 100,
      description: '',
    };
  },
  validations: {
    description: { required },
    amount: { minValue: minValue(100) },
  },
  async mounted() {
    this.cats = await this.$store.dispatch('FETCH_CATEGORIES');
    this.loading = false;
    if (this.cats.length) {
      this.cat = this.cats[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(['GET_INFO']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.GET_INFO.bill >= this.amount;
    },
  },
  methods: {
    async handlerSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('CREATE_RECORD', {
            categoryId: this.cat,
            amount: this.amount,
            type: this.type,
            description: this.description,
            data: new Date().toJSON(),
          });
          const bill =
            this.type === 'income'
              ? this.GET_INFO.bill + this.amount
              : this.GET_INFO.bill - this.amount;
          await this.$store.dispatch('UPDATE_INFO', { bill });
          this.$message('Запись успешно добавлена');
          this.$v.reset();
          this.amount = 1;
          this.description = '';
        } catch (e) {}
      } else {
        this.$message(
          `Недостаточно средств на счёте (${this.amount - this.GET_INFO.bill})`
        );
      }
      this.description = '';
      this.amount = 100;
      this.type = 'outcome';
    },
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
