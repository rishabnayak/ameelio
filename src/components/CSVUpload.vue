<template>
    <div>
        <form action='http://localhost:5001/ameelio-badeb/us-central1/pushTest' method='PUT'>
            <input type="file" name="fileName" accept=".csv,image/*" value="CSV_file">

            <br>
            <br>
            <input type="hidden" name="uid" :value="uid" />
            <input type="submit" name="item" id="second" value="Upload">

        </form>
    </div>

</template>
<script>
export default {
    name: 'CSVUpload',
    computed: {
        uid() {
            return this.$store.state.user.uid;
        }
    }
}
</script>