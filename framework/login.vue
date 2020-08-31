<template>
    <div class="login-view">
        <div>
            <div>
                <span>用户名称：</span>
                <input type="text" v-model="userName" placeholder="输入用户名称">
            </div>
            <div>
                <span>用户密码：</span>
                <input type="text" v-model="userPassWord" placeholder="输入用户密码">
            </div>
            <div class="container">
                <div id="captcha" style="position: relative" data-type="password"></div>
                <div id="msg"></div>
            </div>
            <div>
                <el-button type="primary" v-on:click="btnLoginClick">登录</el-button>
                <el-button type="success" v-on:click="btnCancelClick">取消</el-button>
            </div>
        </div>

    </div>

</template>

<script>
    define([
        "vju",
        "vue-router",
        "../common/jigsaw",
        "css!../themes/jigsaw.css",
    ], function(Vue, VueRouter) {
        return Vue.component("login-view", {
            template: template,
            data: function() {
                return {
                    userName: "zhangguoyin",
                    userPassWord: "111111",
                    flag: false
                };
            },
            components: {},
            created: function() {
                localStorage.setItem("currUserName", "");
                localStorage.setItem("currUserTokenKey", "");
            },
            beforeDestroy: function() {},

            methods: {
                //登录按钮处理逻辑
                btnLoginClick: function() {
                    var self = this;
                    var strErr = this.isCheckInput();
                    if(strErr) {
                        var tempUserName = this.passWordEncryption(this.userName);
                        var tempPassWord = this.passWordEncryption(this.userPassWord);
                        var params = {
                            username: tempUserName,
                            password: tempPassWord
                        };
                        window.SysApp.getRoutesByDynamics(self.$router).then(function() {
                            self.$store.commit("userInfoChange/setIsUserLogin", true);
                        });
                        //                      this.$store.dispatch("userInfo/login", params).then(res => {
                        //                          localStorage.setItem("currUserName", res.userName);
                        //                          localStorage.setItem("currUserTokenKey", res.tokenKey);
                        //                          var params = {
                        //                              tokenKey: res.tokenKey
                        //                          };
                        //                          self.$router.options.getRoutesByDynamics(self, params, function() {
                        //                              self.$router.replace({
                        //                                  path: "home-view"
                        //                              });
                        //                          });
                        //                      });
                    }
                },

                //取消按钮处理逻辑
                btnCancelClick: function() {
                    localStorage.setItem("currUserName", "");
                    localStorage.setItem("currUserTokenKey", "");
                    this.userName = "";
                    this.userPassWord = "";
                },

                isCheckInput: function() {
                    if(this.flag == true) {
                        return true;
                    } else {
                        alert("验证失败!")
                        return false;
                    }
                },

                //密码加密处理，返回密文
                passWordEncryption: function(pasWord) {
                    return pasWord;
                }
            },
            watch: {},
            computed: {},
            mounted() {
                let self = this;
                window.jigsaw.init(document.getElementById('captcha'), function() {
                    self.flag = true;
                    document.getElementById('msg').innerHTML = '登录成功！'
                })
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