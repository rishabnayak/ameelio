<template>
	<form @submit.prevent="addCon">
	<div><h2 id="addContactTitle">Inmate Information</h2></div>
	<label for="firstname">First Name</label>
	<div><input v-model="firstname" type="text" placeholder="John"></div>
	<label for="lastname">Last Name</label>
	<div><input v-model="lastname" type="text" placeholder="Doe"></div>
	<label for="birthdate">Birth Date</label>
	<div><input v-model="birthdate" type="date"></div>
	<label for="location">Place of Incarceration</label>
	<div><v-select  :items="prisons" v-model="location" label="Select the prison (required)"></v-select></div>
	<label for="race">Race</label>
	<div><input v-model="race" type="Race"></div>
	<label for="sex">Sex</label>
	<br>
	<br>
	<label for="female">Female</label>
	<div><input v-model="sex" id="female" value="female" type="radio"></div>
	<label for="male">Male</label>
	<div><input v-model="sex" id="male" value="male" type="radio"></div>
	<br>
	<button type="submit">Submit</button>  
	</form>
</template>

<script>
import { db } from '@/main'

	export default{
		data: () => ({
			prisons: null,
			firstname: null,
			lastname: null,
          	birthdate: null,
          	location: null,
          	race: null,
          	sex: null,
		}),

	mounted () {
		this.getPrison()
	},
	
  	methods: {

	async getPrison () {
	
		let snapshot = await db.collection('prisons').get()
      	let prisons = []
      	snapshot.forEach(doc => {
        console.log(doc.id)
        prisons.push(doc.id)
      })
		
		this.prisons = prisons
	},

    async addCon () {
      	await db.collection('test').doc('shreya.banga@gmail.com').collection('myInmate').add({
          firstname: this.firstname,
          lastname: this.lastname,
          birthdate: this.birthdate ,
          location: this.location,
          race: this.race ,
          sex: this.sex ,
		})

		this.firstname= '',
        this.lastname='',
        this.birthdate='' ,
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