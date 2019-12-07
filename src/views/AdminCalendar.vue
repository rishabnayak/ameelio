<template>
<div>
    <SideBarSuperUser
   name="Sarah Smith" >
        <template v-slot:body>
            <v-container>
                <p> Admin Calendar </p>
                
            </v-container>

        </template>
    </SideBarSuperUser>
</div>
</template>

<script>
import SideBarSuperUser from '../components/SideBarSuperUser'
export default {
    name: 'admin-calendar',
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