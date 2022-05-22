<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          <v-card-title class="justify-center"> Titulo Bonito </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="email"
                outlined
                label="Correo"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="password"
                outlined
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                append-icon="mdi-eye"
                @click:append="showPassword = !showPassword"
                :rules="[rules.required]"
              ></v-text-field>
            </v-form>
            <v-btn block depressed color="primary" @click="sendLogin"
              >Ingresar</v-btn
            >
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text> Opciones extras </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",

  data() {
    return {
      email: null,
      password: null,
      showPassword: false,
      rules: {
        required: (value) => !!value || "Este campo es obligatorio!",
      },
    };
  },

  methods: {
    ...mapActions("auth", ["login", "checkToken"]),
    async sendLogin() {
      if (!this.$refs.form.validate()) return;
      // Enviar request
      const isLogged = await this.login({
        email: this.email,
        password: this.password,
      });
      // Si trae cosas malas, alerta
      if (!isLogged) {
        this.showAlert = true;
        return;
      }
      // Trae cosas buenas, redirect
      this.$router.push({ name: "Home" });
    },
  },

  async created() {
    // Check if access token is valid
    const hasValidToken = await this.checkToken();
    if (hasValidToken) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
