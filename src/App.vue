<template>
  <v-app>
    <Sidebar :items="adminItems" v-if="adminMenu"/>
    <Sidebar :items="defaultItems" v-else/>
    <v-content>
    <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";


// import navigationBar from "@/components/NavigationBar.vue";
export default {
  name: 'App',
  computed: {
    adminMenu() {
      return this.$route.name === 'admin';
    }
  },
  components: {
    Sidebar
  },
  data: () => ({
    adminItems: [
      { title: "Requests", icon: "mdi-view-list" },
      { title: "Calendar", icon: "mdi-calendar" }
    ],
    defaultItems: [
      { title: "Home", icon: "mdi-home" },
      { title: "About", icon: "mdi-help" }
    ]
  }),
};
</script>
