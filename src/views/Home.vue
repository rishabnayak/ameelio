<template>
  <div>
    <Sidebar name="John Doe" >

    <!-- < -->
    <template v-slot:body>
      <v-container class='calendar'>

        <h1>Calendar</h1>
        <Calendar :events="calendarEvents" :height="calendarHeight"></Calendar>
        <popUp>
          <template v-slot:buttonText>Add a Contact</template>
          <template v-slot:title><h1>Add a Contact</h1></template>
          <template v-slot:content>
            <AddContact />
          </template>
        </popUp>
        <popUp>
          <template v-slot:buttonText>Schedule a Call</template>
          <template v-slot:title><h1>Schedule a Call</h1></template>
          <template v-slot:content>
            <v-select  :items="contacts" label="Select a person from your contacts"></v-select>

            <!-- <v-row justify="center">
                <v-date-picker v-model='calendarDate'></v-date-picker>
            </v-row> -->
            <v-row justify="center">
                <v-time-picker v-model="calendarTime"></v-time-picker>
            </v-row>

          </template>
        </popUp>
        <!-- <p>{{calendarTime}}</p> -->
      </v-container>

      <v-container>
        
        <h1>Past Calls</h1>
        <Appointments :mainHeaders="mainHeadersContacts"
                      :mainItems="mainItemsContacts"
         ></Appointments>


      </v-container>


      
    </template>
  </Sidebar>
  
  </div>

</template>




<script>
import Appointments from '../components/Appointments'
import modal from '../components/Modal'
import popUp from '../components/popUp'
import Calendar from '../components/Calendar'
import AddContact from '../components/AddContact'
import Sidebar from '../components/Sidebar'
// import HelloWorld from './HelloWorld.vue'
export default {
  name: 'home',
  components: {
    Appointments,
    modal,
    popUp,
    Calendar,
    AddContact,
    Sidebar
    // HelloWorld
  },
  data (){
    return{
      isExpanded: false,
      calendarDate: new Date().toISOString().substr(0, 10),
      calendarTime: null,
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
     calendarHeight: 500,

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
*{
  margin-left: 20px;
}

</style>
















