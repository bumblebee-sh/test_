<script setup lang="ts"></script>
<template>
  <div class="loader">
    <svg class="loader_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
      <path
        fill="none"
        stroke="#FF156D"
        stroke-width="30"
        stroke-linecap="round"
        stroke-dasharray="300 385"
        stroke-dashoffset="0"
        d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
      >
        <animate
          attributeName="stroke-dashoffset"
          calcMode="spline"
          dur="1.4"
          values="685;-685"
          keySplines="0 0 1 1"
          repeatCount="indefinite"
        ></animate>
      </path>
    </svg>
  </div>
</template>

<style scoped>
.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  .loader_icon {
    width: 200px;
  }
  path {
    stroke: var(--color-green);
  }
}
.loader:after {
  content: '';
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: var(--vt-c-black-soft);
  opacity: 0.5;
  top: 0;
  left: 0;
}
</style>
