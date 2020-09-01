<template id='abcd'>
  <div>
    <div>
      <h3>国际化翻译</h3>
    </div>
    <div>
      <p>
        <el-button @click.native="changeType('zh')">切换中文</el-button>
        <el-button @click.native="changeType('en')">切换英文</el-button>
      </p>
      <p>{{$t("zhangTesti18n.name")}}</p>
      <p>{{$t("zhangTesti18n.info.age", {'0': '20'})}}</p>
    </div>
    <div class="elementUiTest-body">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          :prop="tableCol.prop"
          sortable="custom"
          :label="$t(tableCol.label)"
          :width="tableCol.width"
        ></el-table-column>
        <el-table-column label="本地">
          <template v-for="(item, i) in tableCol.bdChilds">
            <el-table-column
              :key="i"
              :prop="item.prop"
              sortable="custom"
              :label="item.label"
              :width="item.width"
            ></el-table-column>
          </template>
        </el-table-column>
        <el-table-column label="双跨">
          <template v-for="(item, i) in tableCol.skChilds">
            <el-table-column
              :key="i"
              :prop="item.prop"
              sortable="custom"
              :label="item.label"
              :width="item.width"
            ></el-table-column>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
define(["vju", "json!plugin/src/gcss/configs/zhang_test_i18n_config/zhangTesti18nDic.json"], function (Vue, i18nDic) {
  return Vue.component("zhang-test-i18n", {
    template: template,
    i18n: {
      messages: {
        en: { zhangTesti18n: i18nDic.en },
        zh: { zhangTesti18n: i18nDic.zh },
      },
      silentFallbackWarn: true
    },
    data: function () {
      return {
        tableCol: {
          prop: "date",
          label: "zhangTesti18n.name",
          width: "120",
          bdChilds: [
            { prop: "province", label: "省份", width: "100" },
            { prop: "city", label: "市区", width: "" },
          ],
          skChilds: [
            { prop: "address", label: "地址", width: "80" },
            { prop: "zip", label: "邮编", width: "80" },
          ],
        },
        tableData: [
          {
            date: "2016-05-03",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-02",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-08",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-06",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-07",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
        ],
      };
    },
    //页面初始化完成后调用该方法
    mounted: function () {},
    methods: {
      changeType(type) {
        localStorage.setItem("locale", type);
        this.$i18n.locale = type;
        this.$store.commit("systemChange/setLanguage_Change", type);
      },
      btnDataChange: function (event) {
        this.msg = "系统测试，问题解决了！";
      },

      tableRowClassNameFunc: function ({ row, rowIndex }) {
        return "ui-text-table-row";
      },

      headerRowClassNameFunc: function ({ row, rowIndex }) {
        return "ui-text-table-col";
      },

      headerCellClassNameFunc: function ({
        row,
        column,
        rowIndex,
        columnIndex,
      }) {
        return "ui-text-table-cell";
      },

      tableSortFunc: function ({ column, prop, order }) {
        var j = 0;
      },

      tableCellClick: function (row, column, cell, event) {
        var j = row[column.property];
      },

      tableCellJoinClick: function (row, column, event, type) {
        var j = 0;
      },
    },
  });
});
</script>

<style  scoped>
.elementUiTest-body {
  width: 100%;
  height: 100%;
}
.elementUiTest-body .el-table .ui-text-table-row {
  font-size: 12px;
  height: 35px;
  line-height: 35px;
  padding: 0px;
}

.elementUiTest-body .el-table .ui-text-table-col {
  font-size: 12px;
  height: 35px;
  line-height: 35px;
  padding: 0px;
}
</style>

<style scoped>
.layout-grid-content {
  border-radius: 10px;
  min-height: 36px;
}

.layout-bg-purple-light {
  background: #e5e9f2;
}
</style>