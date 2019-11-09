<template>
  <v-app>
    <!--
    <navigationBar v-if="!['login', 'register'].includes($route.name)"/>
    -->
    <router-view />
  </v-app>
</template>

<script>
import navigationBar from "@/components/NavigationBar.vue";
export default {
  name: 'App',
  components: {
    navigationBar,
  },
  data: () => ({
    //
  }),
};
</script>
