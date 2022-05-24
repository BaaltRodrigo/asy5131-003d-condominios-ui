import axios from "axios";
import { getBearer } from "@/helpers/bearerToken.js";

const state = {
  url: process.env.VUE_APP_API_URL,
  users: [],
  user: null,
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },

  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  async getUsers({ state, commit }) {
    // Add payload in case of pagination // no creo
    const config = {
      url: `${state.url}/users`,
      method: "GET",
      headers: getBearer(),
    };
    try {
      const response = await axios(config);
      console.log(response);
      commit("setUsers", response.data);
      return response.status;
    } catch (error) {
      return error.response.status;
    }
  },

  // getUserByUrl({ commit }, url) {
  //   const config = {
  //     url: url,
  //     method: "GET",
  //   };
  // },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
