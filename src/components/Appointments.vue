<template>
  <div>
    <v-container>
      <v-data-table :headers="mainHeaders" :items="mainItems" item-key="name"></v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Appointments",
  props: {
    mainHeaders: Array,
    mainItems: Array
  }
};
</script>
<style scoped>
.v-data-table,
.container {
  max-height: 100%;
  min-width: 100%;
  margin: 0;
  border-radius: 10px;
}
</style>