<template>
  <div id="collectRegContent" class="collectRegContent">
    <Search
    
      :anditState="auditNum"
     
      @submitData="submitData"
    ></Search>
 <!-- @anditState="anditState" -->
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
        @getlistSort="getlistSort"
        :total="total"
        :tableData="tableData"
        :fields="fields"
        class="collectTable"
        :loading="loading"
        :currentPage="page.page"
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
              :class="scope.row.solicitAuditResults != '0'?'btn':''"
              style="margin-right:10px"
              :disabled="scope.row.solicitAuditResults != '0'"
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
    <Dialog
      class="dialog"
      dialogTitle="征集信息审核"
  
      :navMenu="navMenu"
      :dialogBtns="['通 过','不通过']"
      ref="dialogForm"
      @getScrollTop="getScrollTop"
      @getActiv="getActiv"
      @dialogBtnClick="isAudit"
      v-model="dialogVisible"
    >
      <el-form
        id="dialogScroll"
        slot="dialogForm"
        size="small"
        style="height:100%"
        :model="dialogData"
        label-width="100px"
      >
        <el-collapse v-model="activNames" style="border:none">
          <el-collapse-item id="one" name="1">
            <span class="collectMsg" slot="title">基础信息</span>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="name" label="藏品名称">
                  <el-input disabled v-model="dialogData.name"></el-input>
                </el-form-item>
                <el-form-item label="藏品类型">
                  <objTypeSelect :disabled="true" v-model="dialogData.type"></objTypeSelect>
                </el-form-item>
                <el-form-item label="规格 (cm)">
                  <el-input disabled v-model="dialogData.norms"></el-input>
                </el-form-item>

                <el-form-item label="藏品报价">
                  <el-input disabled v-model="dialogData.offer"></el-input>
                </el-form-item>
                <el-form-item label="完残情况">
                  <el-select
                    disabled
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
                <el-form-item label="数量">
                  <el-input disabled v-model="dialogData.quantity"></el-input>
                </el-form-item>
              </el-col>
              <el-col style="height:306px" :span="12">
                <Images :imagesUrl="imagesUrl"></Images>
              </el-col>

              <el-col :span="12">
                <el-form-item label="上传人">
                  <el-input disabled v-model="dialogData.uploadingPeopleId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="临时编号">
                  <el-input disabled v-model="dialogData.temporaryNumbering"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="来源">
                  <el-input disabled v-model="dialogData.source"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集说明">
                  <el-input disabled type="textarea" v-model="dialogData.solicitationInstructions"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item id="tow" name="2">
            <span class="collectMsg" slot="title">征集信息</span>
            <el-row>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="false"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </Dialog>

    <!-- 修改查看窗口弹窗 -->
    <Dialog
      class="dialog"
      dialogTitle="征集信息修改"
      :visible.sync="dialogVisible1"
      :navMenu="navMenu"
      :isModification="isModification"
      :dialogBtns="['修 改','取 消']"
      ref="dialogForm"
      @getScrollTop="getScrollTop"
      @getActiv="getActiv"
      @dialogBtnClick="modification "
      v-model="dialogVisible1"
    >
      <el-form
        ref="dialogContent"
        slot="dialogForm"
        size="small"
        :model="dialogData"
        label-width="100px"
        :rules="rules"
      >
        <el-collapse v-model="activNames" style="border:none">
          <el-collapse-item id="one" name="1">
            <span class="collectMsg" slot="title">基础信息</span>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="name" label="藏品名称">
                  <el-input :disabled="dialogData.solicitAuditResults!=0" v-model="dialogData.name"></el-input>
                </el-form-item>
                <el-form-item label="藏品类型">
                  <objTypeSelect
                    :disabled="dialogData.solicitAuditResults!=0"
                    v-model="dialogData.type"
                  ></objTypeSelect>
                </el-form-item>
                <el-form-item label="规格 (cm)">
                  <el-input
                    :disabled="dialogData.solicitAuditResults!=0"
                    v-model="dialogData.norms"
                  ></el-input>
                </el-form-item>

                <el-form-item label="藏品报价">
                  <el-input
                    :disabled="dialogData.solicitAuditResults!=0"
                    v-model="dialogData.offer"
                  ></el-input>
                </el-form-item>

                <el-form-item label="完残情况">
                  <el-select
                    :disabled="dialogData.solicitAuditResults!=0"
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

                <el-form-item label="数量">
                  <el-input
                    :disabled="dialogData.solicitAuditResults!=0"
                    v-model.number="dialogData.quantity"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col style="height:306px" :span="12">
                <Images :imagesUrl="imagesUrl"></Images>
              </el-col>

              <el-col :span="12">
                <el-form-item label="上传人">
                  <el-input disabled v-model="dialogData.uploadingPeopleId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="临时编号">
                  <el-input
                    :disabled="dialogData.solicitAuditResults!=0"
                    v-model="dialogData.temporaryNumbering"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="来源">
                  <el-input
                    :disabled="dialogData.solicitAuditResults!=0"
                    v-model="dialogData.source"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集说明">
                  <el-input
                    :disabled="dialogData.solicitAuditResults!=0"
                    type="textarea"
                    v-model="dialogData.solicitationInstructions"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item id="tow" name="2">
            <span class="collectMsg" slot="title">征集信息</span>
            <!-- 征集信息 -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input
                    :disabled="dialogData.solicitAuditResults!=0"
                    type="textarea"
                    v-model="dialogData.solicitAuditOpinions"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import Search from "@components/collectReg/collectRegSearch.vue";
import Dialog from "@components/collectReg/collectRegDialog.vue";
import Table from "@components/element/elTable.vue";
import objTypeSelect from "@components/element/objTypeSelect.vue";

import Images from "@components/element/elImage.vue";
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
    objTypeSelect,
    Images
  },
  data() {
    return {
      // 是否禁用修改按钮
      isModification: false,

      navMenu: ["基础信息", "征集信息"],
      // 折叠面板默认展开
      activNames: ["1", "2"],
      //dialog当前选中导航按钮
      activ: "0",
      // dialogform表单中图片路径
      imagesUrl: "",
      form: {},
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
        quantity: "",
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
        //审核状态
        solicitAuditResults: "",
        //创建时间
        created: ""
      },
      // 征集藏品id
      collectionId: "",
      // 字段
      fields: {
        name: "藏品名称",
        type: "藏品类型",
        source: "来源",
        created: "登记时间",
        solicitAuditResults: "审核状态"
      },
      // 表格数据
      tableData: [],
      // 总数
      total: 0,
      isGood: isGood,
      page: {
        page: 1,
        size: 10,
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
        countYes: 0,
        collection: 0
      },
      //懒加载表格
      loading: false,
      //表单验证
      rules: {
        name: [{ required: true, message: "请输入藏品名称", trigger: "blur" }],
        offer: [{ required: true, message: "请输入藏品报价", trigger: "blur" }],
        quantity: [
          { required: true, message: "请输入藏品数量", trigger: "blur" },
          { type: "number", message: "数量必须为正整数", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // this.init(this.page, this.form);
    //监听滚动事件
    //  window.addEventListener('scroll', this.onScroll, false)
  },
  methods: {
    //审核按钮触发

    //表单滚动时触发
    getScrollTop(top) {
      const oneOffsetTop = document.querySelector("#one").offsetTop;
      const towOffsetTop = document.querySelector("#tow").offsetTop;

      let activ;
      if (top < towOffsetTop) {
        activ = 0;
      } else if (top >= towOffsetTop) {
        activ = 1;
      }

      this.$store.commit("setActiv", activ);

    },

    // 封装数据请求
    init(page, search) {
      this.loading = true;
      getCollectData(page, search)
        .then(res => {
          if (res.data.code == 0) {
            _message("success", res.data.msg);
            this.loading = false;
            this.tableData = res.data.dataOther.content;
            this.total = res.data.dataOther.totalElements;
            this.auditNum = res.data.date;
     
          } else {
            _message("error", res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    //排序改变时触发
    getlistSort(isDesc, listSort) {
      this.page.listSort = listSort;
      this.page.isDesc = isDesc;
      this.init(this.page, this.form);
    },
    // 搜索提交按钮
    submitData(data, state) {
      this.form = data;
      // 每次搜索都从第一页开始
      this.page.page = 1;
      if (state != 3) {
        this.$set(this.form, "solicitAuditResults", state);
      }

      this.init(this.page, this.form);
    },
  
    // 点击dialog的导航栏
    getActiv(state, vs) {
      let offsetTop = 0;

      if (state == "0") {
        offsetTop = document.getElementById("one").offsetTop;
      } else if (state == "1") {
        offsetTop = document.getElementById("tow").offsetTop;
      }
      this.$refs.dialogForm.offsetTopFn(offsetTop, vs);
    },
    // 表格审核按钮触发
    anditBtn(row) {
      this.dialogVisible = true;
      this.id = row.id;
      this.getTableData(row);
    },
    //删除列表
    del(id) {
      delCollectData(id).then(res => {
        if (res.data.code == 0) {
          _message("success", res.data.msg);
          if (this.tableData.length == 1) {
            if (this.page.page == 1) {
              this.page.page = 1;
            } else {
              this.page.page = this.page.page - 1;
            }
          }
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

    // 是否通过审核
    isAudit(index) {
      auditPassOrNot(this.id, index, this.dialogData.solicitAuditOpinions).then(
        res => {
          if (res.data.code == 0) {
            _message("success", res.data.msg);
            this.dialogVisible = false;
            this.init(this.page, this.form);
          } else {
            _message("error", res.data.msg);
          }
        }
      );
    },

    // 封装获取图片路劲以及表格信息
    getTableData(row) {
      //每次打开让折叠面板都默认展开
      this.activNames = ["1", "2"];
      let collection = row.collection;

      //保存图片路径
      if (collection.recruitImageList.length == 0) {
        this.imagesUrl = "";
      } else {
        this.imagesUrl = collection.recruitImageList[0].image.uri;
      }

      // this.dialogData.type = ""

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
        solicitAuditMan: collection.solicitAuditMan,
        solicitAuditResults: row.solicitAuditResults,
        created: collection.created
      };

      console.log(this.dialogData);
    },
    //点击藏品名称
    clickObjName(row) {
      // if (row.solicitAuditResults =="待审核") {
      //显示修改弹出框
      this.dialogVisible1 = true;

      if (row.solicitAuditResults == 0) {
        this.isModification = false;
      } else {
        this.isModification = true;
      }

      this.getTableData(row);
      // this.dialogData = row.collection;
      // this.dialogData.id = row.id;

      // }else{
      //   _message('warning',"该信息已经审核,不可修改.")
      // }
    },
    //点击修改
    modification(index) {
      if (index == 1) {
        //修改
        this.$refs.dialogContent.validate(valid => {
          if (valid) {
            saveOrUpdate(this.dialogData).then(res => {
              this.dialogVisible1 = false;
              if (res.data.code == 0) {
                _message("success", res.data.msg);
                this.init(this.page, this.form);
              } else {
                _message("error", res.data.msg);
              }
            });
          } else {
            _message("error", "请输入必填信息");
            return false;
          }
        });
      } else {
        // 取消
        this.dialogVisible1 = false;
      }
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
    //获取数据ids
    selectionChange(ids, row) {
      this.ids = ids;
    },
    //根据ids导出表格
    derivedTableByIds() {
      location.href = Config.baseUrl + "/recruit/uploadRecruit?ids=" + this.ids;
    }
  }
};
</script>

<style lang="less" scope>
#collectRegContent {
  min-width: 800px;
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

  .dialog {
  }
}
</style>