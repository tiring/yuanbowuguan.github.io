<template>
  <div id="enterMuseumReg" class="enterMuseumReg">
    <Search @anditState="anditState" @submitData="submitData"></Search>
    <div class="content">
      <div class="btns">
        <el-button @click="enterReg" size="small">入馆登记</el-button>
        <el-button @click="downloadTemp" size="small">下载模板</el-button>
        <el-button size="small">模板导入</el-button>
        <el-button size="small">批量图片导入</el-button>
        <el-button size="small" @click="derivedTableByIds">表格导出</el-button>
      </div>
      <Table
        @currentChange="currentChange"
        @sizeChange="sizeChange"
        @clickObjName="clickObjName"
        @selectionChange="selectionChange"
        :total="total"
        :tableData="tableData"
        :fields="fields"
        :loading="loading"
      >
        <el-table-column
          header-align="center"
          align="center"
          slot="operation"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              style="margin-right:10px"
              :class="scope.row.enterAuditResults != '待审核'?'btn':''"
              :disabled="scope.row.enterAuditResults != '待审核'"
              @click="anditBtn(scope.row)"
              size="small"
            >审核</el-button>
            <el-popconfirm @onConfirm="del(scope.row)" title="确定删除?">
              <el-button size="small" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </Table>
    </div>
    <!-- 审核弹窗 -->
    <Dialog dialogTitle="入馆信息审核" @hiddenDialog="hiddenDialog" :visible.sync="dialogVisible">
      <el-form disabled slot="dialogForm" size="small" ref="form" :model="form" label-width="100px">
        <el-row :gutter="20">
          <el-col :offset="4" :span="8">
            <el-form-item label="藏品名称">
              <el-input v-model="dialogData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label>
              <el-image style="width: 100%; height: 100px;margin-top:-40px" fit="contain"></el-image>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="8">
            <el-form-item label="藏品类型">
              <objTypeSelect :defaultVal="dialogData.type"></objTypeSelect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格 (cm)">
              <el-input v-model="dialogData.offer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="8">
            <el-form-item label="藏品报价">
              <el-input v-model="dialogData.offer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="完残情况">
              <el-select
                style="width:100%"
                :filterable="true"
                v-model="dialogData.brokenCondition"
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
            <el-form-item label="质地">
              <el-input v-model="dialogData.texture"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上传人">
              <el-input disabled v-model="dialogData.uploadingPeopleId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="8">
            <el-form-item label="临时编号">
              <el-input v-model="dialogData.temporaryNumbering"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来源">
              <el-input v-model="dialogData.source"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="16">
            <el-form-item label="征集说明">
              <el-input type="textarea" v-model="dialogData.solicitationInstructions"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="16">
            <el-form-item label="征集意见">
              <el-input type="textarea" v-model="dialogData.solicitationInstructions"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="8">
            <el-form-item label="征集审核人">
              <el-input v-model="dialogData.solicitAuditMan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="征集审核时间">
              <el-input v-model="dialogData.update"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="16">
            <el-form-item label="入馆审核说明">
              <el-input type="textarea" v-model="dialogData.enterAuditOpinions"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="isAudit('1')">审核通过</el-button>
        <el-button @click="isAudit('2')">审核不通过</el-button>
      </div>
    </Dialog>

    <!-- 修改弹窗 -->
    <Dialog dialogTitle="入馆信息修改" @hiddenDialog="hiddenDialog1" :visible.sync="dialogVisible1">
      <el-form slot="dialogForm" size="small" ref="form" :model="form" label-width="100px">
        <el-row :gutter="20">
          <el-col :offset="4" :span="8">
            <el-form-item label="藏品名称">
              <el-input v-model="dialogData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label>
              <el-image style="width: 100%; height: 100px;margin-top:-40px" fit="contain"></el-image>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="8">
            <el-form-item label="藏品类型">
              <objTypeSelect :defaultVal="dialogData.type"></objTypeSelect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格 (cm)">
              <el-input v-model="dialogData.offer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="8">
            <el-form-item label="藏品报价">
              <el-input v-model="dialogData.offer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="完残情况">
              <el-select
                style="width:100%"
                :filterable="true"
                v-model="dialogData.brokenCondition"
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
            <el-form-item label="质地">
              <el-input v-model="dialogData.texture"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上传人">
              <el-input disabled v-model="dialogData.uploadingPeopleId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="8">
            <el-form-item label="临时编号">
              <el-input v-model="dialogData.temporaryNumbering"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来源">
              <el-input v-model="dialogData.source"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="16">
            <el-form-item label="征集说明">
              <el-input type="textarea" v-model="dialogData.solicitationInstructions"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="16">
            <el-form-item label="征集意见">
              <el-input type="textarea" v-model="dialogData.solicitationInstructions"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="8">
            <el-form-item label="征集审核人">
              <el-input v-model="dialogData.solicitAuditMan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="征集审核时间">
              <el-input v-model="dialogData.update"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="16">
            <el-form-item label="入馆审核说明">
              <el-input type="textarea" v-model="dialogData.enterAuditOpinions"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="modification">修改信息</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Search from "@components/collectReg/collectRegSearch.vue";
import Dialog from "@components/collectReg/collectRegDialog.vue";
import Table from "@components/element/elTable.vue";
import objTypeSelect from "@components/element/objTypeSelect.vue";
import { isGood, _message, Config } from "@utils/utils.js";
import {
  getEnterMuseumRegData,
  derivedTable,
  EnterMuseumRegAudit
} from "@api/collectReg/collectReg.js";
export default {
  components: {
    Search,
    Table,
    Dialog,
    objTypeSelect
  },
  data() {
    return {
      form: {},
      //审核弹出框
      dialogVisible: false,
      //修改弹窗
      dialogVisible1: false,

      // 字段
      fields: {
        img: "图片",
        name: "藏品名称",
        type: "藏品类型",
        source: "来源",
        updated: "登记时间",
        enterAuditResults: "审核状态"
      },
      // 表格数据
      tableData: [],
      // 总数
      total: 0,
      isGood: isGood,
      //分页信息
      page: {
        page: "1",
        size: "10",
        listSort: "created",
        isDesc: "DESC"
      },
      // 选中表格条数的ids
      ids: "",
      // 征集人id
      id: "",
      //弹出框信息
      dialogData: {
        //完残情况
        brokenCondition: "",
        // id
        id: "",
        // 藏品名称
        name: "",
        // 规格
        norms: "",
        // 藏品报价
        offer: "",
        // 数量
        quantity: 0,
        // 图片信息
        recruitImageList: [],
        //征集说明
        solicitationInstructions: "",
        //征集审核意见
        solicitAuditOpinions: "",
        // 来源
        source: "",
        // 临时编号
        temporaryNumbering: "",
        // 藏品类型
        type: "",
        // 上传人id
        uploadingPeopleId: "",
        //质地
        texture: "",
        // 征集时间
        updated: "",
        // 征集审核人
        solicitAuditMan: "",
        // 入馆说明
        enterAuditOpinions: ""
      },
      //懒加载表格
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 封装数据请求
    init() {
      this.loading = true;
      getEnterMuseumRegData(this.page, this.form).then(res => {
        if (res.data.code == 0) {
          this.loading = false;
          _message("success", res.data.msg);
          this.tableData = res.data.date.content;
          this.total = res.data.date.totalElements;
          this.tableData.forEach(item => {
            if (item.enterAuditResults == 0) {
              item.enterAuditResults = "待审核";
            } else if (item.enterAuditResults == 1) {
              item.enterAuditResults = "审核通过";
            } else {
              item.enterAuditResults = "未通过";
            }
          });
        } else {
          _message("error", res.data.msg);
        }
      });
    },
    // 搜索提交按钮
    submitData(data) {
      this.form = data;
      this.init();
    },
    // 搜索审核状态
    anditState(state) {
      this.form = {};
      if (state == 3) {
        this.form = {};
      } else {
        this.$set(this.form, "solicitAuditResults", state);
      }
      this.init(this.page, this.form);
    },
    // 审核按钮触发
    anditBtn(row) {
      this.dialogVisible = true;

      // this.dialogData = row.collection;
      let collection = row.collection;
      this.dialogData = {
        id: row.id,
        collectionId: row.collectionId,
        name: collection.name,
        type: collection.type,
        offer: collection.offer,
        texture: collection.texture,
        temporaryNumbering: collection.temporaryNumbering,
        quantity: collection.quantity,
        norms: collection.norms,
        brokenCondition: collection.brokenCondition,
        uploadingPeopleId: collection.uploadingPeopleId,
        source: collection.source,
        solicitAuditOpinions: collection.solicitAuditOpinions,
        solicitationInstructions: collection.solicitationInstructions,
        imagesId: collection.imagesId,
        solicitAuditMan: collection.solicitAuditMan
      };
    },
    //删除列表
    del(row) {
      console.log(row);
    },
    //入馆登记按钮
    enterReg() {
      this.$router.push("enterMuseumeEntering");
    },
    // 隐藏dialog框
    hiddenDialog(bl) {
      this.dialogVisible = bl;
    },
    //隐藏修改dialog框
    hiddenDialog1(bl) {
      this.dialogVisible1 = bl;
    },
    //点击藏品名称触发
    clickObjName(row) {
      console.log(row);
      this.dialogVisible1 = true;
      let collection = row.collection;
      this.dialogData = {
        id: row.id,
        collectionId: row.collectionId,
        name: collection.name,
        type: collection.type,
        offer: collection.offer,
        texture: collection.texture,
        temporaryNumbering: collection.temporaryNumbering,
        quantity: collection.quantity,
        norms: collection.norms,
        brokenCondition: collection.brokenCondition,
        uploadingPeopleId: collection.uploadingPeopleId,
        source: collection.source,
        solicitAuditOpinions: collection.solicitAuditOpinions,
        solicitationInstructions: collection.solicitationInstructions,
        imagesId: collection.imagesId,
        solicitAuditMan: collection.solicitAuditMan
      };
    },
    //点击修改
    modification() {
      this.dialogVisible1 = false;
    },
    // 点击取消
    cancel() {
      this.dialogVisible1 = false;
    },
    //获取一页显示多少个
    sizeChange(size) {
      this.page.size = size;
      this.init();
    },
    //获取页数
    currentChange(page) {
      this.page.page = page;
      this.init();
    },
    //下载模板
    downloadTemp() {
      location.href = Config.baseUrl + "/collection.xlsx";
    },
    //获取数据ids
    selectionChange(id) {
      let ids = [];
      id.forEach(item => {
        ids.push(item.id);
      });

      this.ids = ids.join(",");
    },
    //根据ids导出表格
    derivedTableByIds() {
      derivedTable(this.ids).then(res => {
        console.log(res);
      });
    },
    // 是否通过审核
    isAudit(state) {
      EnterMuseumRegAudit(this.id, state).then(res => {
        if (res.data.code == 0) {
          _message("success", res.data.msg);
          this.dialogVisible = false;
          this.init(this.page, this.form);
        } else {
          _message("error", res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scope>
#enterMuseumReg {
  .content {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 20px;
    .btns {
      margin: 10px;
    }
    .btn {
      background: #ccc;
      color: #fff;
    }
  }
}
</style>