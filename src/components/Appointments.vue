<template>
  <div>
    <v-container>
      <v-data-table :headers="mainHeaders" :items="pastEvents" item-key="name"></v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Appointments",
    data(){
    return {
            mainHeaders: [
        { text: "Name", value: "name" },
        { text: "Date", value: "date" },
        { text: "Time", value: "time" }
      ],
      pastEvents: [],
    };
  },
  mounted() {
    this.getPastCalls();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods:{
    async getPastCalls(){
      let allEvents = await this.user.calEvent;
      let currentDate = new Date();
      for(var i = 0; i < allEvents.length; i++){
        let eventDate = new Date(allEvents[i].start + "T"+allEvents[i].startTime+":00");
        if(currentDate > eventDate){
          this.pastEvents.push({name: allEvents[i].name, date: allEvents[i].start, time: allEvents[i].startTime});
        }
      }
    },
  },

};
</script>
<style scoped>
.v-data-table,
.container {
  max-height: 100%;
  min-width: 100%;
  margin: 0;
  border-radius: 10px;
}

.v-data-table,
.container {
  max-height: 100%;
  min-width: 100%;
  margin: 0;
  border-radius: 10px;
}
</style>