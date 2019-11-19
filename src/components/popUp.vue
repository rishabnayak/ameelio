<template>
  <div>
    <button type="button" class="btn" @click="showModal">
      <slot name="buttonText">Button</slot>
    </button>
    <modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <slot name="title"></slot>
      </template>
      <template v-slot:body>
        <slot name="content"></slot>
      </template>
    </modal>
  </div>
</template>
<script>
import modal from "../components/Modal";
export default {
  name: "popUp",
  components: {
    modal
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style>
.popUp {
  width: 50%;
}
button {
  background-color: #ff6666;
  color: white;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  display: inline;
}
</style>