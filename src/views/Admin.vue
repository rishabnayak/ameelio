<template>
  <div>
    <v-container>
      <h1>Connection Requests</h1>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="mainHeaders"
          :items="requests"
          :search="search"
          :no-data-text="'There are no requests at the moment'"
          :no-results-text="'No matching requests found'"
          :must-sort="true"
          item-key="name"
        >
          <template #item.name='{item}'>
            <router-link :to="{ name: 'otherprofile', params: {uid:item.inmateUID} }">
              {{item.inmateName}}
            </router-link>
          </template>
          <template #item.family='{item}'>
            <router-link :to="{ name: 'otherprofile', params: {uid:item.familyUID} }">
              {{item.familyName}}
            </router-link>
          </template>
          <template v-slot:item.action="{item}">
            <v-btn 
              class="mr-2"
              text icon color="blue lighten-2"
              @click="approveRequest(item)"
            >
              <v-icon small>mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn
              text icon color="red lighten-2"
              @click="denyRequest(item)"
            >
              <v-icon small>mdi-thumb-down</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-container class="calendar">
      <h1>Calendar</h1>
      <Calendar />
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
      //contacts: ["Louis", "Amelia", "etc."],
      search: '',
      mainHeaders: [
        { text: "Inmate", value: "name" },
        //{ text: "Location", value: "location" },
        //{ text: "ID", value: "id" },
        //{ text: "Date & Time", value: "time" },
        { text: "Family/Friend", value: "family" },
        { text: "Action", value: "action", sortable: false, align: "center"},
      ],
      // mainItems: [
      //   { name: "Marc Moreno", location: "Demo County Jail", id: "012345", time: "Monday, Aug 17th 2019, 3:00pm", family: "Bobson Doe", },
      //   { name: "Wallace  Frank", location: "Demo County Jail", id: "123456", time: "Wednesday, Nov 13th 2019, 5:00pm", family: "Bob Doe" },
      //   { name: "Enrique  Sanders", location: "Demo County Jail", id: "234567", time: "Thursday, Nov 21st 2019, 2:00pm", family: "John Doe" },
      //   { name: "Michael Johnson", location: "Demo County Jail", id: "345678", time: "Friday, Nov 22nd 2019, 12:00pm", family: "John Do" }
      // ],
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