<template>
  <div>
    <collectReg @getCollectRegForm="getCollectRegForm" :title="title"></collectReg>
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
      console.log(data);
      
      saveOrUpdate(data).then(res => {
        if (res.data.code == 0) {
          _message("success", res.data.msg);
          setTimeout(() => {
            this.$router.push("collectRegContent");
          }, 1000);
        } else {
          console.log(_message);
          _message("error", res.data.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scope>
</style>