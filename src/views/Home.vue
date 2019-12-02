<template>
  <LandingPage />
</template>

<script>
import LandingPage from "../components/LandingPage";
import store from "../store";

export default {
  name: "Home",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  components: {
    LandingPage
  },
  beforeMount() {
    if (this.user) {
      if (this.user.role == "Admin") {
        this.$router.push("/admin");
      } else {
        this.$router.push("/user");
      }
    }
  }
};
</script>
