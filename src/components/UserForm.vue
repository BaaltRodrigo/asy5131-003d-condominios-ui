<template>
  <v-card>
    <v-card-title>
      Formulario de usuarios
      <v-spacer></v-spacer>
      <v-btn icon @click="done()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="email"
          :readonly="isEdit"
          label="Correo del usuario"
        >
        </v-text-field>
        <v-text-field v-model="name" label="Nombre del usuario"></v-text-field>
        <v-text-field
          v-if="!isEdit"
          label="Contrasena"
          append-icon="mdi-eye"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          v-model="password"
        >
        </v-text-field>
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
import { mapActions } from "vuex";
export default {
  name: "UserForm",

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
        const { name, email } = this.value;
        this.name = name;
        this.email = email;
      }
    },
  },

  computed: {
    isEdit() {
      return !!this.value;
    },
  },

  data() {
    return {
      email: null,
      name: null,
      password: null,
      showPassword: false,
    };
  },

  methods: {
    ...mapActions("users", ["saveUser"]),
    resetForm() {
      this.email = null;
      this.name = null;
      this.password = null;
    },

    done() {
      this.resetForm();
      this.$emit("done");
    },

    async sendRequest() {
      const payload = {
        email: this.email,
        name: this.name,
        password: this.isEdit ? null : this.password,
        id: this.value?.id,
      };
      console.log(payload);
      const status = await this.saveUser(payload);
      if ([200, 201].includes(status)) {
        this.done();
        return;
      }
      console.log("Problemas");
    },
  },

  mounted() {
    if (this.value) {
      const { name, email } = this.value;
      this.name = name;
      this.email = email;
    }
  },
};
</script>
