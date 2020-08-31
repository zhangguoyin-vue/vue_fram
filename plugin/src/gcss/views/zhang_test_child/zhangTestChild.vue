<template>
  <div>
    <div class="zhang-test-child-body">{{text}}</div>
    <div v-on:click="btnLoginClick">返回</div>
    <div style="width:400px;height:400px;position: relative;">
      <comp-echart-pie v-bind:data-source="dataSource"></comp-echart-pie>
    </div>
  </div>
</template>

<script>
define([
  "vju",
  "./commHelp",
  "json!./systemMenus.json",
  "vue!plugin/component/comp_echart/comp_echart_pie.vue",
], function (Vue, commHelp, sysConfig) {
  return Vue.component("zhang-test-child", {
    template: template,
    data: function () {
      return {
        text: "这是一个子组件" + sysConfig[0].url + commHelp.getColorByIndex(1),
        dataSource: [],
      };
    },

    //页面初始化完成后调用该方法
    mounted: function () {
      this.initUiStart();
    },

    //数据回收方法
    destroyed: function () {
      if (this.dataSource) {
        this.dataSource = [];
        this.dataSource = null;
      }
    },

    methods: {
      btnLoginClick: function () {
         this.$store.commit("userInfoChange/setIsUserLogin", false);
      },

      //初始化页面相关显示数据
      initUiStart: function () {
        let list = [
          {
            object_class: 4001,
            object_class_name: "互联网专线",
            sum: 200,
          },
          {
            object_class: 4002,
            object_class_name: "语音专线",
            sum: 200,
          },{
            object_class: 4003,
            object_class_name: "彩信专线",
            sum: 200,
          },{
            object_class: 4004,
            object_class_name: "短信专线",
            sum: 200,
          }
        ];

        this.initChartsDataSource(list);
      },
      initChartsDataSource: function (objList) {
        var self = this;
        var list = [];
        objList.forEach(function (element, index) {
          var tempColor = commHelp.getColorByIndex(index);
          list.push({
            color: tempColor,
            objectClass: element.object_class,
            name: element.object_class_name,
            value: element.sum,
            alarmSum: 10,
            alarmLevel: 5,
            alarmCellId: "0",
          });
        });
        this.dataSource = list;
      },
    },
  });
});
</script>

<style scoped>
.zhang-test-child-body {
  background: red;
}
</style>