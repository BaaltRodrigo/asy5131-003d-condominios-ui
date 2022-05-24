import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.js";
import users from "./users.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    users,
  },
});
