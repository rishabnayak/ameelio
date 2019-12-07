<template>
<div>
    <SideBarSuperUser
   name="Sarah Smith" >
        <template v-slot:body>
            <v-container>
                <p> Reports </p>
                
            </v-container>

        </template>
    </SideBarSuperUser>
</div>
</template>

<script>
import SideBarSuperUser from '../components/SideBarSuperUser'
export default {
    name: 'reports',
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