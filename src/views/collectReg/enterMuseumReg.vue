<template>
  <div id="enterMuseumReg" class="enterMuseumReg">
    <Search :anditState="auditNum" @submitData="submitData"></Search>
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
        class="collectTable"
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
              style="margin-right:10px"
              :class="scope.row.enterAuditResults != '0'?'btn':''"
              :disabled="scope.row.enterAuditResults != '0'"
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
      dialogTitle="入馆信息审核"
      v-model="dialogVisible"
      :dialogBtns="['通 过','不通过']"
      :navMenu="navMenu"
      
       @getScrollTop="getScrollTop"
        @getActiv="getActiv"
         @dialogBtnClick="isAudit"
    >
      <el-form
        :rules="rules"
        slot="dialogForm"
        size="small"
        :model="dialogData"
        label-width="100px"
      >
        <el-collapse style="border:none" v-model="activNames">
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
                <el-form-item prop="offer" label="藏品报价">
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
                <el-form-item prop="quantity" label="数量">
                  <el-input disabled v-model.number="dialogData.quantity"></el-input>
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
                <el-form-item disabled label="征集审核意见">
                  <el-input type="textarea" disabled v-model="dialogData.solicitAuditOpinions"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="征集审核人">
                  <el-input disabled v-model="dialogData.solicitAuditMan"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="征集审核时间">
                  <el-date-picker
                    v-model="dialogData.created"
                    style="width:100%"
                    type="date"
                    placeholder="选择日期"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="入馆审核说明">
                  <el-input type="textarea" v-model="dialogData.enterAuditOpinions"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>

     
     
    </Dialog>

    <!-- 修改弹窗 -->
    <Dialog
      class="dialog"
      dialogTitle="入馆信息修改"
      v-model="dialogVisible1"
      @getScrollTop="getScrollTop"
        @getActiv="getActiv"
      @dialogBtnClick="modification"
     
       
      ref="dialogForm"
      :isModification="isModification"
      :dialogBtns="['修 改','取 消']"
      :navMenu="navMenu"

    >
      <el-form
        :rules="rules"
        slot="dialogForm"
        size="small"
        ref="dialogContent"
        :model="dialogData"
        label-width="100px"
      >
        <el-collapse style="border:none" v-model="activNames">
          <el-collapse-item id="one" name="1">
            <span class="collectMsg" slot="title">基础信息</span>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="name" label="藏品名称">
                  <el-input  :disabled="dialogData.enterAuditResults!=0" v-model="dialogData.name"></el-input>
                </el-form-item>
                <el-form-item label="藏品类型">
                  <objTypeSelect :disabled="dialogData.enterAuditResults!=0" v-model="dialogData.type"></objTypeSelect>
                </el-form-item>
                <el-form-item label="规格 (cm)">
                  <el-input :disabled="dialogData.enterAuditResults!=0" v-model="dialogData.norms"></el-input>
                </el-form-item>
                <el-form-item prop="offer" label="藏品报价">
                  <el-input :disabled="dialogData.enterAuditResults!=0" v-model.number="dialogData.offer"></el-input>
                </el-form-item>
                <el-form-item label="完残情况">
                  <el-select
                  :disabled="dialogData.enterAuditResults!=0"
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
                <el-form-item prop="quantity" label="数量">
                  <el-input :disabled="dialogData.enterAuditResults!=0" v-model.number="dialogData.quantity"></el-input>
                </el-form-item>
              </el-col>

              <el-col style="height:306px" :span="12">
                <Images :imagesUrl="imagesUrl"></Images>
              </el-col>

              <el-col :span="12"></el-col>
              <el-col :span="12">
                <el-form-item label="上传人">
                  <el-input disabled v-model="dialogData.uploadingPeopleId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="临时编号">
                  <el-input :disabled="dialogData.enterAuditResults!=0" v-model="dialogData.temporaryNumbering"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="来源">
                  <el-input :disabled="dialogData.enterAuditResults!=0" v-model="dialogData.source"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="征集说明">
                  <el-input :disabled="dialogData.enterAuditResults!=0" type="textarea" v-model="dialogData.solicitationInstructions"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item id="tow" name="2">
            <span class="collectMsg" slot="title">征集信息</span>
            <el-row>
              <el-col :span="24">
                <el-form-item label="征集审核意见">
                  <el-input disabled type="textarea" v-model="dialogData.solicitAuditOpinions"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="征集审核人">
                  <el-input disabled v-model="dialogData.solicitAuditMan"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="征集审核时间">
                  <el-date-picker
                    v-model="dialogData.created"
                    style="width:100%"
                    type="date"
                    placeholder="选择日期"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="入馆审核说明">
                  <el-input :disabled="dialogData.enterAuditResults!=0 " type="textarea" v-model="dialogData.enterAuditOpinions"></el-input>
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
import { isGood, _message, Config } from "@utils/utils.js";
import {
  getEnterMuseumRegData,
  derivedTable,
  EnterMuseumRegAudit,
  delEnterReg,
  libraryUpdate
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
      // 是否禁用
      isModification:false,
      navMenu:["基础信息","征集信息"],
      //折叠面板默认展开
      activNames: ["1", "2"],
      activ: "0",
      form: {},
      //审核弹出框
      dialogVisible: false,
      //修改弹窗
      dialogVisible1: false,

      // 字段
      fields: {
        name: "藏品名称",
        type: "藏品类型",
        source: "来源",
        created: "登记时间",
        enterAuditResults: "审核状态"
      },
      // 表格数据
      tableData: [],
      // 总数
      total: 0,
      isGood: isGood,
      //分页信息
      page: {
        page: 1,
        size: 10,
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
        // 藏品名称,
        collectionId: "",
        //藏品名称
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
        // 征集时间
        updated: "",
        // 征集审核人
        solicitAuditMan: "",
        // 入馆审核说明
        enterAuditOpinions: "",
        //审核状态
        enterAuditResults: 0,
        // 创建时间
        created: ""
      },
      //懒加载表格
      loading: false,
      previewSrcList: [],
      baseImgUrl: Config.baseImgUrl,
      // dialogform表单中图片路径
      imagesUrl: "",
      //表单验证
      rules: {
        name: [{ required: true, message: "请输入藏品名称", trigger: "blur" }],
        offer: [{ required: true, message: "请输入藏品报价", trigger: "blur" }],
        quantity: [
          { required: true, message: "请输入藏品数量", trigger: "blur" },
          { type: "number", message: "数量必须为正整数", trigger: "blur" }
        ]
      },
      // 审核数量
      auditNum: {
        // all:'',
        countAll: 0,
        countNo: 0,
        countWait: 0,
        countYes: 0,
        collection: 0
      }
    };
  },
  mounted() {
    // this.init();
  },
  methods: {
    close() {
      this.activ = "0";
    },
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
    getActiv(state, vs) {
  

      let offsetTop = 0;

      if (state == "0") {
        offsetTop = document.getElementById("one").offsetTop;
      } else if (state == "1") {
        offsetTop = document.getElementById("tow").offsetTop;
      }

        this.$refs.dialogForm.offsetTopFn(offsetTop, vs);
    },
    // 封装数据请求
    init() {
      this.loading = true;
      getEnterMuseumRegData(this.page, this.form).then(res => {
        if (res.data.code == 0) {
          this.loading = false;
          _message("success", res.data.msg);
          this.tableData = res.data.dataOther.content;
          this.total = res.data.dataOther.totalElements;
          this.auditNum = res.data.date;

         
        } else {
          _message("error", res.data.msg);
        }
      });
    },
    // 搜索提交按钮
    submitData(data, state) {
      console.log(data);

      this.page.page = 1;
      this.form = data;

      if (state != 3) {
        this.$set(this.form, "enterAuditResults", state);
      }
      this.init();
    },

    // 审核按钮触发
    anditBtn(row) {
      this.dialogVisible = true;
      this.id = row.id;
      this.getTableData(row);
    },
    //删除列表
    del(id) {
      delEnterReg(id).then(res => {
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
      this.$router.push("enterMuseumeEntering");
    },
    //封装获取表格信息赋值
    getTableData(row) {
      //折叠面板默认展开
      this.activNames = ["1", "2"];
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
        solicitAuditMan: collection.solicitAuditMan,
        enterAuditResults: row.enterAuditResults,
        created: collection.created,
        enterAuditOpinions:collection.enterAuditOpinions
        
      };

      //保存图片路径
      if (collection.recruitImageList.length == 0) {
        this.imagesUrl = "";
        this.previewSrcList = [];
      } else {
        this.imagesUrl = collection.recruitImageList[0].image.uri;
        this.previewSrcList[0] =
          Config.baseImgUrl + collection.recruitImageList[0].image.uri;
      }
    },
    //点击藏品名称触发
    clickObjName(row) {
      this.dialogVisible1 = true;

     if (row.enterAuditResults == 0) {
        this.isModification = false;
      } else {
        this.isModification = true;
      }

      this.getTableData(row);
    },
    //点击修改
    modification(index) {
      if (index == 1) {
          this.$refs.dialogContent.validate(valid => {
        if (valid) {
          libraryUpdate(this.dialogData).then(res => {
            this.dialogVisible1 = false;
            console.log(res);
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
        this.dialogVisible1 = false
      }
    
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
    selectionChange(ids) {
      this.ids = ids;
    },
    //根据ids导出表格
    derivedTableByIds() {
      location.href = Config.baseUrl + "/recruit/uploadRecruit?ids=" + this.ids;
    },
    // 是否通过审核
    isAudit(index) {
      EnterMuseumRegAudit(this.id, index,this.dialogData.enterAuditOpinions).then(res => {
        if (res.data.code == 0) {
          _message("success", res.data.msg);
          this.dialogVisible = false;
          this.init();
        } else {
          _message("error", res.data.msg);
        }
      });
    },

  }
};
</script>

<style lang="less" scope>
#enterMuseumReg {
  min-width: 800px;
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
    .collectTable {
      .btn {
        background: #ccc;
        color: #fff;
        border-color: #ccc;
      }
    }
  }
  .dialog {
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
}
</style>