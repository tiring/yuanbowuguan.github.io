<template>
  <!-- element图片上传封装 -->
  <div class="uploadImg">
    <el-upload
      class="upload-demo"
      :action="url+'/images/uploadToServer'"
      :multiple="false"
      :on-exceed="handleExceed"
      :on-success="onSuccess"
      :file-list="fileList"
   
      :limit="1"
      :on-remove="onRemove"
      :on-error="onError"
      ref="uploadImg"
    >
      <el-button :style="{'width':width}" size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { Config, _message } from "@utils/utils.js";
export default {
  props: {
    width: {
      type: String,
      default: "100%"
    }
  },
  data() {
    return {
      url: Config.baseUrl,
      imgId: "",
      fileList: []
    };
  },
  methods: {
    
    //文件超出
    handleExceed() {
      _message("error", "最大上传数为1个文件,请先移除当前图片");
    },
    beforeRemove(file) {
    
      
      
    
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onRemove(){
     this.imgId = ''
      this.$emit("winUploadImg", this.imgId);
      
    },
    onSuccess(response, file, fileList) {
      if (response.code == 0) {
        this.imgId = response.date.id;
     
      this.$emit("winUploadImg", this.imgId);
      }else{
        this.$refs.uploadImg.clearFiles()
        
         this.fileList = []
        _message('error','文件上传失败')
      }
      
    },
    onError(){
  this.$refs.uploadImg.clearFiles()
        
         this.fileList = []
        _message('error','文件上传失败')
    },
    
  }
};
</script>

<style lang="less" scope>
.uploadImg {
  .el-upload {
    width: 100%;
  }
}
</style>

