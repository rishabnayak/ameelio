<template>
<div>
    <SideBarSuperUser
   name="Sarah Smith" >
        <template v-slot:body>
            <v-container>
                <h1> Admin Calendar </h1>
                <br>
                <v-toolbar dense elevation=1> <v-text-field v-model="search" placeholder="Search Requests" prepend-icon="search" full-width=true single-line hide-details></v-text-field></v-toolbar>
              <br>
              <v-card-title>
                September
              </v-card-title>
              <v-data-table
                    v-model="selected"
                    :search="search"
                    :headers="headers"
                    :items="items"
                    :items-per-page="5"
                    class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <tr @click="showAlert(props.item)">
                        <td>{{ props.item.prison }}</td>
                        <td class="text-m-right">{{ props.item.prison }}</td>
                        <td class="text-m-right">{{ props.item.state }}</td>
                        <td class="text-m-right">{{ props.item.country }}</td>
                        <td class="text-m-right">{{ props.item.zipcode}}</td>
                        <td class="text-m-right">{{ props.item.callcount}}</td>
                            </tr>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
                <v-card-title>
                October
              </v-card-title>
              <v-data-table
                    v-model="selected"
                    :search="search"
                    :headers="headers"
                    :items="items"
                    :items-per-page="5"
                    class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <tr>
                        <td>{{ props.item.prison }}</td>
                        <td class="text-m-right">{{ props.item.prison }}</td>
                        <td class="text-m-right">{{ props.item.state }}</td>
                        <td class="text-m-right">{{ props.item.country }}</td>
                        <td class="text-m-right">{{ props.item.zipcode}}</td>
                        <td class="text-m-right">{{ props.item.callcount}}</td>
                            </tr>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
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
      return {
      isExpanded: false,
      search:'',
      headers: [
          {
              text: 'Prison',
              value:'prison'
          },
          {
              text: 'State',
              value:'state'
          },
          {
              text: 'Country',
              value: 'country'
          },
          {
              text: 'Zip Code',
              value: 'zipcode'
          },
          {
              text: 'Number of Calls Scheduled',
              value: 'callcount'
          }
          ],
      items: [
          {
              prison: "Demo County Prison",
              state: "MA",
              country: "USA",
              zipcode:"02215",
              callcount:"44 Calls Scheduled"
          },
          {
              prison: "Demo County Prison 2",
              state: "CA",
              country: "USA",
              zipcode:"02345",
              callcount:"20 Calls Scheduled"
          },
          {
              prison: "Demo County Prison 4",
              state: "Alabama",
              country: "USA",
              zipcode:"02456",
              callcount:"100 Calls Scheduled"
          },
      ]
    }
    
  }
};
</script>