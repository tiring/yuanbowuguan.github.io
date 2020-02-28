<template>
  <div>
    <collectReg ref="collectReg" @getCollectRegForm="getCollectRegForm" :title="title"></collectReg>
  </div>
</template>


<script>
import collectReg from "@components/collectReg/objReg.vue";
import { saveOrUpdate } from "@api/collectReg/collectReg.js";
import { _message } from "@utils/utils.js";
export default {
  components: {
    collectReg
  },
  data() {
    return {
      title: "征集登记"
    };
  },
  mounted() {
    // console.log(this.objTypeSelect);
  },
  methods: {
    getCollectRegForm(data) {
      saveOrUpdate(data).then(res => {
        if (res.data.code == 0) {
          _message("success", res.data.msg);
          //延迟一秒跳转页面
          setTimeout(() => {
            this.$router.push("collectRegContent");
            //修改提交按钮状态
             this.$refs.collectReg.setBlState()
          }, 1000);
        } else {
          //修改提交按钮状态
         this.$refs.collectReg.setBlState()
          _message("error", res.data.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scope>
</style>