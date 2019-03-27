import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albumList: []
  },
  mutations: {
    storeFeatured(state, payload) {
      state.albumList = payload;
    }
  },
  getters: {
    albumList(state) {
      return state.albumList;
    }
  },
  actions: {
    addAlbums({ commit }, payload) {
      commit("storeFeatured", payload);
    }
  }
});
