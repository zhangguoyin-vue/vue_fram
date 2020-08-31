define(["configs"], function(config) {
    'use strict';
    return {
        getRoutesByDynamics: function(router) {
            var _self = this;
            return new Promise(function(resolve, reject) {
                var tempUenuList = [];
                var tempRouterNameList = ["home-view", "view-404"];
                var tempRouterRoot = _self.getRouterInfoByRoot();
                var j = config;
                if(config.systemMenus && config.systemMenus.length > 0) {
                    _self.getHomeMenuOrRouterList(config.systemMenus, tempUenuList, tempRouterRoot.children, tempRouterNameList);
                }
                config.showMenus = tempUenuList;
                router.addRoutes(tempRouterRoot.children);
                resolve(true);
            });

        },

        //获取主功能页面路由信息
        getRouterInfoByRoot: function() {
            var tempRoot = {
                path: "/HomeView",
                name: "HomeView",
                component: window.SysApp.createVueComponent("vue!framework/home.vue"),
                meta: {
                    requireAuth: true
                },
                children: [{
                    path: "/404",
                    name: "404",
                    component: window.SysApp.createVueComponent("vue!framework/404.vue"),
                    meta: {
                        requireAuth: false
                    }
                }, {
                    path: '*', // 页面不存在的情况下会跳到404页面
                    redirect: '/404',
                    name: 'notFound',
                    hidden: true
                }]
            };
            return tempRoot;
        },

        //获取需要显示的菜单集合
        getHomeMenuOrRouterList: function(menuJson, menuList, routerList, routerNameList) {
            var self = this;
            menuJson.forEach(function(item, index) {
                //获取路由信息集合
                self.getRouterChilds(item, routerList, routerNameList);
                //获取菜单数据集合
                var tempId = 100 + index;
                var tempMenuItem = self.getHomeMenuModel(tempId, item);
                if(item.childViews && item.childViews.length > 0) {
                    self.getHomeMenuChilds(item.childViews, tempId, tempMenuItem.childViews, routerList, routerNameList);
                } else {
                    tempMenuItem.childViews = null;
                    tempMenuItem.isChildViews = false;
                }
                menuList.push(tempMenuItem);

            });
        },

        //递归调用获取子目录下的菜单
        getHomeMenuChilds: function(jsonList, currId, list, routerList, routerNameList) {
            var self = this;
            if(jsonList.length > 0) {
                jsonList.forEach(function(item, index) {
                    //获取路由信息集合
                    self.getRouterChilds(item, routerList, routerNameList);
                    //获取菜单数据集合
                    var tempId = currId * 1000 + 100 + index;
                    var tempMenuItem = self.getHomeMenuModel(tempId, item);
                    if(item.childViews && item.childViews.length > 0) {
                        self.getHomeMenuChilds(item.childViews, tempId, tempMenuItem.childViews, routerList, routerNameList);
                    } else {
                        tempMenuItem.childViews = null;
                        tempMenuItem.isChildViews = false;
                    }
                    list.push(tempMenuItem);
                });
            }
        },

        getHomeMenuModel: function(tempId, item) {
            var tempMenuItem = {
                id: tempId,
                menuNameZh: item.zhName,
                menuNameEn: item.enName,
                value: "/" + item.templateName,
                templateName: item.templateName,
                url: item.url,
                visible: item.visible,
                isActive: item.isActive,
                imgSrc: item.imgSrc,
                imgClickSrc: item.imgClickSrc,
                operationId: item.operationId,
                isChildViews: true,
                childViews: [],
            };
            return tempMenuItem;
        },

        getRouterChilds: function(item, routerList, routerNameList) {
            var self = this;
            if(item.url && item.url.length > 0) {
                var routerModel = self.getRouterInfo(item);
                var isCheckItem = routerList.find(function(routeItem) {
                    if(routeItem.path === routerModel.path) {
                        return routeItem;
                    }
                    return null;
                });
                if(!routerNameList.includes(item.templateName)) {
                    routerNameList.push(item.templateName);
                }
                if(!isCheckItem) {
                    routerList.push(routerModel);
                }
            }
        },

        //获取单个路由信息
        getRouterInfo: function(itemJson) {
            var tempUrl = "vue!" + itemJson.url;
            var tempRouter = {
                path: "/" + itemJson.templateName,
                component: window.SysApp.createVueComponent(tempUrl),
                name: itemJson.templateName,
                props: true,
                meta: {}
            };
            if(itemJson.parameters) {
                tempRouter.meta = itemJson.parameters;
            }
            tempRouter.meta.requireAuth = false;
            return tempRouter;
        },
    }

});