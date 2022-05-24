<template>
  <v-card>
    <v-card-title>
      Formulario de cobros
      <v-spacer></v-spacer>
      <v-btn icon @click="done()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-autocomplete
          :items="users"
          v-model="user"
          return-object
          item-text="email"
        ></v-autocomplete>
        <v-text-field v-model="monto" label="Monto"></v-text-field>
        <v-text-field v-model="description" label="Descripcion"></v-text-field>
      </v-form>
      <v-container>
        <v-row justify="space-between" align="center">
          <v-btn @click="done()" text color="error">Cancelar</v-btn>
          <v-btn @click="sendRequest" color="success">Guardar</v-btn>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CobroForm",

  props: {
    value: {
      type: Object,
      default: null,
    },
  },

  watch: {
    value() {
      this.$refs.form.resetValidation();
      console.log(this.value);
      this.resetForm();
      if (this.value) {
        const { value, description } = this.value;
        this.user = this.users.filter((u) => u.id === this.value.user_id)[0];
        this.monto = value;
        this.description = description;
      }
    },
  },

  computed: {
    ...mapState("users", ["users"]),
  },

  data() {
    return {
      user: null,
      monto: null,
      description: null,
    };
  },

  methods: {
    ...mapActions("cobros", ["saveCobro"]),
    resetForm() {
      this.user = null;
      this.monto = null;
      this.description = null;
    },

    done() {
      this.$emit("done");
    },

    async sendRequest() {
      const payload = {
        user_id: this.user.id,
        value: this.monto,
        description: this.description,
        id: this.value?.id,
      };
      console.log(payload);
      const status = await this.saveCobro(payload);
      if ([200, 201].includes(status)) {
        this.done();
        return;
      }
      console.log("Problemas");
    },
  },

  mounted() {
    if (this.value) {
      const { value, description } = this.value;
      this.user = this.users.filter((u) => u.id === this.value.user_id)[0];
      this.monto = value;
      this.description = description;
    }
  },
};
</script>
