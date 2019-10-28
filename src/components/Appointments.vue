<template>
  <div >
    <!-- <p >{{msg}}</p> -->
<!-- 
  <v-container>
      <v-row>
        <v-col>
            <p>Hello</p>
        </v-col>
      </v-row>
  </v-container> -->
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
  .v-data-table, .container{
    max-height: 100%;
    min-width: 100%;
    margin: 0;
  }
/*  *{
    margin: 0;
  }*/
</style>