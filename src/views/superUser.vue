<template>
  <div>
    <SideBarSuperUser
   name="Sarah Smith" >

    <template v-slot:body>
      <v-container>
          <p> Welcome Admin! </p>
          <router-link to="/admin-requests">Admin Requests</router-link>
          <router-link to="/admin-calendar">Admin Calendar</router-link>
          <router-link to="/manage-prisons">Manage Prisons</router-link>
          <router-link to="/admin-requests">Reports</router-link>
      </v-container>

    </template>
  </SideBarSuperUser
>
  
  </div>
</template>




<script>
import SideBarSuperUser from '../components/SideBarSuperUser'
export default {
  name: 'super-user',
  components: {
    SideBarSuperUser
  
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
















