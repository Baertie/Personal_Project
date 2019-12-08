<template>
  <view class="container">
    <text class="heading">Home</text>
    <text class="text">This is the Home screen</text>
    <button title="View Detail" :on-press="goToDetail"></button>
  </view>
</template>

<script>
export default {
  props: {
    navigation: { type: Object }
  },
  methods: {
    goToDetail() {
      this.navigation.navigate("Details");
    }
  }
};
</script>

<style>
.container {
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 50px;
}
.heading {
  font-size: 30px;
  font-weight: bold;
  color: darkolivegreen;
  margin: 20px;
}
.text {
  text-align: center;
  margin: 10px;
}
</style>
