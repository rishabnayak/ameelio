<template>
    <v-container>
        <CSVUpload />
    </v-container>
</template>

<script>

import CSVUpload from '../components/CSVUpload'
export default {
    name: 'CSV',
    components: {
        CSVUpload
    }
}
</script>