<template>
  <div id="collectReg" class="collectReg">
    <div class="collectRegMain">
      <p class="collectRegTitle">{{title}}</p>
      <div class="collectRegFrom">
        <el-form
          label-width="90px"
          :rules="rules"
          label-position="right"
          size="small"
          ref="form"
          :model="form"
         
        >
          <el-row class="collectRegRow" :gutter="20">
            <el-col :offset="4" :span="8">
              <el-form-item prop="name" label="藏品名称:">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规格( cm )">
                <el-input v-model="form.norms"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="4" :span="8">
              <el-form-item label="藏品类型:">
                <objTypeSelect v-model="form.type"></objTypeSelect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="完残情况:">
                <el-select
                  style="width:100%"
                  :filterable="true"
                  v-model="form.brokenCondition"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in isGood"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :offset="4" :span="8">
              <el-form-item prop="offer" label="藏品报价:">
                <el-input v-model="form.offer"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上传人:">
                <el-input disabled v-model="loadName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="4" :span="8">
              <el-form-item prop="quantity" label="藏品数量:">
                <el-input v-model.number="form.quantity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图片:">
                <!-- <el-input v-model="form.image"></el-input> -->
                <elUploadImg @winUploadImg="winUploadImg"></elUploadImg>
              </el-form-item>
            </el-col>
            <el-col :offset="4" :span="8">
              <el-form-item label="临时编号:">
                <el-input v-model="form.temporaryNumbering"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来源:">
                <el-input v-model="form.source"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="4" :span="16">
              <el-form-item label="征集说明:">
                <el-input :rows="8" type="textarea" v-model="form.solicitationInstructions"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-button :disabled="bl" :class="bl?'submit':''"  @click="submit" type="button ">提交申请</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
import { objType, isGood, _message } from "@utils/utils.js";
import elUploadImg from "@components/element/uploadImg.vue";
import objTypeSelect from "@components/element/objTypeSelect.vue";
export default {
  components: {
    elUploadImg,
    objTypeSelect
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      //是否禁用提交
      bl:false,
      loadName: "李添鑫",
      // 表单字段
      form: {
        // 藏品名称
        name: "",
        // 规格
        norms: "",
        // 藏品类型
        type: "",
        // 完残情况
        brokenCondition: "",
        // 藏品报价
        offer: "",
        // 上传人id
        uploadingPeopleId: "",
        // 藏品数量
        quantity: "",
        // 图片
        imagesId: [],
        // 临时编号
        temporaryNumbering: "",
        // 来源
        source: "",
        // 征集说明
        solicitationInstructions: ""
      },
      //藏品类型选项
      objTypeSelect: objType,
      // 完残情况选项
      isGood: isGood,
      //表单验证
      rules: {
        name: [{ required: true, message: "请输入藏品名称", trigger: "blur" }],
        offer: [{ required: true, message: "请输入藏品报价", trigger: "blur" }],
        quantity: [
          { required: true, message: "请输入藏品数量", trigger: "blur" },
          { type: "number", message: "数量必须为正整数" }
        ]
      }
    };
  },
  mounted() {
    // console.log(this.objTypeSelect);
  },
  methods: {
    winUploadImg(id) {
      if (id) {
        this.form.imagesId = JSON.stringify([id]);
      }else{
        this.form.imagesId = []
      }
        
    },
    submit() {
      this.bl  = true
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("getCollectRegForm", this.form);
          // this.bl = false;
        } else {
          _message("error", "请输入必填信息");
          return false;
        }
      });
    },
    // 修改bl状态
    setBlState(){
      this.bl  =false;
    }
  }
};
</script>
<style lang="less" scope>
#collectReg {
  min-width: 350px;
  .collectRegMain {
    border: 1px solid #ccc;
    padding: 30px 0px;
    .collectRegTitle {
      text-align: center;
      font-size: 28px;
      color: #666;
      margin-bottom: 30px;
    }
    .collectRegFrom {
      .collectRegRow {
        text-align: center;
        margin: 0 auto;
        .submit{
          background: #ccc;
          border: none;
        }
      }
      
    }
  }
  
}
</style>