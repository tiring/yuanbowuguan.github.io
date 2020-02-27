<template>
  <div class="index">
    <el-container>
      <el-header style="background:#000">Header</el-header>
      <el-container>
        <el-aside style="background:#000;height:93vh" width="200px">Aside</el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scope>
</style>
