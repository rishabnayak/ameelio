<template>
  <div>
    <div id="main">
      <div>
        <form>
          <div>
            <h2 class="infoTitle">Inmate Information</h2>
          </div>
          <label for="inmateFirstName">First Name</label>
          <div>
            <input type="text" name="inmateFirstName" placeholder="John" />
          </div>
          <label for="inmateLastName">Last Name</label>
          <div>
            <input type="text" name="inmateLastName" placeholder="Doe" />
          </div>
          <label for="date">Birth Date</label>
          <div>
            <input type="date" name="date" />
          </div>
          <label for="location">Place of Incarceration</label>
          <div>
            <input type="text" name="location" />
          </div>
          <label for="race">Race</label>
          <div>
            <input type="text" name="race" />
          </div>
          <label for="sex">Sex</label>
          <div>
            <input type="radio" value="male" /> Male
            <br />
            <input type="radio" value="female" /> Female
            <br />
            <input type="radio" value="other" /> Other
            <br />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";

export default {
  name: "AddContact",
  components: {
    Sidebar
  }
};
</script>

<style>
form {
  margin-left: 22%;
  margin-top: 5%;
  width: 80%;
}
input[type="text"],
input[type="date"] {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  height: 45px;
  color: #a9a9a9;
  width: 80%;
}

input,
label {
  margin-bottom: 25px;
}

input:focus {
  outline: none;
}

.infoTitle {
  margin-bottom: 30px;
}
</style>