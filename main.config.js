/*
 * 包含所有移动端网页所有自定义配置，requirejs 相关配置。
 */
require.config({
    baseUrl: './',
    paths: {
        'configs': 'configures/environment',
        "vju": "lib/vue/dist/vue",
        "vue": "lib/require-vuejs/dist/require-vuejs",
        "vue-router": "lib/vue-router/dist/vue-router",
        'jquery': 'lib/jquery/dist/jquery',
        'axios': 'lib/axios/dist/axios',
        'echart': 'lib/echarts/dist/echarts-all.min',
        "ELEMENT": "lib/element-ui/lib/index",
        'elementUicss': 'lib/element-ui/lib/theme-chalk/index',
        "d3": "lib/d3/dist/d3",
        'vuex': "lib/vuex/dist/vuex",
        'vueI18n': "lib/vue-i18n/dist/vue-i18n",
    },
    map: {
        '*': {
            'json': 'lib/require-json/require-json',
            'css': 'lib/require-css/css'
        }
    },
    shim: {
        "vju": {
            "exports": "vju"
        },
        'ELEMENT': {
            deps: ['css!elementUicss'] //iview.css必须在iview/dist/styles/的文件夹下面，不然对应字体文件路径不匹配
        },
        "d3": {
            "exports": 'd3'
        }
    },
    waitSeconds: 0  //超时时间 0为最大超时时间
});

require(["sysApp/sysApp", "jquery"], function (sysApp) {
    sysApp.logInInfo();
});