<template>
  <div id="app">
    <div class="common-area"></div>
    <div class="content">
      <p class="content-header">费用管理</p>
      <p class="nav-change">力调电费</p>
      <powerFactor/>
    </div>
    
  </div>
</template>

<script>
import powerFactor from './components/powerFactor.vue'

export default {
  name: 'App',
  components: {
    powerFactor
  }
}
</script>

<style lang="less">
body {
  margin: 0;
}
p {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  display: flex;
  .common-area {
    width: 60px;
    height: 100%;
    background-color: #001619;
  }
  .content {
    width: calc(100% - 60px);
    height: 100%;
    background-color: #f2f4f5;
    .content-header {
      height: 50px;
      background-color: #fff;
      line-height: 50px;
      padding-left: 2%;
    }
    .nav-change {
      height: 40px;
      line-height: 40px;
      padding-left: 2%;
    }
    
  }
}
</style>
