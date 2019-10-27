<template>
  <!--
  <div id="firebaseui-auth-container"></div>
  -->
  <div v-bind:style="{ background: bg, width: bgWidth, height: bgHeight }">
    <v-container class="my-12">
      <v-layout
            text-center
            wrap
            >
        <v-row>
          <v-col>
            <v-img
              :src="require('../assets/the-logo.png')"
              class="mx-auto my-4"
              contain
              height="35"
            ></v-img>
            <v-card
              class="mx-auto"
              color="white"
              width="400px"
            >
              <v-card-title class="justify-center">
                <h3>Sign up</h3>
              </v-card-title>
              <v-card-text>
                <v-form class="mx-5 mt-5">
                  <v-text-field
                    name="username"
                    label="Username"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    name="password"
                    label="Password"
                    type="password"
                    outlined
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-btn color="light-blue" style="padding-left:50px; padding-right:50px; margin-bottom:30px;"><span style="color:white;">Register</span></v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { authUI, authUIConfig } from "../firebase/init";
export default {
  name: "authUI",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    authUI.start("#firebaseui-auth-container", authUIConfig);
  },
  data(){
      return {
          bg: 'linear-gradient(180deg, #3DB3EE 13.54%, rgba(255, 255, 255, 0) 99.99%, rgba(64, 159, 227, 0.982353) 100%), #0AA0EA',
          bgWidth: '100%',
          bgHeight: '100%',
      }
  },
};
</script>