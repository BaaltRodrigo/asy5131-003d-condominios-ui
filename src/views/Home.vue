<template>
  <v-container>
    <v-card>
      <v-card-text> Soy la home page </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
