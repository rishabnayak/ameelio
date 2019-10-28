<script>
  export default {
    name: 'modal',

    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">

      <header class="modal-header">
        <div>
          <slot name="header"> 
          This is the default tile! </slot>
        </div>
          <button
            type="button" id="x"
            class="btn-close"
            @click="close">x
          </button>
        
      </header>

      <section class="modal-body">
        <slot name="body"> I'm the default body! </slot>
       </section>
       <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-green"
              @click="close" > Submit
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<style>


  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #42b0ff;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 15px;
    /*padding: 20px;*/
    cursor: pointer;
    font-weight: bold;
    color: #42b0ff;
    background: transparent;
    width: min-content;
  }

  .btn-green {
    color: white;
    background: #42b0ff;
    border: 1px solid #42b0ff;
    border-radius: 8px;
    padding: 5px;
    margin-left: 20px;
  }
</style>
