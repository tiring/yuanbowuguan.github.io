<template>
  <!-- 带分页的表格组件 -->
  <div id="table" class="table">
    <el-alert :closable="false" v-if="selection" class="alert" show-icon type="warning">
      <p name="title" class="title">
        已选择 {{selections.length}} 项
        <el-button @click="emptySelect" id="emptySelect" class="emptySelect" type="text">清空</el-button>
        当前已选择藏品名称 {{objNames}}
      </p>
    </el-alert>
    <el-table
      ref="table"
      v-loading="tableLoading"
      @selection-change="selectionChange"
      :stripe="true"
      :data="tableData"
      style="width: 100%"
      :row-key="rowKey"
      @sort-change="sortChange"
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
        prop="img"
     
        label="图片"
      >
      <template scope="scopeImg">
         <el-image
           style="width: 50px; height: 50px"
           :src="scopeImg.row.collection.recruitImageList.length?baseImgUrl+scopeImg.row.collection.recruitImageList[0].image.thumbnailUri:''"
           fit="contain"
              >
              <div slot="error">
                <i style="line-height:50px;font-size:20px" class="el-icon-error"></i>
                </div></el-image>
      </template></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        header-align="center"
        align="center"
        v-for="(item,key,index) in fields"
        :key="index"
        :prop="key"
        :label="item"
        :sortable="key=='img'?false:'custom'"
      >
        <template slot-scope="scope">
          <span
            @click="clickObjName(scope.row)"
            class="objName"
            v-if="key=='name'"
          >{{scope.row.name}}</span>
          <span v-else-if="key.indexOf('AuditResults')!=-1">
            {{scope.row[key] |filterAudit }}
          </span>
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
      :current-page="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

 <script>
 import {  Config } from "@utils/utils.js";
export default {
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [];
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
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tableLoading: this.loading,
      selections: [],
      objNames: "",
        baseImgUrl: Config.baseImgUrl,
    };
  },

  methods: {
    sortChange(column, prop, order) {
      // console.log(column);
      let listSort;

      if (column.order == "ascending") {
        listSort = "ASC";
      } else {
        listSort = "DESC";
      }

      this.$emit("getlistSort", listSort, column.prop);
    },
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
      let ids = [];
      let names = [];
      selection.forEach(item => {
        ids.push(item.collectionId);
        names.push(item.name);
      });

      this.ids = ids.join(",");
      this.objNames = names.join(",");
      this.selections = selection;
      this.$emit("selectionChange", this.ids, selection);
    },
    //点击藏品名称
    clickObjName(selection) {
      this.$emit("clickObjName", selection);
    },
    // 清空选择
    emptySelect() {
      this.$refs.table.clearSelection();
    }
  },
  filters:{
    filterAudit(state){
      // console.log(state);
      if (state == 0) {
        return "待审核"
      }else if (state == 1) {
        return "审核通过"
      }else if (state == 2) {
        return "未通过"
      }else{
        return state
      }
      
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
#table {
  padding: 10px;
  .alert {
    .title {
      font-size: 16px;
    }
    #emptySelect {
      background: 0 0;
      border: none;
      border-radius: none;
      color: #b79862;
      font-size: 16px;
    }
  }

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