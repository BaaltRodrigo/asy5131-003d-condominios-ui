import axios from "axios";
import { getBearer } from "@/helpers/bearerToken.js";

const state = {
  url: process.env.VUE_APP_API_URL,
};

const actions = {
  async login({ state }, payload) {
    const config = {
      url: `${state.url}/login`,
      method: "POST",
      data: payload,
    };
    console.log("URL:", config.url);
    try {
      const response = await axios(config);
      console.log(response);
      localStorage.access_token = response.data.access_token;
      return true;
    } catch (error) {
      return false;
    }
  },

  async checkToken({ state }) {
    const config = {
      url: `${state.url}/me`,
      method: "GET",
      headers: getBearer(),
    };
    try {
      await axios(config); // if fails token was invalid or does not exists
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
};
