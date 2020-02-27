<template>
  <div id="collectRegDialog" class="collectRegDialog">
    <el-dialog
      :destroy-on-close="true"
      ref="dialog"
      @close="close"
      :visible.sync="dialogVisible"
      width="980px"
      :before-close="handleClose"
      :fullscreen="fullscreen"
    >
      <i :class="['fullDialog',classIcon]" @click="fullDialog"></i>
      <p class="dialogTitle">{{dialogTitle}}</p>

      <div id="dialogScroll" :style="{height:height}" class="dialogForm">
        <vuescroll ref="vs" @handle-scroll="handleScroll" style="position: static" :ops="ops">
          <slot name="dialogForm"></slot>
        </vuescroll>
      </div>

      <div class="navMenu">
        <ul class="navMenuUl">
          <li
            v-for="(item,index) in navMenu"
            :key="index"
            @click="getActiv(index)"
            :class="activ==index?'avt':''"
          >{{item}}</li>
        </ul>
      </div>

      <div class="btns">
        <p v-for="(item,index) in dialogBtns" :key="index">
          <el-button :disabled="isModification && index == 0" :class="isModification && index == 0?'disabledBtn':''" size="small" @click="dialogBtnClick(index)">{{item}}</el-button>
        </p>
      
      </div>
    </el-dialog>
  </div>
</template>
<script>
import vuescroll from "vuescroll";
import { Config } from "@utils/utils.js";
export default {
  components: {
    vuescroll
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ""
    },
    navMenu: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    dialogBtns:{
      type:Array,
      required:true,
      default:function(){
        return []
      }
    },
    isModification:{
      type:Boolean,
      default:false
    },
    value:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      activ: "0",
      //滚动条配置
      ops: {
        vuescroll: {
          mode: "native"
        }
      },
      dialogVisible: this.value,
      // 放大缩小的图标
      classIcon: "el-icon-zoom-in",
   
      // 是否全屏
      fullscreen: false,
      // 默认状态下为600的高度
      height: "600px",
    };
  },
  mounted() {
   
  },
  methods: {
    //按钮触发
    dialogBtnClick(index){
      this.$emit("dialogBtnClick",index+1)
    },
    //设置滑动距离api
    offsetTopFn(top, vs) {
      vs.scrollTo(
        {
          y: top
        },
        200
      );
      // this.activ = "1"
    },

    getActiv(state) {
      // this.activ = state;
      this.$nextTick(() => {
        this.$emit("getActiv", state, this.$refs.vs);
      });
    },
    // 滑动触发
    handleScroll(vertical, horizontal, nativeEvent) {
      this.$emit("getScrollTop", vertical.scrollTop);
      this.activ = this.$store.state.collectReg.activ;
    },

    handleClose(done) {
      this.init();
    },
    //隐藏dialog
    init() {
      this.dialogVisible = false;
      this.$emit("input", this.dialogVisible);
    },
    // 弹窗关闭触发
    close() {
      this.activ = "0";
    },
    // 点击放大或者缩小触发
    fullDialog() {
      this.$emit("fullDialog");
      if (this.fullscreen) {
        //缩小
        this.height = "600px";
        this.fullscreen = false;
        this.classIcon = "el-icon-zoom-in";
      } else {
        // 放大
        this.height = "85vh";
        this.fullscreen = true;
        this.classIcon = "el-icon-zoom-out";
      }
    }
  },
  watch: {
    // 监听变化
    visible(bl) {
      this.dialogVisible = bl;
    },
    value(bl){
      this.dialogVisible =bl
    } 
     }
};
</script>

<style lang="less" scope>
#collectRegDialog {
  .dialogForm {
    z-index: 1;
    position: relative;
    background: #fff;
    padding: 20px;
    width: 80%;
    border: #ccc solid 1px;
    box-shadow: 1px 1px 7px #ccc;
    .el-collapse-item__header {
      border: none;
    }
    .el-collapse-item__wrap {
      border: none;
    }

    .baseMsg,
    .collectMsg {
      height: 24px;
      color: #666;
      padding-left: 20px;
      border-left: #b79862 solid 5px;
      font-size: 18px;
      line-height: 24px;
    }
  }
  .el-dialog {
    background: #f1f1f1;
  }
  .el-dialog__body {
    margin-bottom: 20px;
    padding-top: 5px;
  }
  .fullDialog {
    position: absolute;
    top: 22px;
    right: 50px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      color: #469ffe;
    }
  }
  .el-dialog__header {
    padding: 0;
  }
  .dialogTitle {
    font-size: 18px;
    margin: 10px 0;
    padding-left: 20px;
    border-left: #b79862 solid 5px;
  }
  .dialogContent {
    height: 100%;
  }

  .navMenu {
    position: absolute;
    bottom: 5%;
    left: 85%;
    .navMenuUl {
      padding: 10px 0px 10px 20px;
      border-left: #ccc solid 2px;
      li {
        margin: 10px 0;
        padding: 5px;
        cursor: pointer;
        background: #b79862;
        color: #fff;
      }
      .avt {
        border: #b79862 solid 1px;
        color: #b79862;
        background: #fff;
      }
    }
  }
  .btns {
    &::after {
      content: "";
      position: absolute;
      top: 35px;
      right: 80px;
      width: 200px;
      height: 2px;
      background: #ccc;
    }
    &::before {
      content: "";
      position: absolute;
      top: 86px;
      right: 80px;
      width: 200px;
      height: 2px;
      background: #ccc;
    }
    position: absolute;
    top: 8%;
    left: 87%;
    text-align: center;
    .disabledBtn {
      background: #ccc;
      border: none;
    }
    button {
      margin-top: 20px;
      width: 80px;
      text-align: center;
    }
  }
}
</style>