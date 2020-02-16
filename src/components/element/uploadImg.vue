<template>
  <!-- element图片上传封装 -->
  <div class="uploadImg">
    <el-upload
      class="upload-demo"
      :action="url+'/images/uploadToServer'"
      :multiple="false"
      :on-exceed="handleExceed"
      :on-success="onSuccess"
      :file-list="filList"
      :on-change="onChange"
      :limit="1"
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //文件超出
    handleExceed() {
      _message("error", "最大上传数为1个文件,请先移除当前图片");
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onSuccess(response, file, fileList) {
      this.imgId = response.date.id;
      console.log(this.imgId);
      this.$emit("winUploadImg", response, file, fileList);
    },
    onChange(file, fileList) {
      console.log(file, fileList, this.fileList);
    }
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

