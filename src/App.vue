<template>
  <v-app>
    <navigationBar />
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
