<template>
  <view class="container">
    <text>This is the App Details screen</text>
    <button title="Go to home screen" :on-press="goToDetailScreen"></button>
  </view>
</template>

<script>
export default {
  // Declare `navigation` as a prop
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
