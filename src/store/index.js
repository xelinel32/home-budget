import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state, error) {
      state.error = null;
    },
  },
  actions: {
    async LOGIN({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit('SET_ERROR', error);
        throw error;
      }
    },
    async LOGOUT() {
      await firebase.auth().signOut();
    },
    async REGISTER({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('GET_USER_ID');
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            bill: 10000,
            name,
          });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    GET_USER_ID() {
      const userId = firebase.auth().currentUser;
      return userId ? userId.uid : null;
    },
  },
  getters: {
    GET_ERROR(state) {
      return state.error;
    },
  },
});
