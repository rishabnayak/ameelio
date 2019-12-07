<template>
<div>
    <SideBarSuperUser
   name="Sarah Smith" >
        <template v-slot:body>
            <v-container>
                <h1> Admin Messages </h1>
                <br>
                <v-toolbar dense elevation=1> <v-text-field v-model="search" placeholder="Search Requests" prepend-icon="search" single-line hide-details  full-width="True"></v-text-field></v-toolbar>
                <v-container>
                    <v-app-bar>
                         <v-app-bar-nav-icon></v-app-bar-nav-icon>
                        <v-icon> fa-redo </v-icon>
                        <v-spacer></v-spacer>
                        <v-icon>fa-cog</v-icon>
                        </v-app-bar>
                    <v-app-bar>
                        <v-btn href="/admin-requests" class="ma-3 text-none" outlined text="true">
                                <v-icon>fa-clipboard-check</v-icon>
                                <v-col > </v-col>
                                Admin Requests
                        </v-btn>
                        <v-col sm="auto"> </v-col>
                        <v-btn href="/admin-messages" class="ma-3 text-none" outlined text="true">
                                <v-icon>fa-envelope</v-icon>
                                <v-col > </v-col>
                                Messages
                        </v-btn>
                    </v-app-bar>
                    <v-col></v-col>
                    <v-data-table
                    v-model="selected"
                    :search="search"
                    :headers="headers"
                    :items="items"
                    :items-per-page="5"
                    class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <tr>
                        <td>{{ props.item.name }}</td>
                        <td class="text-s-right">{{ props.item.name }}</td>
                         <td class="text-s-right">{{ props.item.id }}</td>
                        <td class="text-s-right">{{ props.item.jail }}</td>
                        <td class="text-s-right">{{ props.item.date}}</td>
                        <td class="text-s-right">{{ props.item.message}}</td>
                            </tr>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                    </v-data-table>
                </v-container>
            </v-container>
        </template>
    </SideBarSuperUser>
</div>
</template>

<script>
import SideBarSuperUser from '../components/SideBarSuperUser'
export default {
    name: 'admin-requests',
    components: {
      SideBarSuperUser
  },
  methods:{
        showAlert(a){
        if (event.target.classList.contains('btn__content')) return;
        console.log("HI")
        }
    },
    data (){
      return{
      isExpanded: false,
      search:'',
      headers: [
          {
              text: 'Inmate Name',
              align: 'left',
              value:'name'
          },
          {
              text: 'Jail',
              value:'jail'
          },
          {
              text: 'Inmate ID Number',
              value:'id'
          },
          {
              text: 'Date of Request',
              value: 'date'
          },
          {
              text: 'Message',
              value: 'message'
          }
          ],
      items: [
          {
              name: "Cici Chown",
              jail: "Demo County Jail",
              id: "2473294873894",
              date:"May 20, 2019",
              message:"Hello there Susie I hope you are doing well."
          },
          {
              name: "Tom Jom Sr",
              jail: "Demo County Jail",
              id: "209830984",
              date:"May 20, 1999",
              message:"Hello there I am having trouble with my video call"
          },
          {
              name: "Elizabeth Brown",
              jail: "Demo County Jail",
              id: "2234242",
              date:"September 21, 2001",
              message:"Hello I wanted to follow up on my family connection."
          }
      ],

    }
    
  }
};
</script>