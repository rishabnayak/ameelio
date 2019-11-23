<template>
<<<<<<< Updated upstream
  <div >
    <!-- <p >{{msg}}</p> -->
<!-- 
=======
  <div>
    <!-- <p >{{msg}}</p> -->
    <!-- 
>>>>>>> Stashed changes
  <v-container>
      <v-row>
        <v-col>
            <p>Hello</p>
        </v-col>
      </v-row>
<<<<<<< Updated upstream
  </v-container> -->
=======
    </v-container>-->
>>>>>>> Stashed changes
    <v-container>
      <v-data-table :headers="mainHeaders"
                     :items="mainItems"
                     item-key="name" >
      </v-data-table>
    </v-container>  
  </div>
</template>
<script>
// import HelloWorld from './components/HelloWorld';
export default {
  name: 'Appointments',
  props:{
    mainHeaders: Array,
    mainItems: Array
  }
  // data () {
  //     return {
  //       mainHeaders: [
  //         { text: 'Name', value: 'name' },
  //         { text: 'Date', value: 'date' },
  //         { text: 'Time', value: 'time'}
  //       ],
<<<<<<< Updated upstream
  
=======

>>>>>>> Stashed changes
  //       mainItems: [
  //         { name: 'Marc Moreno', date: 'October 30', time: '3:00pm' },
  //         { name: 'Wallace  Frank', date: 'October 31', time: '4:00pm' },
  //         { name: 'Enrique  Sanders', date: 'October 45', time: '5:00pm' },
  //         // { name: 'Marc Moreno', date: 'October 30', time: '3:00pm' },
  //         // { name: 'Wallace  Frank', date: 'October 31', time: '4:00pm' },
  //         // { name: 'Enrique  Sanders', date: 'October 45', time: '5:00pm' },
  //         // { name: 'Marc Moreno', date: 'October 30', time: '3:00pm' },
  //         // { name: 'Wallace  Frank', date: 'October 31', time: '4:00pm' },
  //         // { name: 'Enrique  Sanders', date: 'October 45', time: '5:00pm' },

  //       ]
  //     }
  //   }
};
</script>
<style scoped>
<<<<<<< Updated upstream
  .v-data-table, .container{
    max-height: 100%;
    min-width: 100%;
    margin: 0;
    border-radius: 10px;
  }

=======
.v-data-table,
.container {
  max-height: 100%;
  min-width: 100%;
  margin: 0;
  border-radius: 10px;
}
>>>>>>> Stashed changes

/*  *{
    margin: 0;
  }*/
</style>