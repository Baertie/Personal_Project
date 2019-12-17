<template>
  <view class="container">
    <text>This is the App Details screen</text>
    <button title="Go to home screen" :on-press="goToDetailScreen"></button>
  </view>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    goToDetailScreen() {
      this.navigation.navigate("Details");
    }
  }
};
</script>

<style>
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
