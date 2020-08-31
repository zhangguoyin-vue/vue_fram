define(
    [
        '../../configs/systemMenus'
    ],

    function (sysMenus) {

        "use strict";

        var testInitialize = {
            getSystemMenus: function () {
                return new Promise(function (resolve, reject) {
                    resolve(sysMenus);
                });
            },
            initialize: function () {
                return new Promise(function (resolve, reject) {
                    resolve(true);
                });
            },
        };

        return testInitialize;
    });