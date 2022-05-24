<template>
  <v-navigation-drawer app clipped permanent>
    <v-list nav dense shaped>
      <v-list-item
        link
        v-for="url in links"
        :key="`link-id-${url.title}`"
        :to="url.page"
        active-class="purple--text"
      >
        <v-list-item-icon>
          <v-icon>{{ url.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ url.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "TheSidebar",

  data() {
    return {
      links: [
        {
          title: "Usuarios",
          page: { name: "Users" },
          icon: "mdi-account-multiple",
        },
        {
          title: "Cobros",
          page: { name: "Cobros" },
          icon: "mdi-cash-multiple",
        },
      ],
    };
  },
};
</script>
