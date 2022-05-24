import axios from "axios";
import { getBearer } from "@/helpers/bearerToken.js";

const state = {
  url: process.env.VUE_APP_API_URL,
  cobros: [],
};

const mutations = {
  setCobros(state, cobros) {
    state.cobros = cobros;
  },
};

const actions = {
  async getCobros({ state, commit }) {
    const config = {
      url: `${state.url}/cobros`,
      method: "GET",
      headers: getBearer(),
    };
    try {
      const response = await axios(config);
      commit("setCobros", response.data);
      return response.status;
    } catch (error) {
      return error.response.satus;
    }
  },

  async saveCobro({ state, dispatch }, payload) {
    const config = {
      url: `${state.url}/cobros`,
      method: "POST",
      headers: getBearer(),
      data: payload,
    };
    if (!!payload.id) {
      config.url = `${config.url}/${payload.id}`;
      config.method = "PATCH";
    }
    try {
      const response = await axios(config);
      dispatch("getCobros");
      return response.status;
    } catch (error) {
      return error.responpse.status;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
