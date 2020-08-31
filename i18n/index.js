define([
    'vju',
    'vueI18n',
    './config/en.js',
    './config/zh.js',
], function (Vue, vueI18n, en, zh) {
    'use strict';
    if (!window.Vue) {
        window.Vue = Vue;
    }

    var i18n = new vueI18n({
        locale: localStorage.getItem("locale") || "zh",
        messages: {
            zh,  //中文
            en   //英文
        },
        silentFallbackWarn: true
    });

    return i18n;
});