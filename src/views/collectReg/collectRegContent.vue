<template>
  <div id="collectRegContent" class="collectRegContent">
    <Search :anditState="auditNum" @anditState="anditState" @submitData="submitData"></Search>
    <div class="content">
      <div class="btns">
        <el-button @click="enterReg" size="small">征集登记</el-button>
        <el-button @click="downloadTemp" size="small">下载模板</el-button>
        <el-button size="small">模板导入</el-button>
        <el-button size="small">批量图片导入</el-button>
        <el-button @click="derivedTableByIds" size="small">表格导出</el-button>
      </div>
      <Table
        @currentChange="currentChange"
        @sizeChange="sizeChange"
        @clickObjName="clickObjName"
        @selectionChange="selectionChange"
        :total="total"
        :tableData="tableData"
        :fields="fields"
        class="collectTable"
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
              :class="scope.row.solicitAuditResults != '待审核'?'btn':''"
              style="margin-right:10px"
              :disabled="scope.row.solicitAuditResults != '待审核'"
              @click="anditBtn(scope.row)"
              size="small"
            >审核</el-button>
            <el-popconfirm @onConfirm="del(scope.row.id)" title="确定删除?">
              <el-button size="small" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </Table>
    </div>
    <!-- 审核弹窗 -->
    <Dialog dialogTitle="征集信息审核" @hiddenDialog="hiddenDialog" :visible.sync="dialogVisible">
      <el-form disabled slot="dialogForm" size="small" ref="form" :model="form" label-width="80px">
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
              <el-input v-model="dialogData.norms"></el-input>
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
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="isAudit('1')">审核通过</el-button>
        <el-button @click="isAudit('2')">审核不通过</el-button>
      </div>
    </Dialog>

    <!-- 修改弹窗 -->
    <Dialog dialogTitle="征集信息修改" @hiddenDialog="hiddenDialog1" :visible.sync="dialogVisible1">
      <el-form slot="dialogForm" size="small" ref="form" :model="form" label-width="80px">
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
              <objTypeSelect @objTypeData="objTypeData" :defaultVal="dialogData.type"></objTypeSelect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格 (cm)">
              <el-input v-model="dialogData.norms"></el-input>
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
              <el-input disabled v-model="dialogData.name"></el-input>
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
              <el-input type="textarea" v-model="dialogData.solicitAuditOpinions"></el-input>
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
import { isGood, Config, _message } from "@utils/utils.js";
import {
  getCollectData,
  delCollectData,
  auditPassOrNot,
  saveOrUpdate,
  derivedTable,
  statisticsAuditNum
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
      form: {
        // name: ""
      },
      //审核弹出框
      dialogVisible: false,
      //修改弹窗
      dialogVisible1: false,
      // 弹窗数据
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
        texture: ""
      },
      // 征集藏品id
      collectionId: "",
      // 字段
      fields: {
        img: "图片",
        name: "藏品名称",
        type: "藏品类型",
        source: "来源",
        updated: "登记时间",
        solicitAuditResults: "审核状态"
      },
      // 表格数据
      tableData: [],
      // 总数
      total: 0,
      isGood: isGood,
      page: {
        page: "1",
        size: "10",
        listSort: "created",
        isDesc: "DESC"
      },
      // 征集信息id
      id: "",
      //当前选中的id
      ids: "",
      // 审核数量
      auditNum: {
        // all:'',
        countAll: 0,
        countNo: 0,
        countWait: 0,
        countYes: 0
      },
      //懒加载表格
      loading: false
    };
  },
  mounted() {
    this.init(this.page, this.form);
  },
  methods: {
    // 封装数据请求
    init(page, search) {
      this.loading = true;
      getCollectData(page, search).then(res => {
        if (res.data.code == 0) {
          _message("success", res.data.msg);
          this.loading = false;
          this.tableData = res.data.date.content;
          this.total = res.data.date.totalElements;
          this.tableData.forEach(item => {
            if (item.solicitAuditResults == 0) {
              item.solicitAuditResults = "待审核";
            } else if (item.solicitAuditResults == 1) {
              item.solicitAuditResults = "审核通过";
            } else {
              item.solicitAuditResults = "未通过";
            }
          });
        } else {
          _message("error", res.data.msg);
        }
      });
      statisticsAuditNum().then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.auditNum = res.data.date;
        }
      });
    },
    // 搜索提交按钮
    submitData(data) {
      this.form = data;
      this.init(this.page, this.form);
    },
    // 搜索审核状态
    anditState(state) {
      console.log(state);
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
      console.log(row);
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
    del(id) {
      console.log(id);
      delCollectData(id).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          _message("success", res.data.msg);
          this.init(this.page, this.form);
        } else {
          _message("error", res.data.msg);
        }
      });
    },
    //入馆登记按钮
    enterReg() {
      this.$router.push("collectReg");
    },
    // 隐藏dialog框
    hiddenDialog(bl) {
      this.dialogVisible = bl;
    },
    //隐藏修改dialog框
    hiddenDialog1(bl) {
      this.dialogVisible1 = bl;
    },
    // 是否通过审核
    isAudit(state) {
      auditPassOrNot(this.id, state).then(res => {
        if (res.data.code == 0) {
          _message("success", res.data.msg);
          this.dialogVisible = false;
          this.init(this.page, this.form);
        } else {
          _message("error", res.data.msg);
        }
      });
    },
    //点击藏品名称
    clickObjName(row) {
      console.log(row);
      this.dialogVisible1 = true;
      // this.dialogData = row.collection;
      // this.dialogData.id = row.id;
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

      console.log(this.dialogData.type);
    },
    //点击修改
    modification() {
      saveOrUpdate(this.dialogData).then(res => {
        this.dialogVisible1 = false;
        console.log(res);
        if (res.data.code == 0) {
          _message("success", res.data.msg);
          this.init(this.page, this.form);
        } else {
          _message("error", res.data.msg);
        }
      });
    },
    // 点击取消
    cancel() {
      this.dialogVisible1 = false;
    },
    //获取一页显示多少个
    sizeChange(size) {
      this.page.size = size;
      this.init(this.page, this.form);
    },
    //获取页数
    currentChange(page) {
      this.page.page = page;
      this.init(this.page, this.form);
    },
    //下载模板
    downloadTemp() {
      location.href = Config.baseUrl + "/collection.xlsx";
    },
    //获取藏品类型的值
    objTypeData(val) {
      this.dialogData.type = val;
    },
    //获取数据ids
    selectionChange(id) {
      let ids = [];
      id.forEach(item => {
        ids.push(item.id);
      });

      this.ids = ids.join(",");
      console.log(this.ids);
    },
    //根据ids导出表格
    derivedTableByIds() {
      derivedTable(this.ids).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scope>
#collectRegContent {
  .content {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 20px;
    .btns {
      margin: 10px;
    }
    .collectTable {
      .btn {
        background: #ccc;
        color: #fff;
        border-color: #ccc;
      }
    }
  }
}
</style>