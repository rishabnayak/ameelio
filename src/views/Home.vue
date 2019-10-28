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
              <v-container>
              
                    <div class="addContact">
                      <button type="button" class="btn" @click="showModal">
                        Add a Contact
                      </button>
                      <modal v-show="isModalVisible" @close="closeModal">
                        <template v-slot:header>Add a Contact</template>
                        <template v-slot:body>
                          <form>
                            <!-- <p>First Name</p> -->
                            <div><input type="text" name="firstName" placeholder="First Name"></div>
                            <div><input type="text" name="lastName" placeholder="Last Name"></div>
                            <div><input type="date" name="date"></div>
                          </form>
                        </template>

                      </modal>
                    </div>
                  </v-container>



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
// import HelloWorld from './HelloWorld.vue'
export default {
  name: 'home',
  components: {
    Appointments,
    modal
    // HelloWorld
  },
  data (){
    return{
      isModalVisible: false
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

button{
  background-color: #ff6666;
  color: white;
  padding: 10px;
  border-radius: 10px
}

.sidebar {
  background-image: linear-gradient(to bottom,  #399BE2,#42b0ff);
  color: white;
}

</style>