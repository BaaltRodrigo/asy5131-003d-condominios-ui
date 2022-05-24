import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.js";
import cobros from "./cobros.js";
import users from "./users.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    cobros,
    users,
  },
});
