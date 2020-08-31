<template id='abcd'>
  <div class="gcss-middle-svg-content" id="mappath"></div>
</template>

<script>
define(["vju"], function (Vue) {
  return Vue.component("zhang-test-svg", {
    template: template,
    data: function () {
      return {
        svgUrl: "plugin/src/gcss/configs/svgMap/jss-svg.svg",
      };
    },
    //页面初始化完成后调用该方法
    mounted: function () {
      this.initSVGView();
    },
    methods: {
      initSVGView: function (regionId, regionName, flag) {
        var self = this;
        var fileUrl = "plugin/src/gcss/configs/svgMap/jss-svg.svg";
        $("#mappath").load(fileUrl, function () {
          $("#mappath").ready(function () {
            self.ab();
          });
          $("path").dblclick(function (event) {
            event.stopPropagation(); //阻止事件冒泡
          });
          $("text").dblclick(function (event) {
            event.stopPropagation(); //阻止事件冒泡
          });
        });
      },

      ab:function(){
        var j=0;
      }
    },
  });
});
</script>

<style  scoped>
.gcss-middle-svg-content {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>