<template>
	<form @submit.prevent="addCon">
	<div><h2 id="addContactTitle">Inmate Information</h2></div>
	<label for="firstName">First Name</label>
	<div><input v-model="firstName" type="text" placeholder="John"></div>
	<label for="lastName">Last Name</label>
	<div><input v-model="lastName" type="text" placeholder="Doe"></div>
	<label for="date">Birth Date</label>
	<div><input v-model="date" type="date"></div>
	<label for="location">Place of Incarceration</label>
	<div><input v-model="location" type="text"></div>
	<label for="race">Race</label>
	<div><input v-model="race" type="Race"></div>
	<label for="sex">Sex</label>
	<br>
	<br>
	<label for="female">Female</label>
	<div><input v-model="sex" id="female" value="Female" type="radio"></div>
	<label for="male">Male</label>
	<div><input v-model="sex" id="male" value="Male" type="radio"></div>
	<br>
	<button type="submit">Submit</button>  
	</form>
</template>

<script>
import { db } from '@/main'

	export default{
		data: () => ({
			firstName: null,
			lastName: null,
          	date: null,
          	location: null,
          	race: null,
          	sex: null,
		}),
	
  	methods: {
    async addCon () {
      	await db.collection('test').doc('shreya.banga@gmail.com').collection('myInmate').add({
          firstName: this.firstName,
          lastName: this.lastName,
          birthDate: this.date ,
          location: this.location,
          race: this.race ,
          sex: this.sex ,
		})

		this.firstName= '',
        this.lastName='',
        this.date='' ,
        this.location='',
        this.race='',
        this.sex='',
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