<template>
  <div class="collectRegDialog">
    <el-dialog
      :title="dialogTitle"
      @close="close"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <div class="dialogContent">
        <slot name="dialogForm"></slot>
      </div>
      <span slot="footer" class="dialog-footer">
        <slot name="footer"></slot>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      form: {
        name: ""
      }
    };
  },
  methods: {
    handleClose() {
      this.init();
    },
    //隐藏dialog
    init() {
      this.dialogVisible = false;
      this.$emit("hiddenDialog", this.dialogVisible);
    },

    close() {
      console.log("5655");
    }
  },
  watch: {
    visible(bl) {
      this.dialogVisible = bl;
    }
  }
};
</script>

<style lang="less" scope>
.collectRegDialog {
  .dialogContent {
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>