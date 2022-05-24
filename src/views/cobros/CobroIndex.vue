<template>
  <v-container>
    <v-card class="rounded-lg">
      <v-card-title>
        Cobros del sistema
        <v-spacer></v-spacer>
        <v-btn @click="editCobro(null)" fab color="success">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        disable-sort
        :items="cobros"
        :headers="tableHeaders"
        :items-per-page="10"
        :footer-props="footerProps"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="editCobro(item)">Editar</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <!-- FORM -->
    <v-dialog v-model="showForm" max-width="700px" persistent>
      <cobro-form v-model="selectedCobro" @done="showForm = false"></cobro-form>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CobroForm from "../../components/CobroForm.vue";

export default {
  name: "CobroIndex",

  components: {
    CobroForm,
  },

  computed: {
    ...mapState("cobros", ["cobros"]),
  },

  data() {
    return {
      tableHeaders: [
        { text: "User", value: "user_id" },
        { text: "Valor", value: "value" },
        { text: "Descripcion", value: "description" },
        { text: "", value: "actions" },
      ],
      footerProps: {
        itemsPerPageOptions: [10, 15, 20, -1],
        itemsPerPageText: "Cantidad:",
        showFirstLastPage: true,
      },
      showForm: false,
      selectedCobro: null,
    };
  },

  methods: {
    ...mapActions("cobros", ["getCobros"]),
    ...mapActions("users", ["getUsers"]),

    editCobro(itemCobro) {
      this.selectedCobro = itemCobro;
      this.showForm = true;
    },
  },

  mounted() {
    this.getUsers();
    this.getCobros();
  },
};
</script>
