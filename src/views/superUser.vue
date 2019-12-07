<template>
  <div>
    <SidebarSuperUser name="Sarah Smith" >

    <template v-slot:body>
      <v-container>
          <p> Welcome Admin! </p>
          <router-link to="/admin-requests">yolo</router-link>
      </v-container>

    </template>
  </SidebarSuperUser>
  
  </div>
</template>




<script>
import SidebarSuperUser from '../components/SideBarSuperUser'

export default {
  name: 'super-user',
  components: {
    SidebarSuperUser
  },
  data (){
    return{
      isExpanded: false
    }
    
  }
};
</script>








<style scoped>
*{
  margin-left: 20px;
}

</style>
















