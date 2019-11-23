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
    /*
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            filterable: true,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
    */
  }
</script>