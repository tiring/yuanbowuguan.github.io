<template>
  <div class="portal">
    <div class="portalHeader">
      <div class="myApplyForOrAudit fl">
        <div class="content">
          <div class="myApplyFor">
            <p class="myApplyForTitle">我的申请</p>
            <div class="myApplyForTable"></div>
          </div>
          <div class="myAudit">
            <p class="myAuditTitle">我的审批</p>
            <div class="myAuditTable"></div>
          </div>
        </div>
      </div>
      <div class="workPlan fl">
        <p class="workPlanTitle">工作计划 (1) <router-link to="/">更多</router-link ></p>
        <div class="workPlanContent">
          <div class="workPlanContentH clearfix">
            <p @click="setActive('0')" :class="active=='0'?'active':''">计划中</p>
            <p @click="setActive('1')" :class="active=='1'?'active':''">已完成</p>
          </div>
          <div v-show="active=='0'" class="workPlanContentN">
            <el-card shadow="hover" class="box-card">
              <el-row>
                <el-col :span="4">内容:</el-col>
                <el-col :span="20" class="text">关于第四季度按时框架开发是几个爱国卡6666阿发阿萨德阿萨德666</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">开始:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">结束:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">删除</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">完成</el-button>
                </el-col>
              </el-row>
            </el-card>
            <el-card shadow="hover" class="box-card">
              <el-row>
                <el-col :span="4">内容:</el-col>
                <el-col class="text" :span="20">关于第四季度按时框架开发是几个爱国卡两个奥利给</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">开始:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">结束:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">删除</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">完成</el-button>
                </el-col>
              </el-row>
            </el-card>
            <el-card shadow="hover" class="box-card">
              <el-row>
                <el-col :span="4">内容:</el-col>
                <el-col class="text" :span="20">关于第四季度按时框架开发是几个爱国卡两个奥利给</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">开始:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">结束:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">删除</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">完成</el-button>
                </el-col>
              </el-row>
            </el-card>
             <el-pagination style="text-align:center" layout="prev, pager, next" :total="50"></el-pagination>
              <div style="" class="btn">
          <el-button size="small" style="width:100%">添加计划</el-button>
          </div>
          </div>
          <div v-show="active=='1'" class="workPlanContentN">
            <el-card shadow="hover" class="box-card">
              <el-row>
                <el-col :span="4">内容:</el-col>
                <el-col :span="20" class="text">嘻嘻嘻嘻</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">开始:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">结束:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">删除</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">完成</el-button>
                </el-col>
              </el-row>
            </el-card>
            <el-card shadow="hover" class="box-card">
              <el-row>
                <el-col :span="4">内容:</el-col>
                <el-col class="text" :span="20">关于第四季度按时框架开发是几个爱国卡两个奥利给</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">开始:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">结束:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">删除</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">完成</el-button>
                </el-col>
              </el-row>
            </el-card>
            <el-card shadow="hover" class="box-card">
              <el-row>
                <el-col :span="4">内容:</el-col>
                <el-col class="text" :span="20">关于第四季度按时框架开发是几个爱国卡两个奥利给</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">开始:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">结束:</el-col>
                <el-col :span="20">2020-01-02</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">删除</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button style="width:90%;" size="small">完成</el-button>
                </el-col>
              </el-row>
            </el-card>
             <el-pagination style="text-align:center" layout="prev, pager, next" :total="50"></el-pagination>
              <div style="margin-top:10px" class="btn">
          <el-button size="small" style="width:100%">添加计划</el-button>
          </div>
          </div>
         
         
        </div>
      </div>
      <div class="shortcutOrInform fl">
        <div class="shortcut">
          <p class="shortcutTitle">快捷方式</p>
          <div class="shortcutContent clearfix">
            <ul>
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
           
         
             
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
              <li>
                <p>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </p>
                <span>清单管理</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="inform">
          <p class="informTitle">通知公告</p>
          <div class="informContent">
            <ul>
              <li>第四季度工作安排一负责人任命</li>
              <li>第四季度工作安排一负责人任命</li>
              <li>第四季度工作安排一负责人任命</li>
              <li>第四季度工作安排一负责人任命</li>
            </ul>
            <div style="margin-top:3px" class="btn">
              <el-button size="small" style="width:100%">我要发布</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "0"
    };
  },
  methods: {
    // 修改工作计划状态
    setActive(val) {
      this.active = val;
    }
  }
};
</script>

<style lang="less" scope>
.portalHeader {
  overflow: hidden;
  //标题通用样式
  .workPlanTitle,
  .myAuditTitle,
  .myApplyForTitle,
  .shortcutTitle,
  .informTitle {
    font-size: 14px;
    color: #666;
    padding-left: 10px;
    border-left: 5px solid #ccc;
    margin-bottom: 9px;
    margin-top: 10px;
    a{
        float: right;
        color: #666;
    }
  }
  //   容器高度
  .myApplyForOrAudit,
  .workPlan,
  .shortcutOrInform {
    height: 700px;
  }
  //   我的申请和我的审批
  .myApplyForOrAudit {
    width: 100%;
    .content {
      margin: 0 310px 0 310px;
      height: 560px;
      .myApplyForTable,
      .myAuditTable {
        border: 1px solid #ccc;
        height: 313px;
        border-radius: 5px;
      }
    }
  }
  //   工作计划样式
  .workPlan {
    width: 300px;
    margin-left: -100%;
    height: 100%;
    .workPlanContent {
      border: 1px solid #ccc;
      border-radius: 5px;
      height: 667px;
      .workPlanContentH {
        border-bottom: 1px solid #ccc;
        p {
          width: 50%;
          float: left;
          color: #000;
          text-align: center;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
        }
        .active {
          background: #e0e0e0;
          color: #fff;
        }
      }
      .workPlanContentN {
        padding: 5px 5px 0;
        font-size: 14px;
        .box-card {
          margin-bottom: 10px;
        }
        .el-row {
          margin-bottom: 10px;
          .text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .shortcutOrInform {
    width: 300px;
    margin-left: -300px;
    .shortcutContent,
    .informContent {
      border: 1px solid #ccc;
      height: 315px;
      border-radius: 5px;
    }
    .shortcutContent {
     
      padding: 10px;
    box-sizing: border-box;

    
      ul {
        li {
          .el-avatar {
            background: #b79862;
          }
          float: left;
          width: 82px;
          text-align: center;
          font-size: 14px;
          padding: 5px;
          cursor: pointer;
          color: #666;
        }
      }
    }
    .informContent {
         box-sizing: border-box;
      ul {
        padding: 10px;
        padding-top: 5px;
        li {
          position: relative;
          margin: 15px 0;
          color: #999;
          font-size: 14px;
          border-bottom: 1px solid #ccc;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-bottom: 10px;
          padding-left: 15px;
          &::after {
            content: "";
            height: 20px;
            width: 5px;
            background: #ccc;
            position: absolute;
            top: 0px;
            left: 0px;
          }
        }
      }
    }
  }
}
</style>

