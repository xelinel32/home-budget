<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: ($v.email.$dirty && !$v.email.required) || !$v.email.email }"
        />
        <label for="email">Email</label>
        <small v-if="$v.email.$dirty && !$v.email.required" class="helper-text invalid"
          >Field email is empty</small
        >
        <small v-else-if="$v.email.$dirty && !$v.email.email" class="helper-text invalid"
          >Email is incorrect</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />
        <label for="password">Пароль</label>
        <small v-if="$v.password.$dirty && !$v.password.required" class="helper-text invalid"
          >Password filed is empty</small
        >
        <small v-else-if="$v.password.$dirty && !$v.password.minLength" class="helper-text invalid"
          >Password will be {{ $v.password.$params.minLength.min }} symbols, Password -
          {{ password.length }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="name">Имя</label>
        <small v-if="$v.name.$dirty && !$v.name.required" class="helper-text invalid"
          >Name is empty</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: false,
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  },
  methods: {
    ...mapActions(['REGISTER']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.REGISTER(formData);
        this.$router.push('/');
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss">
.input-field .helper-text.invalid {
  color: #f44336 !important;
}
</style>
