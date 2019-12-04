<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
   <main-tab-bar class="tabbar"/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'app',
  components: {
  MainTabBar
  }
}
</script>

<style scoped>
  @import "./assets/css/base.css";
  .tabbar{
    position: fixed;
    left: 0;
    right:0;
    bottom: 0;
    z-index: 9;
  }
</style>
