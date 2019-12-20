<template>
  <div>
    <v-container class="calendar">
      <h1>Calendar</h1>
      <Calendar />
    </v-container>
    <v-container>
      <h1>Connection Requests</h1> 
      <div v-for="request in requests" v-bind:key="request.id">
        <router-link :to="{ name: 'otherprofile', params: {uid:request.familyUID} }">
          <p>{{request.familyName}}</p>
        </router-link>
        <p>would like to connect to</p>
        <router-link :to="{ name: 'otherprofile', params: {uid:request.inmateUID} }">
          <p>{{request.inmateName}}</p>
        </router-link>
        <v-btn @click="approveRequest(request)" color="primary">Approve</v-btn>
        <v-btn @click="denyRequest(request)" color="primary">Deny</v-btn>
      </div>
    </v-container>
    <v-container>
      <v-btn color ="error">
        <router-link :to="{name: 'csv'}" class="csv">Upload Inmate Information</router-link>
      </v-btn> 
    </v-container>
  </div>
</template>




<script>
import { db } from "@/main";
import firebase from "firebase/app";
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
    for (let index = 0; index < this.user.contactRequests.length; index++) {
      const element = this.user.contactRequests[index];
      db.collection("users")
        .doc(element.familyUID)
        .get()
        .then(familyName => {
          db.collection("users")
            .doc(element.inmateUID)
            .get()
            .then(inmateName => {
              this.requests.push({
                "familyName": familyName.data().displayName,
                "inmateName": inmateName.data().displayName,
                "familyUID": element.familyUID,
                "inmateUID": element.inmateUID
              });
            });
        });
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async approveRequest(request) {
      await db
        .collection("users")
        .doc(request.familyUID)
        .update({
          contactList: firebase.firestore.FieldValue.arrayUnion(
            request.inmateUID
          )
        });
      await db
        .collection("users")
        .doc(request.inmateUID)
        .update({
          contactList: firebase.firestore.FieldValue.arrayUnion(
            request.familyUID
          )
        });
      await db
        .collection("users")
        .doc(this.user.uid)
        .update({
          contactRequests: firebase.firestore.FieldValue.arrayRemove({
            inmateUID: request.inmateUID,
            familyUID: request.familyUID
          })
        });
      location.reload();
    },
    async denyRequest(request) {
      await db
        .collection("users")
        .doc(this.user.uid)
        .update({
          contactRequests: firebase.firestore.FieldValue.arrayRemove({
            inmateUID: request.inmateUID,
            familyUID: request.familyUID
          })
        });
      location.reload();
    }
  }
};
</script>

<style scoped>
a.csv{
  color: white;
  text-decoration: none;
}
</style>