<template>
  <v-container>
    <v-card class="rounded-lg">
      <v-card-text>User index page</v-card-text>
      <v-data-table
        :items="users"
        disable-sort
        :headers="tableHeaders"
        :items-per-page="10"
        :footer-props="footerProps"
      >
        <!-- <template v-slot:[`item.actions`]="{ item }"> </template> -->
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "UserIndex",

  computed: {
    ...mapState("users", ["users"]),
  },

  data() {
    return {
      tableHeaders: [
        { text: "Email", value: "email" },
        { text: "Nombre", value: "name" },
        { text: "", value: "actions" },
      ],
      footerProps: {
        itemsPerPageOptions: [10, 15, 20, -1],
        itemsPerPageText: "Cantidad:",
        showFirstLastPage: true,
      },
    };
  },

  methods: {
    ...mapActions("users", ["getUsers"]),
    editUser(userItem) {},
  },

  mounted() {
    this.getUsers();
  },
};
</script>
