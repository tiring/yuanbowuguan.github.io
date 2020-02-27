<template>
  <div class="elImage">
    <el-image
      :preview-src-list="[baseImgUrl+imagesUrl]"
      style="width:100%;height:100%"
      :src="baseImgUrl+imagesUrl"
      :fit="fit"
    
    >
      <div style="text-align:center;font-size:18px;" slot="error">
        <p v-if="imagesUrl ==''">未上传图片</p>
        <p v-else>图片加载失败</p>
      </div>
    </el-image>
  </div>
</template>


<script>
import { Config } from "@utils/utils.js";
export default {
  props: {
    imagesUrl: {
      type: String,
      default: ""
    },
    fit: {
      type: String,
      default: "contain"
    }
  },
  mounted(){
    
      
  },
  data() {
    return {
      baseImgUrl: Config.baseImgUrl,
      imgLodding: true
    };
  },
  methods: {
   
  }
};
</script>
<style lang="less" scope>
.elImage {
 
  width: 100%;
  height: 100%;
  padding: 0px 0 20px 20px;
  box-sizing: border-box;
  p{
      line-height: 286px;
      font-weight: 700
  }
}
</style>