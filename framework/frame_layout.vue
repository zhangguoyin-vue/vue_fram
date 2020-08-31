<template>
    <div>
        <component v-bind:is="currentView"></component>
    </div>

</template>

<script>
    define([
        "vju",
        "vue!./home.vue",
        "configs",
        window.configs.logUrlVue
    ], function(Vue, home, config, login) {
        return Vue.component("frame-layout", {
            template: template,
            data: function() {
                return {
                    index: 0,
                    arr: ['login', 'home'],
                }
            },
            components: {
                home: home,
                login: login
            },
            created: function() {},
            beforeDestroy: function() {},

            methods: {},
            watch: {
                "$store.state.userInfoChange.isUserLogin": function(isFlag) {
                    if(isFlag === true) {
                        this.index = 1;
                    } else {
                        this.index = 0;
                    }
                },
            },
            computed: {
                currentView: function() {
                    return this.arr[this.index];
                },
            },
            mounted: function() {
                var self = this;
                window.onresize = function() {
                    var tempWidth = 0;
                    var tempHeight = 0;
                    if(document.documentElement.clientWidth) {
                        tempWidth = Number(document.documentElement.clientWidth);
                    }
                    if(document.documentElement.clientHeight) {
                        tempHeight = Number(document.documentElement.clientHeight);
                    }
                    self.$store.commit("systemChange/setPageSizeChange", {
                        width: tempWidth,
                        height: tempHeight,
                    });
                };
                self.$store.commit("systemChange/setLanguage_Change", config.language);
                if(config.isNewAuthentication == false) {
                    window.SysApp.getRoutesByDynamics(self.$router).then(function() {
                        self.$store.commit("userInfoChange/setIsUserLogin", true);
                    });
                }
            }
        });
    });
</script>

<style scoped>
    .login-view {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-view>div>div>span {
        font-weight: bold;
        font-size: 14px;
        color: #aaa;
    }

    .login-view>div>div input {
        width: 260px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 0 5px;
    }

    .login-view>div>div {
        margin: 20px;
        text-align: center;
    }

    .login-view>div {
        padding: 20px 10px 5px 10px;
        border-radius: 10px;
        border: 1px solid #ccc;
        background: rgba(40, 57, 101, .9);
    }

    #msg {
        color: #fff;
    }

    .container {
        height: 132px;
    }
</style>