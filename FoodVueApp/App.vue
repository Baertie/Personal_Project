<template>
  <view class="container">
    <app></app>
  </view>
</template>
<script>
import App from "./navigation/AppNavigator";

export default {
  components: { App }
};
</script>
<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.text-color-primary {
  color: blue;
}
</style>
