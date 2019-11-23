<template>
  <div>
    <v-container class="calendar">
      <h1>Calendar</h1>
      <Calendar/>
    </v-container>
    <v-container>
      <h1>Past Calls</h1>
      <Appointments :mainHeaders="mainHeadersContacts" :mainItems="mainItemsContacts"></Appointments>
    </v-container>
  </div>
</template>




<script>
import Appointments from "../components/Appointments";
import Calendar from "../components/Calendar";

export default {
  name: "external",
  components: {
    Appointments,
    Calendar,
  },
  data() {
    return {
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
      ],
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

















