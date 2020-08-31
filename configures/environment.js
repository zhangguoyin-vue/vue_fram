define(
    [
        'configures/serverlocator',
    ],

    function (locators) {

        'use strict';

        Object.defineProperty(window, 'configs', {
            value: {},
            configurable: false,
            enumerable: false,
            writable: false
        });
        /* global configs */
        configs.locators = locators;

        /* 系统使用样式配置 */
        configs.theme = 'dark';
        configs.themes = [{
            themeId: "light",
            themeName: "默认"
        }, {
            themeId: "dark",
            themeName: "展示"
        }];

        /* 菜单种类配置 枚举值
         * 1 全横排,一级菜单在标题栏，二级在标题栏下方其他为下拉菜单
         * 2 一级菜单在标题栏，二级菜单为竖排
         * 3 全部竖排，标题栏无菜单
         * 4 一级菜单在标题栏，其他为下拉菜单
         * @property {number}
         */
        configs.meauType = 3;
        configs.isNewAuthentication = true; //是否使用登录能力
        configs.authNeverTimeout = false; // 页面打开时用户永远不超时退出

        configs.language = 'zh'; // zh, en
        configs.showHeader = true;
        configs.showFooter = true; //返回按钮
        configs.showUser = true;
        configs.showMenuItemsCount = 5;
        configs.showViewsCount = 5;
        configs.produceName = '内部测试项目';
        configs.produceId = 'gcss'; //项目标识，用于加载具体的项目

        configs.productInitializeModules = {
            'gcss': 'plugin/src/gcss/common/core/gcss_initialize'
        };

        configs.forbidF5 = false;    //是否禁止使用F5  true禁止使用 false可以使用
        configs.logInUrl = 'framework/login.vue';  //登录系统主页面


        return configs;
    });
