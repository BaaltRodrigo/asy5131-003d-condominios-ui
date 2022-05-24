<template>
  <v-container>
    <v-card class="rounded-lg">
      <v-card-title>
        Usuarios del sistema
        <v-spacer></v-spacer>
        <v-btn @click="editUser(null)" fab color="success">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :items="users"
        disable-sort
        :headers="tableHeaders"
        :items-per-page="10"
        :footer-props="footerProps"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="editUser(item)">Editar</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <!-- Forms -->
    <v-dialog v-model="showForm" max-width="700px">
      <user-form v-model="selectedUser" @done="showForm = false"></user-form>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UserForm from "../../components/UserForm.vue";

export default {
  name: "UserIndex",

  components: {
    UserForm,
  },

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
      showForm: false,
      selectedUser: null,
    };
  },

  methods: {
    ...mapActions("users", ["getUsers"]),
    editUser(userItem) {
      this.selectedUser = userItem;
      this.showForm = true;
    },
  },

  mounted() {
    this.getUsers();
  },
};
</script>
