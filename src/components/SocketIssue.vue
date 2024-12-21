<script setup lang="ts">
const str = `
const buttons = ref([]);

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

function updateBtns(buttons) {
  buttons.value = buttons;
}

const updateButtonsDebounce = debounce(updateBtns, 100)

function updateButtons(update) {
  updateButtonsDebounce(update.buttons);
}

<div><button v-for="button in buttons" ...></div>

ws.on('message', updateButtons);
`;
</script>

<template>
  <code>
    <pre>
      {{str}}
    </pre>
  </code>
  <pre>
  </pre>
</template>

<style scoped>

</style>
