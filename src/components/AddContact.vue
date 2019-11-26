<template>
  <form @submit.prevent="addCon">
    <div>
      <h2 id="addContactTitle">Inmate Information</h2>
    </div>
    <label for="firstname">First Name</label>
    <div>
      <input v-model="firstname" type="text" placeholder="John" />
    </div>
    <label for="lastname">Last Name</label>
    <div>
      <input v-model="lastname" type="text" placeholder="Doe" />
    </div>
    <label for="inmateID">Inmate ID</label>
    <div>
      <input v-model="inmateID" type="text" placeholder="0123456789" />
    </div>
    <label for="birthdate">Birth Date</label>
    <div>
      <input v-model="birthdate" type="date" />
    </div>
    <label for="location">Place of Incarceration</label>
    <div>
      <v-select :items="prisons" v-model="location" label="Select the prison (required)"></v-select>
    </div>
    <label for="race">Race</label>
    <div>
      <input v-model="race" type="Race" />
    </div>
    <label for="sex">Sex</label>
    <br />
    <br />
    <label for="female">Female</label>
    <div>
      <input v-model="sex" id="female" value="female" type="radio" />
    </div>
    <label for="male">Male</label>
    <div>
      <input v-model="sex" id="male" value="male" type="radio" />
    </div>
    <br />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase/app";

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
    async getPrison() {
      let snapshot = await db.collection("user").get();
      let prisons = [];
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        prisons.push(doc.id);
      });
      this.prisons = prisons;
    },
    async addCon() {
      if (
        this.firstname &&
        this.lastname &&
        this.inmateID &&
        this.birthdate &&
        this.location &&
        this.race &&
        this.sex
      ) {
        let inmateDetails = await db
          .collection("users")
          .where("inmateID", "==", this.inmateID)
          .get();
        if (inmateDetails.empty) {
          return;
        } else {
          let adminDetails = await db
            .collection("users")
            .where("location", "==", inmateDetails.docs[0].data().location)
            .where("role", "==", "Admin")
            .get();
          if (adminDetails.empty) {
            return;
          } else {
            db.collection("users")
              .doc(adminDetails.docs[0].data().uid)
              .update({
                contactRequest: firebase.firestore.FieldValue.arrayUnion({
                  inmateUID: inmateDetails.docs[0].data().uid,
                  familyUID: this.user.uid
                })
              });
          }
        }
      }
      return;
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
