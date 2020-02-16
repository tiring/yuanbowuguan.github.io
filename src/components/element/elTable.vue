<template>
  <!-- 带分页的表格组件 -->
  <div class="table">
    <el-table
      v-loading="tableLoading"
      @selection-change="selectionChange"
      :stripe="true"
      :data="tableData"
      style="width: 100%"
      :row-key="rowKey"
    >
      <el-table-column
        header-align="center"
        align="center"
        v-if="selection"
        type="selection"
        width="55"
        :reserve-selection="true"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        header-align="center"
        align="center"
        type="index"
        width="50"
        label="序号"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        header-align="center"
        align="center"
        v-for="(item,key,index) in fields"
        :key="index"
        :prop="key"
        :label="item"
      >
        <template slot-scope="scope">
          <span
            @click="clickObjName(scope.row)"
            class="objName"
            v-if="key=='name'"
          >{{scope.row.name}}</span>
          <span v-else>{{scope.row[key]}}</span>
        </template>
      </el-table-column>

      <slot name="operation"></slot>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      class="pagination"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

 <script>
export default {
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          }
        ];
      },
      required: true
    },
    total: {
      type: Number,
      default: 0,
      required: true
    },
    selection: {
      type: Boolean,
      default: true
    },
    fields: {
      type: Object,
      default: function() {
        return {};
      },
      required: true
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tableLoading: this.loading
    };
  },

  methods: {
    rowKey(row) {
      return row.id;
    },
    //   页数改变时触发
    currentChange(current) {
      this.$emit("currentChange", current);
    },
    // 每页条数改变时触发
    sizeChange(sizeChange) {
      this.$emit("sizeChange", sizeChange);
    },
    // 选择项改变时触发
    selectionChange(selection) {
      this.$emit("selectionChange", selection);
    },
    //点击藏品名称
    clickObjName(row) {
      this.$emit("clickObjName", row);
    }
  },
  watch: {
    loading(bl) {
      this.tableLoading = bl;
      console.log(bl);
    }
  }
};
</script>

<style lang="less" scope>
.table {
  padding: 10px;
  .objName {
    color: rgb(246, 127, 69);
    cursor: pointer;
  }
  .pagination {
    text-align: center;
    margin-top: 10px;
  }
}
</style>