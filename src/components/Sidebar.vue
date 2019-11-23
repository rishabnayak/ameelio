<template>
  <nav>
    <v-navigation-drawer id="drawer" app dark class="blue" :mini-variant.sync="mini" permanent>
      <v-img v-if="!mini" src="@/assets/logo.png" height="40" contain @click="home" />
      <v-img v-else src="@/assets/logo_mini.png" height="35" contain @click="home" />
      <v-list-item @click="profile">
        <v-list-item-avatar>
          <v-img :src="photoURL"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <h4>{{name}}</h4>
          </v-list-item-title>
        </v-list-item-content>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list dense>
          <v-list-item>
            <div v-if="!mini">
              <v-btn block color="error" @click="signOut()">Logout</v-btn>
            </div>
            <div v-else>
              <v-btn icon>
                <v-icon @click="signOut()">power</v-icon>
              </v-btn>
            </div>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { log } from "util";
export default {
  name: "Sidebar",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  props: {
    items: Array,
  },
  data() {
    return {
      drawer: true,
      mini: true,
      name: null,
      photoURL: null
    };
  },
  beforeMount() {
    this.name = this.user.displayName;
    this.photoURL = this.user.photoURL;
  },
  methods: {
    async signOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/login");
    },
    signIn() {
      this.$router.push("/login");
    },
    home() {
      if (this.$route.path == "/") {
        return;
      } else {
        this.$router.push("/");
      }
    },
    profile() {
      if (this.$route.path == "/profile") {
        return;
      } else {
        this.$router.push("/profile");
      }
    }
  }
};
</script>


<style scoped>
h4 {
  font-size: 0.8vw;
}
.v-navigation-drawer--fixed.v-navigation-drawer--open {
  padding-top: 15px;
}

.pa-2 {
  max-width: 50%;
}
.addMargin {
  margin-left: 20%;
}
</style>