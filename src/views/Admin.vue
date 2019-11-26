<template>
  <div>
    <v-container class="calendar">
      <h1>Calendar</h1>
      <Calendar />
    </v-container>
    <v-container>
      <h1>Connection Requests</h1>
      <div v-for="request in requests" v-bind:key="request.id">
        <router-link :to="{ name: 'profile', params: {uid:request.familyUID} }">
          <p>FamilyUser</p>
        </router-link>
        <p>would like to connect to</p>
        <router-link :to="{ name: 'profile', params: {uid:request.inmateUID} }">
          <p>Inmate</p>
        </router-link>
      </div>
    </v-container>
  </div>
</template>




<script>
import Calendar from "../components/Calendar";

export default {
  name: "admin",
  components: {
    Calendar
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      requests: [],

      isExpanded: false,
      isModalVisible: false,
      contacts: ["Louis", "Amelia", "etc."],
      mainHeadersContacts: [
        { text: "Name", value: "name" },
        { text: "Date", value: "date" },
        { text: "Time", value: "time" }
      ],

      mainItemsContacts: [
        { name: "Marc Moreno", date: "October 30", time: "3:00pm" },
        { name: "Wallace  Frank", date: "October 31", time: "4:00pm" },
        { name: "Enrique  Sanders", date: "October 23", time: "5:00pm" }
      ]
    };
  },
  mounted() {
    this.requests = this.user.contactRequest;
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>
