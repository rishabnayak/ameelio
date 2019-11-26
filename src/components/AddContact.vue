<template>
  <form @submit.prevent="addCon">
    <div><h2 id="addContactTitle">Inmate Information</h2></div>
    <label for="firstname">First Name</label>
    <div><input v-model="firstname" type="text" placeholder="John" /></div>
    <label for="lastname">Last Name</label>
    <div><input v-model="lastname" type="text" placeholder="Doe" /></div>
    <label for="inmateID">Inmate ID</label>
    <div><input v-model="inmateID" type="text" placeholder="0123456789" /></div>
    <label for="birthdate">Birth Date</label>
    <div><input v-model="birthdate" type="date" /></div>
    <label for="location">Place of Incarceration</label>
    <div>
      <v-select
        :items="prisons"
        v-model="location"
        label="Select the prison (required)"
      ></v-select>
    </div>
    <label for="race">Race</label>
    <div><input v-model="race" type="Race" /></div>
    <label for="sex">Sex</label>
    <br />
    <br />
    <label for="female">Female</label>
    <div><input v-model="sex" id="female" value="female" type="radio" /></div>
    <label for="male">Male</label>
    <div><input v-model="sex" id="male" value="male" type="radio" /></div>
    <br />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { db } from "@/main";

export default {
  data: () => ({
    prisons: null,
    firstname: null,
    lastname: null,
    inmateID: null,
    birthdate: null,
    location: null,
    race: null,
    sex: null
  }),

  mounted() {
    this.getPrison();
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    // async getPrison() {
    //   let snapshot = await db.collection("prisons").get();
    //   let prisons = [];
    //   snapshot.forEach(doc => {
    //     console.log(doc.id);
    //     prisons.push(doc.id);
    //   });

    async getPrison() {
      let snapshot = await db.collection("user").get();
      //console.log(this.user).get();
      let prisons = [];
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        prisons.push(doc.id);
      });
      this.prisons = prisons;
      // console.log(this.prisons);
    },

    async addCon() {
      await db
        .collection("user")
        .doc(this.user.uid)
        .add({
          // companyName:
          // this.firstname,
          // this.lastname,
          // this.inmateID,
          // this.birthdate,
          // this.location,
          // this.race,
          // this.sex
          // "bla"

          contacts: [
            this.firstname,
            this.lastname,
            this.inmateID,
            this.birthdate,
            this.location,
            this.race,
            this.sex
          ]
        })
        .catch(function(error) {
          console.log(error);
        });

      (this.firstname = ""),
        (this.lastname = ""),
        (this.birthdate = ""),
        (this.location = ""),
        (this.race = ""),
        (this.sex = ""),
        (this.companyName = "bla"),
        alert("Succeessfully added");
      this.getPrison();
    }
  }
};
</script>

<style scoped>
form {
  margin: auto;
  width: 80%;
}
input {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  height: 45px;
  margin-bottom: 25px;
  color: #a9a9a9;
  width: 80%;
}

input:focus {
  outline: none;
}

#addContactTitle {
  margin-bottom: 30px;
}
</style>
