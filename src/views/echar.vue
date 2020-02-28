<template>
  <div class="echar">
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    <div id="myChart1" :style="{width: '300px', height: '300px'}"></div>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      echarData:[5, 20, 36, 10, 10, 20],
      echarData1:[
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    let _this = this
    let myChart = this.drawLine(this.echarData);
    let myChart1 = this.drawLine1(this.echarData1);

    myChart.on('click',function(params){
     console.log(myChart.setOption({}));
     _this.$set(_this.echarData,1,50)
     console.log(_this.echarData);
     _this.msg ="56565"
     _this.drawLine([50])
     _this.drawLine1([
              { value: 33225, name: "直接访问" },
              { value: 31220, name: "邮件营销" },
              { value: 6666, name: "联盟广告" },
              { value: 13225, name: "视频广告" },
              { value: 6666, name: "搜索引擎" }
            ])
     
      
    })

    myChart1.on("click",function(params){
      console.log(params);
      
    })
    // let myChart = document.getElementById("myChart");
    // let myChart1 = document.getElementById("myChart1");
    // console.log(myChart, myChart1);
    this.$echarts.connect([myChart, myChart1]);
  },
  methods: {
  
    drawLine(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["直接访问", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: data
          }
        ]
      });

      return myChart;
    },
    drawLine1(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(
        document.getElementById("myChart1"),
        true
      );
      // 绘制图表
      myChart1.setOption({
        title: {
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      return myChart1;
    }
  }
};
</script>

<style lang="less" scope>
</style>

