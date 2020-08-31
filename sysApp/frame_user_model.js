define([],
    function () {
        "use strict";

        var frameUserModel = {
            userId: -1,
            loginId: "",
            userName: "",
            userStatus: -1,
            createTime: null,
            modifiedTime: null,
            validStartTime: null,
            validEndTime: null,
            pwdExpireDate: "",
            userEmail: "",
            userMobile: "",
            userPhone: "",
            memo: "",
            extraFields: {},
            deptId: "",
            titleId: "",
            pwdMustChange: false,
            loginTime: 0,
            roles: [],
            dataRoles: [],
            zones: [],
            mgmtZones: [],
            userLevel: -1,
            _allZonesList: [],
            _operationList: [],
            _dataOperationList: [],
            _dataOperationTranslationList: [],

            setUserInfo: function (userInfo) {
                this.userId = userInfo.userId;
                this.loginId = userInfo.loginId;
                this.userName = userInfo.userName;
                this.userStatus = userInfo.userStatus;
                this.createTime = userInfo.createTime ? new Date(userInfo.createTime) : null;
                this.modifiedTime = userInfo.modifiedTime ? new Date(userInfo.modifiedTime) : null;
                this.validStartTime = userInfo.validStartTime ? new Date(userInfo.validStartTime) : null;
                this.validEndTime = userInfo.validEndTime ? new Date(userInfo.validEndTime) : null;
                this.pwdExpireDate = userInfo.pwdExpireDate;
                this.userEmail = userInfo.userEmail;
                this.userMobile = userInfo.userMobile;
                this.userPhone = userInfo.userPhone;
                this.memo = userInfo.memo;
                this.pwdMustChange = userInfo.pwdMustChange;
                this.extraFields = userInfo.extraFields || {};
                this.isSupperAdmin = false;
                this.loginTime = userInfo.loginTime ? new Date(userInfo.loginTime).getTime() : Date.now();
                this.userLevel = userInfo.userLevel;
                this.setUserZones(userInfo.zones || []);
            },

            setOperationsUniform: function (list) {
                this._operationList = list || [];
            },
            setDataOperationsUniform: function (list) {
                this._dataOperationList = list;
            },
            setDataOperationsUniformTranslation: function (list) {
                this._dataOperationTranslationList = list;
            },
            setUserRole: function (list) {
                this.roles = list;
            },
            setUserDataRole: function (list) {
                this.dataRoles = list;
            },
            setUserZones: function (list) {
                this.zones = list;
            },
            setUserMgmtZones: function (list) {
                this.mgmtZones = list;
            },
            setAllZones: function (list) {
                this._allZonesList = list || [];
            }
        };
        return frameUserModel;
    })