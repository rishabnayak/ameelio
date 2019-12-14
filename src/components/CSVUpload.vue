<template>
    <div>
        <form>
            <input type="file" name="fileName" accept=".csv,image/*" value="CSV_file">

            <br>
            <br>
            <input type="hidden" name="uid" :value="uid" />
            <input  method='POST' type="submit" name="item" id="second" value="Upload">

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