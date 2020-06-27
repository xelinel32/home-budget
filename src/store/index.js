import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    info: [],
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state, error) {
      state.error = null;
    },
    SET_INFO(state, info) {
      state.info = info;
    },
    CLEAR_INFO(state) {
      state.info = {};
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
    async LOGOUT({ commit }) {
      await firebase.auth().signOut();
      commit('CLEAR_INFO');
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
        commit('SET_ERROR', error);
        throw error;
      }
    },
    GET_USER_ID() {
      const userId = firebase.auth().currentUser;
      return userId ? userId.uid : null;
    },
    async FETCH_INFO({ commit, dispatch }) {
      try {
        const uid = await dispatch('GET_USER_ID');
        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once('value')
        ).val();
        commit('SET_INFO', info);
      } catch (error) {}
    },
    async FETCH_CURRENCY() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      );
      return await res.json();
    },
    async UPDATE_CATEGORY({ dispatch, commit }, { title, limit, id }) {
      try {
        const uid = await dispatch('GET_USER_ID');
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit });
      } catch (error) {
        commit('SET_ERROR', e);
        throw error;
      }
    },
    async CREATE_CATEGORY({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch('GET_USER_ID');
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title, limit });
        return { title, limit, id: category.key };
      } catch (error) {
        commit('SET_ERROR', e);
        throw error;
      }
    },
    async FETCH_CATEGORIES({ dispatch, commit }) {
      try {
        const uid = await dispatch('GET_USER_ID');
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once('value')
          ).val() || {};
        const cats = [];
        Object.keys(categories).forEach((key) => {
          cats.push({
            title: categories[key].title,
            limit: categories[key].limit,
            id: key,
          });
        });
        return cats;
      } catch (error) {
        commit('SET_ERROR', error);
        throw error;
      }
    },
    async CREATE_RECORD({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('GET_USER_ID');
        return await firebase
          .database()
          .ref(`users/${uid}/records`)
          .push(record);
      } catch (error) {
        commit('SET_ERROR', error);
        throw error;
      }
    },
    async UPDATE_INFO({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('GET_USER_ID');
        const updateData = { ...getters.info, ...toUpdate };
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(updateData);
        commit('SET_INFO', updateData);
      } catch (error) {
        commit('SET_ERROR', error);
        throw error;
      }
    },
  },
  getters: {
    GET_ERROR(state) {
      return state.error;
    },
    GET_INFO(state) {
      return state.info;
    },
  },
});
