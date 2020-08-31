<template id='abcd'>
  <div>
    <div>
      <p>
        <el-button @click.native="changeStyle('dark')">dark</el-button>
        <el-button @click.native="changeStyle('light')">light</el-button>
      </p>
    </div>

    <div class="zhang-test-style-body">{{text}}</div>
  </div>
</template>

<script>
define([
  "vju",
  "css!./zhangTestStyle.css",
  "css!./zhangTestStyle_theme_dark.css",
  "css!./zhangTestStyle_theme_light.css",
], function (Vue) {
  return Vue.component("zhang-test-style", {
    template: template,
    data: function () {
      return {
        text: "换肤页面",
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
    methods: {
      changeStyle(type) {
        if (window.configs) {
          window.configs.theme = type;
        }
        window.SysApp.freshStyle(type);
      },
    },
    //页面初始化完成后调用该方法
    mounted: function () {  },
  });
});
</script>
