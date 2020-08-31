<template>
  <div class="echart-main-div" ref="chartPie1"></div>
</template>

<script>
define(["vju", "echart"], function (Vue, Echarts) {
  return Vue.component("comp-echart-pie", {
    template: template,

    props: {
      dataSource: {
        type: Array,
        default: function () {
          return [];
        },
      },
      fontColor: {
        type: String,
        default: "#333",
      },
      //饼图内外比例
      sideSize: {
        type: Array,
        default: function () {
          return ["50%", "70%"];
        },
      },
      //标签的设置内容，样式
      label: {
        type: Object,
        default: function () {
          return {};
        },
      },
      labelFormatterFun: {
        type: Function,
        default: function (item) {
          return item.name;
        },
      },
      tipFormatterFun: {
        type: Function,
        default: function (item) {
          return item.name + ":" + item.value + "(" + item.percent + "%)";
        },
      },
      showLegend: {
        type: Boolean,
        defalut: false,
      },
      legendTextColor: {
        type: String,
        default: "#fff",
      },
    },

    data: function () {
      return {
        myChart: null,
        baseoption: null,
        legendOrient: "vertical",
        gridTop: 60,
        gridLeft: "10%",
        gridRight: 60,
        gridBottom: "10%",
        legendData: [],
      };
    },

    mounted: function () {
      var self = this;
      this.myChart = Echarts.init(this.$refs.chartPie1);
      this.initOption();
      this.drawEcharts();
    },

    //数据回收方法
    destroyed: function () {
      if (this.myChart) {
        this.myChart = null;
      }
      if (this.legendData) {
        this.legendData = [];
        this.legendData = null;
      }
      if (this.baseoption) {
        this.baseoption = null;
      }
    },

    watch: {
      //页面大小发生变化时触发该处理
      //              "$store.state.systemChange.Page_Size_Change": function(param) {
      //                  this.chartResize();
      //              },
      //系统主题样式变化时触发该处理
      //              "$store.state.systemChange.Style_Change": function(styleName) {
      //                  if(styleName === "default") {
      //                      this.axisLineColor = "#333";
      //                  } else if(styleName === "zhanshi") {
      //                      this.axisLineColor = "red";
      //                  } else {
      //                      this.axisLineColor = "#333";
      //                  }
      //                  this.initOption();
      //                  this.drawEcharts();
      //              },
      dataSource: function (val, oldVal) {
        this.drawEcharts();
      },
    },

    methods: {
      initOption: function () {
        var self = this;
        this.baseoption = {
          tooltip: {
            trigger: "item",
            formatter: self.tipFormatterFun,
            align: "left",
            position: function (p) {
              return [p[0] - 100, p[1] - 10];
            },
          },
          legend: {
            show: self.showLegend,
            orient: self.legendOrient,
            x: self.legendX,
            textStyle: {
              color: self.legendTextColor,
            },
          },
          series: [
            {
              type: "pie",
              clockWise: true,
              selectedMode: "single",
              radius: self.sideSize,
              data: [],
            },
          ],
        };
      },

      drawEcharts: function () {
        var tempXAxis = [];
        var option = this.initialOption();
        if (this.dataSource) {
          var data = this.dataSource;
          this.legendData = [];
          if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              var pie = {};
              pie.name = data[i].name;
              if (data[i].value === undefined) {
                pie.value = 0;
              } else {
                pie.value = data[i].value;
              }
              if (data[i].color) {
                pie.itemStyle = {
                  normal: {
                    color: data[i].color,
                  },
                };
              }
              if (this.label !== "") {
                option.series[0].label = this.label;
              }
              pie.userObject = data[i];
              option.series[0].data.push(pie);

              this.legendData.push(pie.name);
            }
          }
          option.legend.data = this.legendData;
        }
        this.myChart.setOption(option);
      },

      initialOption: function () {
        var option = $.extend(true, {}, this.baseoption);
        option.grid = {
          top: this.gridTop,
          left: this.gridLeft,
          right: this.gridRight,
          bottom: this.gridBottom,
          containLabel: true,
        };
        return option;
      },

      showMarkLine: function () {
        this.markLineFlag = true;
        this.drawEcharts();
      },

      hideMarkLine: function () {
        this.markLineFlag = false;
        this.drawEcharts();
      },

      chartResize: function () {
        if (this.myChart) {
          this.myChart.resize();
        }
      },
    },
  });
});
</script>

<style scoped>
.echart-main-div {
  height: 100%;
  min-height: 100px;
  min-width: 100px;
}
</style>