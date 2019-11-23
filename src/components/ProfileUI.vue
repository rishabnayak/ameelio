<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Profile</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-layout row>
              <v-flex xs12>
                <v-text-field v-model="name" label="Name" name="name" readonly></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field v-model="email" label="Email" name="email" readonly></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-select v-if="role == null" :items="roles" label="User Role" v-model="role" :rules="roleRules"></v-select>
                <v-text-field v-else label="User Role" v-model="role" :disabled=true></v-text-field>
              </v-flex>
            </v-layout>
            <v-btn @click="updateProfile" color="primary">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from "../firebase/init";
import store from '../store';
export default {
  name: "profileUI",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      name: null,
      role: null,
      email: null,
      valid: false,
      roleRules: [val => !!val || "Role Required"],
      roles:["Friends and Family", "Inmate"]
    };
  },
  async mounted() {
    await store.dispatch("getUser");
    this.name = this.user.displayName;
    this.role = this.user.role;
    this.email = this.user.email;
  },
  methods: {
    async updateProfile() {
      if (this.$refs.form.validate()) {
        const ref = db.collection("users").doc(this.user.uid);
        await ref
          .update({
            role: this.role
          })
          .then(() => {
            this.$store.dispatch("setUser").then(() => {
              if (this.role == "Inmate") {
                this.$router.push("/inmate");
              } else {
                this.$router.push("/external");
              }
            });
          });
      }
    }
  }
};
</script>
