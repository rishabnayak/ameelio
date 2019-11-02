<template>
 <v-navigation-drawer
   id="drawer"
   app
   dark
   width="20%"
   class="blue"
   :mini-variant.sync="mini"
   permanent
 >
   <v-img v-if="!mini"
     src="@/assets/logo.png"
     height="50"
     contain
   />
   <v-img v-else
     src="@/assets/logo_mini.png"
     height="50"
     contain
   />
   <v-list-item>
     <v-list-item-avatar>
       <v-img src="@/assets/profile_placeholder.png"></v-img>
     </v-list-item-avatar>
     <v-list-item-content>
       <v-list-item-title>John Leider</v-list-item-title>
     </v-list-item-content>
     <v-btn
       icon
       @click.stop="mini = !mini"
     >
       <v-icon>mdi-chevron-left</v-icon>
     </v-btn>
   </v-list-item>
   <v-divider></v-divider>
   <v-list dense>
     <v-list-item
       v-for="item in items"
       :key="item.title"
       link
     >
       <v-list-item-icon>
         <v-icon>{{ item.icon }}</v-icon>
       </v-list-item-icon>
       <v-list-item-content>
         <v-list-item-title>{{ item.title }}</v-list-item-title>
       </v-list-item-content>
     </v-list-item>
   </v-list>
   <template v-slot:append>
     <div class="pa-2">
       <v-btn block color="error">Logout</v-btn>
     </div>
   </template>
 </v-navigation-drawer>
</template>
<script>
 export default {
  name: "Sidebar",
   data () {
     return {
       drawer: true,
       items: [
         { title: 'Home', icon: 'dashboard' },
         { title: 'About', icon: 'question_answer' },
       ],
       mini: true,
     }
   },
 }
</script>