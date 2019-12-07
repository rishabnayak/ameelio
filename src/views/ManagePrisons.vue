<template>
<div>
    <SideBarSuperUser
   name="Sarah Smith" >
        <template v-slot:body>
            <v-container>
                <h1> Manage Prisons </h1>
                <br>
                <v-toolbar dense elevation=1> <v-text-field v-model="search" placeholder="Search Prison" prepend-icon="search" full-width=true single-line hide-details></v-text-field></v-toolbar>
                
            </v-container>

        </template>
    </SideBarSuperUser>
</div>
</template>

<script>
import SideBarSuperUser from '../components/SideBarSuperUser'
export default {
    name: 'manage-prisons',
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