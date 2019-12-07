<template>
<div>
    <SideBarSuperUser
   name="Sarah Smith" >
        <template v-slot:body>
            <v-container>
                <p> Manage Prisons </p>
                
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