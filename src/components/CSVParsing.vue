<template>
	<div>
		<form>
            <div><h2 class="infoTitle">Upload CSV</h2></div>
			<div><v-file-input show-size dense chips label="Click to Upload Your File"></v-file-input></div>
            <div><button @click="close">Submit</button></div>
		</form>
	</div>
</template>

<script>

	export default{
		name: "CSVParsing",
		components:{
		}
    }
</script>

<style scoped>
div {
  width: 1000px;
}
</style>