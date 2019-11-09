<template>
	<form @submit.prevent="addCon">
	<div><h2 id="addContactTitle">Inmate Information</h2></div>
	<label for="firstName">First Name</label>
	<div><input type="text" name="firstName" placeholder="John"></div>
	<label for="lastName">Last Name</label>
	<div><input type="text" name="lastName" placeholder="Doe"></div>
	<label for="date">Birth Date</label>
	<div><input type="date" name="date"></div>
	<label for="location">Place of Incarceration</label>
	<div><input type="text" name="location"></div>
	<label for="race">Race</label>
	<div><input type="Race" name="race"></div>
	<label for="sex">Sex</label>
	<div><input type="radio" name="Sex"></div>
	<button type="submit">Submit</button>  
	</form>
</template>

<script>
import { db } from '@/main'
	export default{
		data: () => ({
			firstname: null,
			lastname: null,
          	birthdate: null,
          	location: null,
          	race: null,
          	sex: null,
		}),
	//name: "AddContact",
  	methods: {
    async addCon () {
      	await db.collection("test").add({
          firstname: this.firstname,
          lastname: this.lastname,
          birthdate: this.birthdate ,
          location: this.location,
          race: this.race ,
          sex: this.sex ,
		})
		alert("Succeessfully added")
    } 
  }
}
</script>

<style scoped>
form{
  margin: auto;
  width: 80%;
}
input {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  height: 45px;
  margin-bottom: 25px;
  color:#A9A9A9;
  width: 80%;
}

input:focus{
  outline: none;
}

#addContactTitle{
  margin-bottom: 30px;
}

</style>