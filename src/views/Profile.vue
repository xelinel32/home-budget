<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @click.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required
          }"
        />
        <label for="description">Введите имя</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >Введите имя</span
        >
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Russian
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'profile',
  data() {
    return {
      name: '',
      isRuLocale: true
    };
  },
  validations: {
    name: { required }
  },
  mounted() {
    this.name = this.GET_INFO.name;
    this.isRuLocale = this.GET_INFO.locale === 'ru-RU';
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(['GET_INFO'])
  },
  methods: {
    ...mapActions(['UPDATE_INFO']),

    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.UPDATE_INFO({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        });
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss" scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
