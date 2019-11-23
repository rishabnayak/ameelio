<template>
  <div>
    <v-container>
      <h1>Requests</h1>
      <Requests :mainHeaders="mainHeadersContacts" :mainItems="mainItemsContacts"></Requests>
    </v-container>
    <v-container class="calendar">
      <h1>Calendar</h1>
      <Calendar :events="calendarEvents" :height="calendarHeight"></Calendar>
    </v-container>
  </div>
</template>




<script>
import Requests from "../components/Requests";
import modal from "../components/Modal";
import popUp from "../components/popUp";
import Calendar from "../components/Calendar";
import AddContact from "../components/AddContact";

export default {
  name: "admin",
  components: {
    Requests,
    modal,
    popUp,
    Calendar,
    AddContact
  },
  data() {
    return {
      isExpanded: false,
      calendarDate: new Date().toISOString().substr(0, 10),
      calendarTime: null,
      isModalVisible: false,
      contacts: ["Louis", "Amelia", "etc."],
      mainHeadersContacts: [
        { text: "Inmate", value: "name" },
        { text: "Location", value: "location" },
        { text: "ID", value: "id" },
        { text: "Date & Time", value: "time" },
        { text: "Family/Friend", value: "family" },
        { text: "Action", value: "action", sortable: false, align: "center"},
      ],

      mainItemsContacts: [
        { name: "Marc Moreno", location: "Demo County Jail", id: "012345", time: "Monday, Aug 17th 2019, 3:00pm", family: "Bobson Doe", },
        { name: "Wallace  Frank", location: "Demo County Jail", id: "123456", time: "Wednesday, Nov 13th 2019, 5:00pm", family: "Bob Doe" },
        { name: "Enrique  Sanders", location: "Demo County Jail", id: "234567", time: "Thursday, Nov 21st 2019, 2:00pm", family: "John Doe" },
        { name: "Michael Johnson", location: "Demo County Jail", id: "345678", time: "Friday, Nov 22nd 2019, 12:00pm", family: "John Do" }
      ],
      calendarHeight: 500
    };
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

















