<template>
  <div>
    <Sidebar name="John Doe" >

    <!-- < -->
    <template v-slot:body>
      <v-container class='calendar'>

        <h1>Calendar</h1>
        <Calendar :height="calendarHeight"></Calendar>

        <!-- <p>{{calendarTime}}</p> -->
      </v-container>

      <v-container>
        
        <h1>Past Calls</h1>
        <Appointments ></Appointments>


      </v-container>


      
    </template>
  </Sidebar>
  
  </div>

</template>




<script>
import Appointments from '../components/Appointments'

import Calendar from '../components/Calendar'
import AddContact from '../components/AddContact'
import Sidebar from '../components/Sidebar'
// import HelloWorld from './HelloWorld.vue'
export default {
  name: 'home',
  components: {
    Appointments,

    Calendar,
    AddContact,
    Sidebar
    // HelloWorld
  },
  data (){
    return{
     calendarHeight: 500,

    }
    
  },
  methods: {

    },
};
</script>








<style scoped>
*{
  margin-left: 20px;
}

</style>
















