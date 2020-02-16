<template>
  <div class="enterMuseumeEntering">
    <collectReg @getCollectRegForm="getCollectRegForm" :title="title"></collectReg>
  </div>
</template>


<script>
import collectReg from "@components/collectReg/objReg.vue";
import { _message } from "@utils/utils.js";
import { libraryUpdate } from "@api/collectReg/collectReg.js";
export default {
  components: {
    collectReg
  },
  data() {
    return {
      title: "入馆登记"
    };
  },
  mounted() {
    // console.log(this.objTypeSelect);
  },
  methods: {
    getCollectRegForm(formData) {
      libraryUpdate(formData).then(res => {
        if (res.data.code == 0) {
          _message("success", res.data.msg);
          setTimeout(() => {
            this.$router.push("enterMuseumReg");
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