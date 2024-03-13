<template>
    <div>
      <h4>Shows</h4>
    <img src="https://cataas.com/cat" alt="Image Description" height="100" width="100" />
  
      <!-- Trigger Button -->
      <button @click="showDialog = true">Show Details</button>
  
      <!-- Dialog Window -->
      <div v-if="showDialog" class="modal">
        <div class="modal-content">
          <span class="close-button" @click="showDialog = false">&times;</span>
          <h2>Dialog Title</h2>
          <img src="https://cataas.com/cat" alt="Image Description" />
          <p>This is a description of the content or the context of this dialog.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    name: "App",
    setup() {
      const showDialog = ref(false);
      return { showDialog };
    },
  });
  </script>
  
  <style scoped>
  h1 {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  .close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .close-button:hover,
  .close-button:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>