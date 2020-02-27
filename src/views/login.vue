<template>
  <div class="login">
    <router-link to="/">主页</router-link>
  </div>
</template>

<script>
import {Config} from "@utils/utils.js"
export default {
  methods: {},
  mounted() {
    console.log(Config);
    
  }
};
</script>

<style lang="less" scope></style>
