<template id='abcd'>
  <div>
    <div class="zhangTest-div">{{text}}</div>
    <div>
      <el-radio v-model="radio" label="1">备选项</el-radio>
      <el-radio v-model="radio" label="2">备选项</el-radio>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
define(["vju"], function (Vue) {
  return Vue.component("zhang-test", {
    template: template,
    data: function () {
      return {
        text: "张测试文件",
        radio: "1",
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
    watch: {
      //页面大小发生变化时触发该处理
      "$store.state.systemChange.Page_Size_Change": function (param) {
        this.pageWidth = param.width;
        this.pageHeight = param.height;
      },
      //系统主题样式变化时触发该处理
      "$store.state.systemChange.Style_Change": function (styleName) {},
    },
  });
});
</script>

<style lang="less" scoped>
@color: red;
.zhangTest-div {
  background: @color;
}
</style>