<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          <v-card-title class="justify-center"> Titulo Bonito </v-card-title>
          <v-card-text>
            <v-form refs="form">
              <v-text-field
                outlined
                label="Correo"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                outlined
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                append-icon="mdi-eye"
                @click:append="showPassword = !showPassword"
                :rules="[rules.required]"
              ></v-text-field>
            </v-form>
            <v-btn block depressed color="primary">Ingresar</v-btn>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text> Opciones extras </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      showPassword: false,
      rules: {
        required: (value) => !!value || "Este campo es obligatorio!",
      },
    };
  },
};
</script>
