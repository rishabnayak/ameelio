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
  name: "otherProfileUI",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      uid: this.$route.params.uid,  
      name: null,
      role: null,
      email: null,
      calEvents: null,
      contacts: null,
      valid: false,
      roleRules: [val => !!val || "Role Required"],
      roles:["Friends and Family", "Inmate"]
    };
  },
  async created() {
    let finduser = await db.collection('users').doc(this.uid).get()
    if (finduser.empty) {
      this.$router.push({
        name: "profile"
      })
    } else {
      this.name = finduser.data().displayName
      this.role = finduser.data().role
      this.email = finduser.data().email
      this.calEvents = finduser.data().calEvents
      this.contacts = finduser.data().contacts
    }
  }
};
</script>
