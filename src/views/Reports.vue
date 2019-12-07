<template>
<div>
    <SideBarSuperUser
   name="Sarah Smith" >
        <template v-slot:body>
            <v-container>
                 <v-card-title>
                Reports
              </v-card-title>
                <v-toolbar dense elevation=1> <v-text-field v-model="search" placeholder="Search Requests" prepend-icon="search" full-width=true single-line hide-details></v-text-field></v-toolbar>  
              <v-alert type="warning" icon="warning">
                        Unread Bug Reports
              </v-alert>
              <v-data-table
                    v-model="selected"
                    :search="search"
                    :headers="headers"
                    :items="items"
                    :items-per-page="5"
                    class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <tr @click="showAlert(props.item)">
                        <td>{{ props.item.name }}</td>
                        <td class="text-s-right">{{ props.item.name }}</td>
                        <td class="text-s-right">{{ props.item.id }}</td>
                        <td class="text-s-right">{{ props.item.jail }}</td>
                        <td class="text-s-right">{{ props.item.date}}</td>
                         <td class="text-s-right">{{ props.item.bug}}</td>

                            </tr>
                    </template>
                </v-data-table>
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
      return {
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
              text: 'Bug',
              value: 'bug'
          }
          ],
      items: [
          {
              name: "Timmy Smith",
              jail: "Demo County Jail",
              id: "2473294873894",
              date:"May 20, 2019",
              bug: "Crash report #394893 Report: The calls keep crashing....."
          },
          {
              name: "Tom Smith Sr",
              jail: "Demo County Jail",
              id: "209830984",
              date:"May 20, 1999",
              bug: "Crash report #390000 I can't stay on my call for longer than 4 minutes....."
          },
          {
              name: "Jane Annie",
              jail: "Demo County Jail",
              id: "2234242",
              date:"September 21, 2001",
              bug: "Crash report #39999 I can't add a family member"
          }
      ],
      }
  }
};
</script>