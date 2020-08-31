define([
    'vju',
    'vuex',
    './modules/systemChange',
    './modules/userInfoChange'
], function(Vue, Vuex, systemChange, userInfoChange) {
    'use strict';

    Vue.use(Vuex)

    var store = new Vuex.Store({
        modules: {
            systemChange: systemChange,
            userInfoChange: userInfoChange
        }
    });

    return store;
});