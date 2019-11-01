<template>
  <div>

    <!-- < -->
    <v-container class='calendar'>

      <h1>Schedule a Call</h1>
      <Calendar :events="calendarEvents"></Calendar>

  </v-sheet>
    </v-container>

    <v-container>
      
      <h1>Past Calls</h1>
      <Appointments :mainHeaders="mainHeadersContacts"
                    :mainItems="mainItemsContacts"
       ></Appointments>

      <popUp>
        <template v-slot:buttonText>Add Contact</template>
        <template v-slot:title>Add Contact</template>
        <template v-slot:content>
          <form>
            <label for="firstName">First Name</label>
            <div><input type="text" name="firstName" placeholder="John"></div>
            <label for="lastName">Last Name</label>
            <div><input type="text" name="lastName" placeholder="Doe"></div>
            <label for="date">Birth Date</label>
            <div><input type="date" name="date"></div>
            <label for="location">Prison Location</label>
            <div><input type="text" name="location"></div>
            </form>
        </template>
      </popUp>
    </v-container>
<!--               <popUp>
                <template v-slot:buttonText>Schedule a Call</template>
                <template v-slot:title>Schedule a Call</template>
                <template v-slot:content>
                  <v-select  :items="contacts" label="Select a person from your contacts"></v-select>

                  <v-row justify="center">
                      <v-date-picker v-model="date"></v-date-picker>
                  </v-row>
                  <v-row justify="center">
                      <v-time-picker v-model="time"></v-time-picker>
                  </v-row>
                </template>
      </popUp> -->

    </v-container>
  
  </div>
</template>



<script>
import Appointments from '../components/Appointments'
import modal from '../components/Modal'
import popUp from '../components/popUp'
import Calendar from '../components/Calendar'
// import HelloWorld from './HelloWorld.vue'
export default {
  name: 'home',
  components: {
    Appointments,
    modal,
    popUp,
    Calendar
    // HelloWorld
  },
  data (){
    return{
      isModalVisible: false,
      contacts: ['Louis', 'Amelia', 'etc.'],
      mainHeadersContacts: [
          { text: 'Name', value: 'name' },
          { text: 'Date', value: 'date' },
          { text: 'Time', value: 'time'}
        ],
  
        mainItemsContacts: [
          { name: 'Marc Moreno', date: 'October 30', time: '3:00pm' },
          { name: 'Wallace  Frank', date: 'October 31', time: '4:00pm' },
          { name: 'Enrique  Sanders', date: 'October 23', time: '5:00pm' },
        ],
     calendarEvents: [
        {
          name: 'Vacation',
          details: 'Going to the beach!',
          start: '2018-12-29',
          end: '2019-01-01',
          color: 'blue',
        },
        {
          name: 'Meeting',
          details: 'Spending time on how we do not have enough time',
          start: '2019-01-07 09:00',
          end: '2019-01-07 09:30',
          color: 'indigo',
        },
        {
          name: 'Large Event',
          details: 'This starts in the middle of an event and spans over multiple events',
          start: '2018-12-31',
          end: '2019-01-04',
          color: 'deep-purple',
        },
        {
          name: '3rd to 7th',
          details: 'Testing',
          start: '2019-01-03',
          end: '2019-01-07',
          color: 'cyan',
        },
        {
          name: 'Big Meeting',
          details: 'A very important meeting about nothing',
          start: '2019-01-07 08:00',
          end: '2019-01-07 11:30',
          color: 'red',
        },
        {
          name: 'Another Meeting',
          details: 'Another important meeting about nothing',
          start: '2019-01-07 10:00',
          end: '2019-01-07 13:30',
          color: 'brown',
        },
        {
          name: '7th to 8th',
          start: '2019-01-07',
          end: '2019-01-08',
          color: 'blue',
        },
        {
          name: 'Lunch',
          details: 'Time to feed',
          start: '2019-01-07 12:00',
          end: '2019-01-07 15:00',
          color: 'deep-orange',
        },
        {
          name: '30th Birthday',
          details: 'Celebrate responsibly',
          start: '2019-01-03',
          color: 'teal',
        },
        {
          name: 'New Year',
          details: 'Eat chocolate until you pass out',
          start: '2019-01-01',
          end: '2019-01-02',
          color: 'green',
        },
        {
          name: 'Conference',
          details: 'The best time of my life',
          start: '2019-01-21',
          end: '2019-01-28',
          color: 'grey darken-1',
        },
        {
          name: 'Hackathon',
          details: 'Code like there is no tommorrow',
          start: '2019-01-30 23:00',
          end: '2019-02-01 08:00',
          color: 'black',
        },
        {
          name: 'event 1',
          start: '2019-01-14 18:00',
          end: '2019-01-14 19:00',
          color: '#4285F4',
        },
        {
          name: 'event 2',
          start: '2019-01-14 18:00',
          end: '2019-01-14 19:00',
          color: '#4285F4',
        },
        {
          name: 'event 5',
          start: '2019-01-14 18:00',
          end: '2019-01-14 19:00',
          color: '#4285F4',
        },
        {
          name: 'event 3',
          start: '2019-01-14 18:30',
          end: '2019-01-14 20:30',
          color: '#4285F4',
        },
        {
          name: 'event 4',
          start: '2019-01-14 19:00',
          end: '2019-01-14 20:00',
          color: '#4285F4',
        },
        {
          name: 'event 6',
          start: '2019-01-14 21:00',
          end: '2019-01-14 23:00',
          color: '#4285F4',
        },
        {
          name: 'event 7',
          start: '2019-01-14 22:00',
          end: '2019-01-14 23:00',
          color: '#4285F4',
        },
      ],
    }
    
  },
  methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    },
};
</script>
<style scoped>

form{
  margin: auto;
}
input {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  height: 45px;
  margin-bottom: 25px;
  color:  #A9A9A9;
  width: 80%;
}

input:focus{
  outline: none;
}

.calendar {
  height: 50%;
}





</style>