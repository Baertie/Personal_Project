<template>
  <app></app>
</template>

<script>
import App from "./navigation/AppNavigator.vue";

export default {
  components: { App }
};
</script>
<style>
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
}
.text-color-primary {
  color: blue;
}
</style>
