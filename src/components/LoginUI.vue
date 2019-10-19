<template>
    <div class="firebaseui-auth-container"></div>
</template>

<script>
import { auth, authUIConfig } from "../firebase/init";
export default {
  name: "authUI",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
    mounted: function() {
    if (process.browser) {
      const firebaseui = require('firebaseui')
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(auth)
      ui.disableAutoSignIn()
      if (this.$store.state.user) {
        this.openAppPage()
      } else {
        ui.start('#firebaseui-auth-container', authUIConfig)
      }
    }
  },
};
</script>