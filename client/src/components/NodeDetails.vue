<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div v-if="selectedNode" class="modal-mask">
    <div class="modal-container">
      <button @click="selectedNode = null" class="close">&times;</button>
      <h3>Selected Node Details</h3>
      <p>Name: {{ selectedNode?.data?.name }}</p>
      <p>Description: {{ selectedNode?.data?.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedNode: String
})
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  animation: drop 1s ease forwards;
}

@keyframes drop {
  0% {
    opacity: 0;
  }

  70% {
    transform: translateY(250px);
  }

  100% {
    transform: translateY(200px);
    opacity: 1;
  }
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  border: none;
  background: none;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
