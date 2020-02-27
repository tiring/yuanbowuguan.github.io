<template>
  <!-- 征集管理搜索组件 -->
  <div id="collectRegSearch" class="collectRegSearch">
    <div class="auditBtns">
      <el-form size="small" label-width="80px">
        <el-form-item label="审核状态:">
          <el-row class="anditState">
            <el-col :span="24">
              <el-button
                :class="btnState=='0'?'btns':''"
                @click="anditSubmit('0')"
                size="small"
              >待审核 ({{anditState.countWait}})</el-button>
              <el-button
                :class="btnState=='1'?'btns':''"
                @click="anditSubmit('1')"
                size="small"
              >审核通过 ({{anditState.countYes}})</el-button>
              <el-button
                :class="btnState=='2'?'btns':''"
                @click="anditSubmit('2')"
                size="small"
              >未通过 ({{anditState.countNo}})</el-button>
              <el-button
                :class="btnState=='3'?'btns':''"
                @click="anditSubmit('3')"
                size="small"
              >全部 ({{anditState.countAll}})</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="dateSearch">
      <el-form size="small" label-width="80px">
        <el-form-item label="登记时间:">
          <el-row class="regDate">
            <el-col :span="24">
              <el-button :class="dateState=='0'?'btns':'' " @click="getTodayDate" size="small">今天</el-button>
              <el-button
                :class="dateState=='1'?'btns':''  "
                @click="getYesterdayDate"
                size="small"
              >昨天</el-button>
              <el-button :class="dateState=='2'?'btns':'' " @click="getThisWeekDate" size="small">本周</el-button>
              <el-button
                :class="dateState=='3'?'btns':''  "
                @click="getLastWeekDate"
                size="small"
              >上周</el-button>
              <el-button
                :class="dateState=='4'?'btns':'' "
                @click="getThisMonthDate"
                size="small"
              >本月</el-button>
              <el-button
                :class="dateState=='5'?'btns':'' "
                @click="getLastMonthDate"
                size="small"
              >上月</el-button>
              <el-date-picker
                v-model="date"
                type="daterange"
                @change="change"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="regdatePicker"
                :editable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="margin-top：10px"
              ></el-date-picker>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="search">
      <el-form size="small" ref="form" :model="form" label-width="80px">
        <el-row class="searchRow">
          <el-col :span="24">
            <el-form-item label="藏品属性:">
              <el-row class="objAttribute">
                <el-col :span="24">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item prop="name" label="藏品名称:">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item prop="type" label="藏品类型:">
                    
                        <objTypeSelect v-model="form.type"></objTypeSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item prop="source" label-width="50px" label="来源:">
                        <el-input v-model="form.source"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col style="margin-right:30px" class="submit" :span="5">
                      <el-button @click="submit">搜索</el-button>
                       <el-button @click="empty">清空</el-button>
                    </el-col>
                    
                  </el-row>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import objTypeSelect from "@components/element/objTypeSelect.vue";
export default {
  components: {
    objTypeSelect
  },
  props: {
    anditState: {
      type: Object,
      default: function() {
        return {
          //待审核
          countWait: 0,
          //已通过
          countYes: 0,
          //未通过
          countNo: 0,
          //全部
          countAll: 0
        };
      }
    }
  },
  data() {
    return {
      form: {
        //藏品名称
        name: "",
        // 间隔时间(前)
        createdSta: "",
        //  间隔时间(后)
        createdEnd: "",
        //藏品类型
        type: "",
        //来源
        source: "",
       
      },
      defaultTime: "",
      date: [],
      // 当前点击的按钮
      btnState: "0",
      // 当前时间按钮
      dateState: "0",
    };
  },
  mounted() {
    this.$set(this.date, 0, moment().format("YYYY-MM-DD 00:00:00"));
    this.$set(this.date, 1, moment().format("YYYY-MM-DD 23:59:59"));
    this.submit();
  },
  methods: {
    // 清空
    empty(){
      this.$refs.form.resetFields()
      // console.log(this.$refs.form.resetFields);
    //  this.form.type = ""
      
    } ,
       //时间框变化时触发
    change(val) {
      console.log(val);
      
      // this.date = []
      if (val == null) {
        this.date = [];
      } else {
          // 将末尾时间处理为包含当天
          let dateArr = val
          dateArr[1] = moment(dateArr[1]).format("YYYY-MM-DD 23:59:59")
           this.date = dateArr;
      
       
      }
      this.dateState = "";
      this.submit()
    },
    //   获取今日时间
    getTodayDate() {
      this.dateState = "0";
      this.$set(this.date, 0, moment().format("YYYY-MM-DD 00:00:00"));
      this.$set(this.date, 1, moment().format("YYYY-MM-DD 23:59:59"));
      this.submit();
    },
    //获取昨日时间
    getYesterdayDate() {
      this.dateState = "1";
      this.$set(
        this.date,
        0,
        moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD 00:00:00")
      );
      this.$set(
        this.date,
        1,
        moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD 23:59:59")
      );
      this.submit();
    },
    //获取本周时间
    getThisWeekDate() {
      this.dateState = "2";
      this.$set(
        this.date,
        0,
        moment()
          .day("Monday")
          .format("YYYY-MM-DD 00:00:00")
      );
      this.$set(
        this.date,
        1,
        moment()
          .day("Monday")
          .day(+7)
          .format("YYYY-MM-DD 23:59:59")
      );
      this.submit();
    },
    //获取上周时间
    getLastWeekDate() {
      this.dateState = "3";
      this.$set(
        this.date,
        0,
        moment()
          .week(moment().week() - 1)
          .startOf("week")
          .day(+1)
          .format("YYYY-MM-DD 00:00:00")
      );
      this.$set(
        this.date,
        1,
        moment()
          .week(moment().week() - 1)
          .startOf("week")
          .day(+7)
          .format("YYYY-MM-DD 23:59:59")
      );
      this.submit();
    },
    //获取本月时间
    getThisMonthDate() {
      this.dateState = "4";
      this.$set(
        this.date,
        0,
        moment()
          .startOf("month")
          .format("YYYY-MM-DD 00:00:00")
      );
      this.$set(
        this.date,
        1,
        moment()
          .endOf("month")
          .format("YYYY-MM-DD 23:59:59")
      );
      this.submit();
    },
    //获取上月时间
    getLastMonthDate() {
      this.dateState = "5";
      this.$set(
        this.date,
        0,
        moment()
          .month(moment().month() - 1)
          .startOf("month")
          .format("YYYY-MM-DD 00:00:00")
      );
      this.$set(
        this.date,
        1,
        moment()
          .month(moment().month() - 1)
          .endOf("month")
          .format("YYYY-MM-DD 23:59:59")
      );
      this.submit();
    },
    // 搜索按钮
    submit() {
      //   console.log(this.form, this.date.length);
      let searchCondition = {};
      //清空时间时将绑定数据初始化
      if (!this.date) {
        this.date = [];
      }

      if (this.date.length != 0) {
        this.form.createdSta = this.date[0];
        this.form.createdEnd = this.date[1];
      } else {
        this.form.createdSta = "";
        this.form.createdEnd = "";
      }

      for (let key in this.form) {
        if (this.form[key] != "") {
          this.$set(searchCondition, key, this.form[key]);
        }
      }

      console.log(searchCondition);

      this.$emit("submitData", searchCondition,this.btnState);
    },
    //搜索审核条件
    anditSubmit(state) {
      // if (state == "3") {
      //   this.form.solicitAuditResults = "";
      // } else {
      //   this.form.solicitAuditResults = state;
      // }

      this.btnState = state;
     
      // this.$emit("anditState", this.form,state);
      this.submit();
    }
  }
};
</script>

<style lang="less" scope>
#collectRegSearch {
  .auditBtns {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-top: 22px;
    margin-bottom: 20px;
    .btns {
      background: #fff;
      //  border:none;
      border-color: #b79862;
      color: #b79862;
    }
  }
  .dateSearch {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-top: 22px;
    margin-bottom: 20px;
    .regDate {
     
      .btns {
        background: #fff;
        border-color: #b79862;
        color: #b79862;
      }
      .regdatePicker {
        margin-left: 20px;
      }
    }
  }
  .search {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-top: 22px;
    margin-bottom: 20px;
    .searchRow{
      height: 57px;
    }
    .objAttribute {
    }
    .submit {
      // margin: 52px auto 0px;
      text-align: center;
      button {
        // width: 80%;
        height: 32px;
        line-height: 9px;
      }
    }
  }
}
</style>