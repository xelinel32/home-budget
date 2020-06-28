import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import messagePlugin from '@/plugins/message';
import tooltipPlugin from '@/plugins/tooltip';
import Loader from '@/components/v-loader';
import router from './router';
import store from './store';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.directive('tooltip', tooltipPlugin);
Vue.use(Vuelidate);

Vue.component('Loader', Loader);

const firebaseConfig = {
  apiKey: 'AIzaSyAlOoPu486XsZNxws0oYxsdQAXWzF7HEaU',
  authDomain: 'vue-crm-home-a8dfa.firebaseapp.com',
  databaseURL: 'https://vue-crm-home-a8dfa.firebaseio.com',
  projectId: 'vue-crm-home-a8dfa',
  storageBucket: 'vue-crm-home-a8dfa.appspot.com',
  messagingSenderId: '212352782464',
  appId: '1:212352782464:web:2ba3b13c65348a38e15665',
};

let app;

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
