<template>
  <div>

    <!-- < -->
    <v-container>
      <p>Past Calls</p>
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
// import HelloWorld from './HelloWorld.vue'
export default {
  name: 'home',
  components: {
    Appointments,
    modal,
    popUp
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
      date: new Date().toISOString().substr(0, 10),
      time: null



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


</style>