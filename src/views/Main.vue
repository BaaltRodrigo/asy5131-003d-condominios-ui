<template>
  <v-app>
    <the-header></the-header>
    <the-sidebar></the-sidebar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import TheHeader from "../components/general/TheHeader.vue";
import TheSidebar from "../components/general/TheSidebar.vue";
export default {
  name: "Main",

  components: {
    TheHeader,
    TheSidebar,
  },

  methods: {
    ...mapActions("auth", ["checkToken"]),
  },

  async created() {
    if (!localStorage.access_token) {
      return this.$router.push({ name: "Login" });
    }

    const isValid = await this.checkToken();
    if (!isValid) {
      localStorage.clear("access_token");
      return this.$router.push({ name: "Login" });
    }
  },
};
</script>
