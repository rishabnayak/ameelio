<template>
  <v-app>
    <!-- <navigationBar /> -->
    <router-view />
  </v-app>
</template>

<script>
import Calendar from './components/Calendar';

// import navigationBar from "@/components/NavigationBar.vue";
export default {
  name: 'App',
  components: {
    Calendar,
  },
  data: () => ({
    //
  }),
};
</script>
