<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="mainHeaders"
      :items="mainItems"
      :search="search"
      :no-data-text="'There are no requests at the moment'"
      :no-results-text="'No matching requests found'"
      :must-sort="true"
      item-key="name"
    >
      <template v-slot:item.action="{ item }">
        <v-btn 
          class="mr-2"
          text icon color="blue lighten-2"
          @click="approve(item)"
        >
          <v-icon small>mdi-thumb-up</v-icon>
        </v-btn>
        <v-btn
          text icon color="red lighten-2"
          @click="decline(item)"
        >
          <v-icon small>mdi-thumb-down</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    name: "Appointments",
    props: {
      mainHeaders: Array,
      mainItems: Array,
      search: '',
    },

    methods:{
      approve (item) {
        confirm('Are you sure you want to approve this request?')
      },

      decline (item) {
        confirm('Are you sure you want to decline this request?')
      }
    }
  }
</script>