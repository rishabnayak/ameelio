<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Ameelio</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text>Link 1</v-btn>
        <v-btn text>Link 2</v-btn>
        <v-btn text>Link 3</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon @click="signIn()">
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <v-btn icon @click="signOut()">
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
  <!-- <v-toolbar dark color="primary">
    <v-toolbar-title class="white--text">Obelisk</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn @click="home()" flat>Home</v-btn>
      <v-btn v-if="isAdmin" @click="mailgun()" flat>Mailgun</v-btn>
      <v-btn v-if="user" @click="profile()" flat>My Profile</v-btn>
    </v-toolbar-items>
    <v-menu class="hidden-md-and-up">
      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title @click="home()">Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user">
          <v-list-tile-content>
            <v-list-tile-title @click="profile()">My Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAdmin">
          <v-list-tile-content>
            <v-list-tile-title @click="mailgun()">Mailgun</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn icon>
      <v-icon v-if="user" @click="signOut()">power</v-icon>
      <v-icon v-else @click="signIn()">logout</v-icon>
    </v-btn>
<<<<<<< Updated upstream
  </v-toolbar> -->
=======
  </v-toolbar>-->
>>>>>>> Stashed changes
</template>

<script>
export default {
  name: "navigationBar",
  computed: {
    user() {
      return this.$store.state.user;
<<<<<<< Updated upstream
    },
=======
    }
>>>>>>> Stashed changes
  },
  methods: {
    async signOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/");
    },
    signIn() {
      this.$router.push("/login");
    },
    home() {
      this.$router.push("/");
    },
    profile() {
      this.$router.push("/profile");
    },
    mailgun() {
      this.$router.push("/mailgun");
    }
  },
  data() {
    return {};
  }
};
</script>
