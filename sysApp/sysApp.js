define(
    [
        'configs',
        'configures/detailConfig',
        './frame_user_model',
        './com_router_load',
        './com_core_overload',
    ],

    function(configs, detailConfig, userInfo, routerLoad) {

        'use strict';

        window.SysApp = {
            userInfo: userInfo,
            utils: {
                //生成CRC32位编码
                makeCRC32: function(strOrg) {
                    var crcTable = [0x0, 0x77073096, 0xee0e612c, 0x990951ba, 0x76dc419, 0x706af48f, 0xe963a535, 0x9e6495a3, 0xedb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x9b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190, 0x1db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x6b6b51f, 0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0xf00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x86d3d2d, 0x91646c97, 0xe6635c01, 0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f, 0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x3b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x4db2615, 0x73dc1683, 0xe3630b12, 0x94643b84, 0xd6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0xa00ae27, 0x7d079eb1, 0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x26d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x5005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0xcb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0xbdbdf21, 0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9, 0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d];
                    var crc = 0xFFFFFFFF;
                    if(strOrg === null) {
                        return 0;
                    } else {
                        var strbyte = this.str2Bytes(strOrg);
                        for(var i = 0; i < strbyte.length; i++) {
                            crc = ((crc >> 8) & 0x00FFFFFF) ^ crcTable[(crc ^ strbyte[i]) & 0xFF];
                        }
                    }
                    var tmp = crc ^ 0xFFFFFFFF;
                    var rst = parseInt(tmp.toString(), 10);
                    return rst;
                },

                //字符串转字节数组
                str2Bytes: function(str) {
                    var ch,
                        st,
                        re = [];
                    for(var i = 0; i < str.length; i++) {
                        ch = str.charCodeAt(i);
                        // get char
                        st = [];
                        // set up "stack"
                        do {
                            st.push(ch & 0xFF);
                            // push byte to stack
                            ch = ch >> 8;
                            // shift value down by 1 byte
                        } while (ch); // add stack contents to result
                        // done because chars have "wrong" endianness
                        re = re.concat(st.reverse());
                    }
                    // return an array of bytes
                    return re;
                },

                //int转字节
                intToByte: function(i) {
                    var abyte0 = [];
                    abyte0[0] = (0xff & i);
                    abyte0[1] = ((0xff00 & i) >> 8);
                    abyte0[2] = ((0xff0000 & i) >> 16);
                    abyte0[3] = ((0xff000000 & i) >> 24);
                    return abyte0;
                },

                //生成Guid号
                getGuid: function() {
                    return(this._get4String() + this._get4String() + "-" + this._get4String() + "-" + this._get4String() + "-" + this._get4String() + "-" + this.get4String() + this._get4String() + this._get4String());
                },
                _get4String: function() {
                    return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                },

                // 提取拼音, 返回首字母大写形式
                getFullChars: function(str) {
                    var result = '',
                        name;
                    var reg = new RegExp('[a-zA-Z0-9\\- ]');
                    for(var i = 0, len = str.length; i < len; i++) {
                        var ch = str.substr(i, 1),
                            unicode = ch.charCodeAt(0);
                        if(unicode > 40869 || unicode < 19968) {
                            result += ch;
                        } else {
                            name = this._getFullChar(ch);
                            if(name !== false) {
                                result += name;
                            }
                        }
                    }
                    return result;
                },
                // 提取首字母，返回大写形式
                getCamelChars: function(str) {
                    if(typeof(str) !== 'string') {
                        throw new Error(-1, Ember.oloc('emberExtendHelper_hsgetFisrtxyzfclxcs!'));
                    }
                    var chars = [];
                    //保存中间结果的数组
                    for(var i = 0, len = str.length; i < len; i++) {
                        //获得unicode码
                        var ch = str.charAt(i);
                        //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理
                        chars.push(this._getChar(ch));
                    }
                    //处理arrResult,返回所有可能的拼音首字母串数组
                    return this._getResult(chars);
                },
                // 提取拼音
                _getFullChar: function(str) {
                    for(var key in this.full_dict) {
                        if(-1 !== this.full_dict[key].indexOf(str)) {
                            return this._capitalize(key);
                        }
                    }
                    return false;
                },
                // 首字母大写
                _capitalize: function(str) {
                    if(str.length > 0) {
                        var first = str.substr(0, 1).toUpperCase();
                        var spare = str.substr(1, str.length);
                        return first + spare;
                    }
                },
                _getChar: function(ch) {
                    var unicode = ch.charCodeAt(0);
                    //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
                    if(unicode > 40869 || unicode < 19968) {
                        return ch;
                    }
                    //dealWithOthers(ch);
                    //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
                    if(!this.options.checkPolyphone) {
                        return this.char_dict.charAt(unicode - 19968);
                    }
                    return this.polyphone[unicode] ? this.polyphone[unicode] : this.char_dict.charAt(unicode - 19968);
                },
                _getResult: function(chars) {
                    if(!this.options.checkPolyphone) {
                        return chars.join('');
                    }
                    var result = [''];
                    for(var i = 0, len = chars.length; i < len; i++) {
                        var str = chars[i],
                            strlen = str.length;
                        if(strlen === 1) {
                            for(var m = 0; m < result.length; m++) {
                                result[m] += str;
                            }
                        } else {
                            var swap1 = result.slice(0);
                            result = [];
                            for(var j = 0; j < strlen; j++) {
                                //复制一个相同的arrRslt
                                var swap2 = swap1.slice(0);
                                //把当前字符str[k]添加到每个元素末尾
                                for(var k = 0; k < swap2.length; k++) {
                                    swap2[k] += str.charAt(j);
                                }
                                //把复制并修改后的数组连接到arrRslt上
                                result = result.concat(swap2);
                            }
                        }
                    }
                    return result;
                },

                //根据进制转换单位，返回转换后的带单位的数值
                //@param value:要转换的值;
                //@param hex:单位转换进制,如10000或1024;
                //@param hexUnitArray:从小到大的单位数组,包含原始单位,如['次','万次', '亿次']或['KB','MB','GB','TB'] ,索引为0的是当前的初始数值的单位
                //@param isDivisionUnit:是否拆分值和单位返回 ，默认是false
                //return 如果isDivisionUnit为false 返回**万次或**GB；如果isDivisionUnit为true,返回json格式值Object{value:"203.03",unit:"MB"}
                getHexTransferValue: function(value, hex, hexUnitArray, isDivisionUnit) {
                    var hexCount = 0;
                    var orivalue = value;
                    //计算单位索引
                    while(value >= hex) {
                        value = value / hex;
                        hexCount++;
                    }
                    //如果索引大于传入的单位数组，转换失败，直接返回源数据
                    if(hexCount >= hexUnitArray.length) {
                        return orivalue;
                    }
                    var unit = hexUnitArray[hexCount];
                    //需要转换单位并且不能被整除需要保留小数，默认是两位小数
                    if(hexCount !== 0 && parseInt(value, 10) !== value) {
                        value = value.toFixed(2);
                    }
                    if(isDivisionUnit) {
                        return {
                            'value': value,
                            'unit': unit
                        };
                    } else {
                        return value + unit;
                    }
                },

                //获取各级别告警颜色
                getAlarmColor: function() {
                    return detailConfig.alarmColor;
                },

                //对以下字符进行Encode转译 （&，<，>，空格，',"）
                htmlEncodeByRegExp: function(str) {
                    var s = "";
                    if(str && str.length === 0) {
                        return "";
                    }
                    s = str.replace(/&/g, "&amp;");
                    s = s.replace(/</g, "&lt;");
                    s = s.replace(/>/g, "&gt;");
                    s = s.replace(/ /g, "&nbsp;");
                    s = s.replace(/\'/g, "&#39;");
                    s = s.replace(/\"/g, "&quot;");
                    return s;
                },

                //字符串Decode解译
                htmlDecodeByRegExp: function(str) {
                    var s = "";
                    if(str && str.length === 0) {
                        return "";
                    }
                    s = str.replace(/&amp;/g, "&");
                    s = s.replace(/&lt;/g, "<");
                    s = s.replace(/&gt;/g, ">");
                    s = s.replace(/&nbsp;/g, " ");
                    s = s.replace(/&#39;/g, "\'");
                    s = s.replace(/&quot;/g, "\"");
                    return s;
                }
            },
            logInInfo: function() {
                this._handleQueryString();
                this._setLoginVuePathName();
                var productRul = this._getInitializeModule();
                if(productRul && productRul.length > 0) {
                    require([productRul], function(initialize) {
                        initialize.getSystemMenus().then(function(menuList) {
                            configs.systemMenus = menuList;
                            initialize.initialize().then(function() {
                                require(["index"]);
                            });
                        });
                    });
                }
            },

            //创建VUE组件
            createVueComponent: function(componentName) {
                return function(resolve) {
                    require([componentName], function(obj) {
                        resolve(obj);
                    });
                };
            },

            //获取当前登录也首页
            _setLoginVuePathName: function() {
                configs.logUrlVue = "vue!framework/login.vue";
                if(configs && configs.logInUrl) {
                    configs.logUrlVue = "vue!" + configs.logInUrl;
                }
            },

            getRoutesByDynamics: function(router) {
                return routerLoad.getRoutesByDynamics(router);
            },

            //根据产品ID获取对应的菜单文件
            _getInitializeModule: function() {
                let tempFileName = "";
                if(configs && configs.productInitializeModules && configs.produceId) {
                    if(configs.productInitializeModules[configs.produceId]) {
                        tempFileName = configs.productInitializeModules[configs.produceId];
                    }
                }
                if(tempFileName && tempFileName.length <= 0) {
                    console.log("configs.productInitializeModules中没有配置产品ID为" + configs.produceId + "的初始化路径");
                }
                return tempFileName;
            },

            _handleQueryString: function() {
                var tempSearch = decodeURIComponent(window.location.search);
                var tempSearchModel = this.parseQueryString(tempSearch);
                if(tempSearchModel.hasOwnProperty("theme")) {
                    configs.theme = tempSearchModel.theme;
                    this.freshStyle(tempSearchModel.theme);
                }
                if(tempSearchModel.hasOwnProperty("hasHeader")) {
                    configs.showHeader = tempSearchModel.hasHeader;
                }
                if(tempSearchModel.hasOwnProperty("hasFooter")) {
                    configs.showFooter = tempSearchModel.hasFooter;
                }
                if(tempSearchModel.hasOwnProperty("productId")) {
                    configs.produceId = tempSearchModel.productId;
                }
            },

            parseQueryString: function(a) {
                var b, c = {};
                a = a.split("#")[0],
                    b = a.split("?"),
                    b.shift();
                var d = b.join("?");
                if(0 === d.trim().length)
                    return c;
                b = d.split("&");
                for(var e = 0; e < b.length; e++) {
                    var f = b[e].split("="),
                        g = f.shift(),
                        h = f.join("=");
                    c[g] = h
                }
                return c
            },

            //刷新页面样式，用于换肤处理
            freshStyle: function(themeName) {
                let self = this;
                let tempRegExp = new RegExp(/(theme_=?)(\S*)(?=.css)/);
                let styleList = [];
                $("link").each(function(index, linkItem) {
                    if(
                        linkItem.href.indexOf("lib") < 0 &&
                        linkItem.href.indexOf("theme_") >= 0
                    ) {
                        $(linkItem).attr("disabled", true);
                        var tempRegExpList = tempRegExp.exec(linkItem.href);
                        var tempCssName = linkItem.href.replace(
                            tempRegExpList[0],
                            "theme_" + themeName
                        );
                        if(self._checkNotExist(tempCssName) === true) {
                            styleList.push(tempCssName);
                        } else {
                            var tempCssLink = self._getExitsLink(tempCssName);
                            $(tempCssLink).attr("disabled", false);
                        }
                    }
                });
                styleList.forEach(function(cssName) {
                    window.require(["css!" + cssName]);
                });
            },

            _checkNotExist: function(cssName) {
                var isCheck = true;
                $("link").each(function(index, linkItem) {
                    if(linkItem.href === cssName && isCheck === true) {
                        isCheck = false;
                    }
                });
                return isCheck;
            },

            _getExitsLink: function(cssName) {
                var tempLink = null;
                $("link").each(function(index, linkItem) {
                    if(linkItem.href == cssName && !tempLink) {
                        tempLink = linkItem;
                    }
                });
                return tempLink;
            },
        };

        if(configs.forbidF5) {
            document.onkeydown = function(e) {
                var ev = window.event || e;
                var code = ev.keyCode || ev.which;
                if(code === 116) {
                    if(ev.preventDefault) {
                        ev.preventDefault();
                    } else {
                        ev.keyCode = 0;
                        ev.returnValue = false;
                    }
                }
            };
        }

        return window.SysApp;
    });