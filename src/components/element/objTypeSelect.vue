<template>
  <!-- 藏品类型选择器 -->
   <!--  -->
  <div class="objTypeSelect">
    <el-select
      :clearable="true"
     @change="selectChange"
      style="width:100%"
      :filterable="true"
      v-model="selectDefault"
      placeholder="请选择"
      :disabled="disabled"
    >
      <el-option v-for="item in objType" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
import { objType } from "@utils/utils.js";
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      objType: objType,
      selectDefault: ''
    };
  },
  mounted(){
    this.selectDefault = this.value
  },
  methods: {
    //选择器的值改变时触发
    selectChange(data) {
      this.$emit("input", data);
    }
  },
  watch:{
    value(value){
      this.selectDefault = value 
    }
  }
};
</script>