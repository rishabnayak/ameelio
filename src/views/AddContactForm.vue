<template>
	<div>

	<Sidebar name = "John doe giant last name">
		<template v-slot:body>

			<form>
				<h2 class='infoTitle'>Personal Information</h2>
				<label for="userFirstName">First Name</label>
				<div><input type="text" name="userFirstName" placeholder="John"></div>
				<label for="userLastName">Last Name</label>
				<div><input type="text" name="userLastName" placeholder="Doe"></div>
				<label for="relationship">Relationship With Inmate</label>
				<div><input type="text" name="relationship" placeholder="Brother"></div>
			</form>

			<AddContact />
		</template>
	</Sidebar>
	</div>
</template>

<script>
	import AddContact from "../components/AddContact"
	import Sidebar from "../components/Sidebar"
	export default{
		name: "AddContactForm",
		components: {
			AddContact,
			Sidebar
		},
		data() {
			return {
				username: "John Doe this is a userLastName"
			}
		}
	}
</script>


<style scoped>

	
</style>