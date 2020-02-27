<template>
  <div class="app" id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  .el-button {
    background: #b79862;
    color: #fff;
    border-radius: 5px;
    border-color: #b79862;
  }
  .el-button {
    &:hover {
      background: #b79862;
    }
  }
}
</style>
