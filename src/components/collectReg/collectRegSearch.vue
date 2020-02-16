<template>
  <!-- 征集管理搜索组件 -->
  <div class="collectRegSearch">
    <el-form size="small" ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="20">
          <el-form-item label="审核状态:">
            <el-row class="anditState">
              <el-col :span="24">
                <el-button
                  class="btns"
                  @click="anditSubmit('0')"
                  size="small"
                >待审核 ({{anditState.countWait}})</el-button>
                <el-button
                  class="btns"
                  @click="anditSubmit('1')"
                  size="small"
                >已通过 ({{anditState.countYes}})</el-button>
                <el-button
                  class="btns"
                  @click="anditSubmit('2')"
                  size="small"
                >未通过 ({{anditState.countNo}})</el-button>
                <el-button
                  class="btns"
                  @click="anditSubmit('3')"
                  size="small"
                >全部 ({{anditState.countAll}})</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="登记时间:">
            <el-row class="regdate">
              <el-col :span="24">
                <el-button class="btns" @click="getTodayDate" size="small">今天</el-button>
                <el-button class="btns" @click="getYesterdayDate" size="small">昨天</el-button>
                <el-button class="btns" @click="getThisWeekDate" size="small">本周</el-button>
                <el-button class="btns" @click="getLastWeekDate" size="small">上周</el-button>
                <el-button class="btns" @click="getThisMonthDate" size="small">本月</el-button>
                <el-button class="btns" @click="getLastMonthDate" size="small">上月</el-button>
                <el-date-picker
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="regdatePicker"
                  :editable="false"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="藏品属性:">
            <el-row class="objAttribute">
              <el-col :span="24">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="藏品名称:">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="藏品类型:">
                      <!-- <el-input v-model="form.objtype"></el-input> -->
                      <objTypeSelect @objTypeData="objTypeData"></objTypeSelect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label-width="50px" label="来源:">
                      <el-input v-model="form.source"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col class="submit" :span="4">
          <el-button @click="submit">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
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
        source: ""
      },
      defaultTime: "",
      date: []
    };
  },
  mounted() {
    console.log(this.anditState);
  },
  methods: {
    //   获取今日时间
    getTodayDate() {
      this.$set(this.date, 0, moment().format("YYYY-MM-DD 00:00:00"));
      this.$set(this.date, 1, moment().format("YYYY-MM-DD 23:59:59"));
    },
    //获取昨日时间
    getYesterdayDate() {
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
    },
    //获取本周时间
    getThisWeekDate() {
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
    },
    //获取上周时间
    getLastWeekDate() {
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
    },
    //获取本月时间
    getThisMonthDate() {
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
    },
    //获取上月时间
    getLastMonthDate() {
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
    },
    //接收藏品类型值
    objTypeData(data) {
      this.form.type = data;
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
      }

      for (let key in this.form) {
        if (this.form[key] != "") {
          this.$set(searchCondition, key, this.form[key]);
        }
      }

      console.log(searchCondition);

      this.$emit("submitData", searchCondition);
    },
    //搜索审核条件
    anditSubmit(state) {
      this.$emit("anditState", state);
    }
  }
};
</script>

<style lang="less" scope>
.collectRegSearch {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  .anditState {
    .btns {
      //   width: 100px;
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .regdate {
    .btns {
    }
    .regdatePicker {
      margin-left: 20px;
      //   margin-top: 10px;
    }
  }
  .objAttribute {
  }
  .submit {
    margin: 50px auto;
    text-align: center;
    button {
      width: 100px;
    }
  }
}
</style>