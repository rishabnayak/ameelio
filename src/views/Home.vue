<template>
  <div>

    <!-- < -->
    <v-container>
      <v-row>
        <div class="col col-2 sidebar">
          <v-col>
            <p>This will be the sidebar</p>
          </v-col>
        </div>
        
        <v-col>
          <v-container>
            <div class="calls">
              <v-row>
                <v-col>
                  <p>Future Calls</p>
                  
                  <Appointments></Appointments>
                </v-col>
              </v-row>
              <popUp>
                <template v-slot:buttonText>Add Contact</template>
                <template v-slot:title>Add Contact</template>
                <template v-slot:content>
                  <form>
                    
                    <div><input type="text" name="firstName" placeholder="First Name"></div>
                    <div><input type="text" name="lastName" placeholder="Last Name"></div>
                    <div><input type="date" name="date"></div>
                    </form>
                </template>
              </popUp>
              <popUp>
                <template v-slot:buttonText>Schedule a Call</template>
                <template v-slot:title>Schedule a Call</template>
                <template v-slot:content>
                  <v-select  :items="contacts" label="Select a person from your contacts"></v-select>
                </template>
              </popUp>

<!--               <div class="addContact">
                <button type="button" class="btn" @click="showModal">
                  Add a Contact
                </button>
                <modal v-show="isModalVisible" @close="closeModal">
                  <template v-slot:header>Add a Contact</template>
                  <template v-slot:body>
                    
                        </template>

                </modal>

                <button type="button" class="btn" @click="showModal">
                  Schedule a Call
                </button>
                <modal v-show="isModalVisible" @close="closeModal">
                  <template v-slot:header>Schedule a Call</template>
                  <template v-slot:body>
                    <select></select>
                  </template>

                </modal>
              </div> -->
  

            </div>
            
            <div class="calls" align-center>
              
              <v-row >
                <v-col>
                  <p>Calendar</p>
                  <Appointments></Appointments>
                </v-col>
              </v-row>
              
            </div>
          </v-container>
          
        </v-col>
      </v-row>
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
      contacts: ['Louis', 'Amelia', 'etc.']
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

/*.modal {
  width: 200px;
}*/
.row, .container {
  padding: 0;
  min-width: 100%;
}
input {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  height: 45px;
  margin-top: 10px;
  color:  #A9A9A9;
  width: 80%;
}

input:focus{
  outline: none;
}



.sidebar {
  background-image: linear-gradient(to bottom,  #399BE2,#42b0ff);
  color: white;
}

</style>