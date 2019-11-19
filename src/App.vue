<template>
  <v-app>
    <Sidebar />
    <router-view />
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: 'App',
  components: {
    Sidebar
  },
  data: () => ({
    //
  }),
};
</script>
