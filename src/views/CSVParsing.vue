<template>
  <div>
  <Sidebar name="John Doe">
      <template v-slot:body>
          HELOOOOOOOOOOOOOOOOOo
      </template>
  </Sidebar>
  <CSVParsing/>
  </div>
</template>



<script>
import Sidebar from '../components/Sidebar'
import CSVParsing from '../components/CSVParsing'
// import HelloWorld from './HelloWorld.vue'
export default {
  name: 'CSVParsing',
  components: {
    Sidebar,
    CSVParsing
    // HelloWorld
  },
  data (){
    return{
        isExpanded: false,
    }
    
  },
  methods: {
    },
};
</script>
<style scoped>

/**{
  max-height: 100vh;
}*/



.main {
  height: 50%;
  margin-left: 12%;
}








</style>