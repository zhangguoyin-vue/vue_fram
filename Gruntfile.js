var splitLogPath = "dist/vueSplitLog.json";
module.exports = function (grunt) {
    var product = grunt.option('product');
    if (product === '' || product === undefined) {
        grunt.log.writeln('错误：');
        grunt.log.writeln('    parameter of current product can\'t be null!');
        grunt.log.writeln('正确示例：');
        grunt.log.writeln('    框架调用：  grunt frame --product=frame');
        grunt.log.writeln('    产品调用：  grunt release --product=bhz');
        return;
    } else {
        grunt.log.writeln('parameter of current product is ' + product + '.');
    }

    function execGruntTaskFrame(done, jsonPath) {
        var isFeleCheck = getIsFileExists(jsonPath);
        if (isFeleCheck) {
            grunt.config.data.clean.clena_last = getDeleteFlieByJson(jsonPath);
            grunt.config.data.concat.basic_and_extras.files = getJsJsonListToObject(jsonPath);

            grunt.task.run(['babel:babelFrame', "cssmin:cssminFrame", "htmlmin:htmlminFrame", "uglify:uglifyFrame", "concat", 'clean:clena_last', "copy:copyFrame", "clean:clean_grunt"]);

            done(true)   //给回调函数传入false实参
        } else {
            setTimeout(() => {
                execGruntTaskFrame(done, jsonPath);
            }, 1000)
        }
    };

    function asyncTaskSrc(done, jsonPath) {
        var isFeleCheck = getIsFileExists(jsonPath);
        if (isFeleCheck) {
            grunt.config.data.clean.clena_last = getDeleteFlieByJson(jsonPath);
            grunt.config.data.concat.basic_and_extras.files = getJsJsonListToObject(jsonPath);

            grunt.task.run(['babel:babelSrc', "cssmin:cssminSrc", "htmlmin:htmlminSrc", "uglify:uglifySrc", "concat", 'clean:clena_last', "copy:copySrc", "clean:clean_grunt"])

            done(true)   //给回调函数传入false实参
        } else {
            setTimeout(() => {
                asyncTaskSrc(done, jsonPath);
            }, 1000)
        }
    }

    function getIsFileExists(filepath) {
        if (!grunt.file.exists(filepath)) {
            return false;
        } else {
            return true;
        }
    };

    function getDeleteFlieByJson(filepath) {
        var jsJsonFlieList = grunt.file.readJSON(filepath);
        var tempObjects = [filepath];
        jsJsonFlieList.forEach(function (itemJson) {
            itemJson.fileNameList.forEach(function (itemFile) {
                tempObjects.push(itemFile);
            });
        });
        return tempObjects;
    };

    function getJsJsonListToObject(filepath) {
        var jsJsonFlieList = grunt.file.readJSON(filepath);
        var tempObject = {};
        jsJsonFlieList.forEach(function (itemJson) {
            let destFileName = itemJson.jsFlieName;
            let excEnd = itemJson.jsFlieName.lastIndexOf(".");
            if (excEnd != -1) {
                destFileName = itemJson.jsFlieName.substring(0, excEnd);
            }
            tempObject[destFileName + ".vue"] = itemJson.fileNameList
        });
        return tempObject;
    };


    // Project configuration.
    grunt.initConfig({
        //删除目录
        clean: {
            dist: ["dist"],
            src: ["dist/plugin/src/" + product],
            clena_last: [],
            clean_grunt: ["dist/node_modules"]
        },
        //拆分VUE文件为 HTML JS CSS
        vue_split_file: {
            options: {
                excepts: []
            },
            vueSplitFrame: {
                files: [
                    {
                        expand: true,//表示使用相对路径
                        cwd: "framework/",//相对路径的根目录
                        src: "**/*.vue",//相对路径下需要压缩的文件，*表示所有该后缀类型的文件，写具体的就是某个具体的文件将会被压缩
                        dest: "dist/framework"//压缩后的文件需要放置的目录，如果不存在的话，会自动创建
                    }, {
                        expand: true,//表示使用相对路径
                        cwd: "plugin/component",//相对路径的根目录
                        src: "**/*.vue",//相对路径下需要压缩的文件，*表示所有该后缀类型的文件，写具体的就是某个具体的文件将会被压缩
                        dest: "dist/plugin/component"//压缩后的文件需要放置的目录，如果不存在的话，会自动创建
                    }
                ]
            },
            vueSplitSrc: {
                files: [{
                    expand: true,//表示使用相对路径
                    cwd: "plugin/src/" + product,//相对路径的根目录
                    src: "**/*.vue",//相对路径下需要压缩的文件，*表示所有该后缀类型的文件，写具体的就是某个具体的文件将会被压缩
                    dest: "dist/plugin/src/" + product //压缩后的文件需要放置的目录，如果不存在的话，会自动创建
                }
                ]
            }
        },
        //es6转换为es5
        babel: {
            options: {
                sourceMap: false,
                presets: ['babel-preset-es2015']
            },
            babelFrame: {
                files: [{
                    expand: true,
                    cwd: "dist/framework/",
                    src: "**/*.js",
                    dest: "dist/framework"
                }, {
                    expand: true,
                    cwd: "dist/plugin/component",
                    src: "**/*.js",
                    dest: "dist/plugin/component"
                }, {
                    expand: true,
                    cwd: "common",
                    src: "**/*.js",
                    dest: "dist/common"
                }, {
                    expand: true,
                    cwd: "configures",
                    src: "**/*.js",
                    dest: "dist/configures"
                }, {
                    expand: true,
                    cwd: "framework",
                    src: "**/*.js",
                    dest: "dist/framework"
                }, {
                    expand: true,
                    cwd: "i18n",
                    src: "**/*.js",
                    dest: "dist/i18n"
                }, {
                    expand: true,
                    cwd: "sysApp",
                    src: "**/*.js",
                    dest: "dist/sysApp"
                }, {
                    expand: true,
                    cwd: "",
                    src: "index.js",
                    dest: "dist/"
                }, {
                    expand: true,
                    cwd: "",
                    src: "main.config.js",
                    dest: "dist/"
                }]
            },
            babelSrc: {
                files: [{
                    expand: true,
                    cwd: "dist/plugin/src/" + product,
                    src: "**/*.js",
                    dest: "dist/plugin/src/" + product
                },
                {
                    expand: true,
                    cwd: "plugin/src/" + product,
                    src: "**/*.js",
                    dest: "dist/plugin/src/" + product
                }
                ]
            }
        },
        //压缩CSS
        cssmin: {
            options: {
                mangle: false
            },
            cssminFrame: {
                files: [{
                    expand: true,
                    cwd: "dist/framework/",
                    src: '**/*.css',
                    dest: "dist/framework",
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: "dist/plugin/component",
                    src: '**/*.css',
                    dest: "dist/plugin/component",
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: "common",
                    src: "**/*.css",
                    dest: "dist/common",
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: "configures",
                    src: "**/*.css",
                    dest: "dist/configures",
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: "framework",
                    src: "**/*.css",
                    dest: "dist/framework",
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: "i18n",
                    src: "**/*.css",
                    dest: "dist/i18n",
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: "sysApp",
                    src: "**/*.css",
                    dest: "dist/sysApp",
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: "themes",
                    src: "**/*.css",
                    dest: "dist/themes",
                    ext: '.css'
                }]
            },
            cssminSrc: {
                files: [
                    {
                        expand: true,
                        cwd: "dist/plugin/src/" + product,
                        src: "**/*.css",
                        dest: "dist/plugin/src/" + product,
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: "plugin/src/" + product,
                        src: "**/*.css",
                        dest: "dist/plugin/src/" + product,
                        ext: '.css'
                    }
                ]
            },
        },
        //压缩HTML
        htmlmin: {
            options: {
                removeComments: true, //移除注释
                removeCommentsFromCDATA: true,//移除来自字符数据的注释
                collapseWhitespace: true,//无用空格
                collapseBooleanAttributes: true,//失败的布尔属性
                removeAttributeQuotes: true,//移除属性引号      有些属性不可移走引号
                removeRedundantAttributes: true,//移除多余的属性
                useShortDoctype: true,//使用短的跟元素
                removeEmptyAttributes: true,//移除空的属性
                removeOptionalTags: true//移除可选附加标签
            },
            htmlminFrame: {
                files: [{
                    expand: true,
                    cwd: "dist/framework/",
                    src: '**/*.html',
                    dest: "dist/framework",
                }, {
                    expand: true,
                    cwd: "dist/plugin/component",
                    src: '**/*.html',
                    dest: "dist/plugin/component",
                }, {
                    expand: true,
                    cwd: "common",
                    src: "**/*.html",
                    dest: "dist/common",
                }, {
                    expand: true,
                    cwd: "configures",
                    src: "**/*.html",
                    dest: "dist/configures",
                }, {
                    expand: true,
                    cwd: "framework",
                    src: "**/*.html",
                    dest: "dist/framework",
                }, {
                    expand: true,
                    cwd: "i18n",
                    src: "**/*.html",
                    dest: "dist/i18n",
                }, {
                    expand: true,
                    cwd: "sysApp",
                    src: "**/*.html",
                    dest: "dist/sysApp",
                }, {
                    expand: true,
                    cwd: "themes",
                    src: "**/*.html",
                    dest: "dist/themes",
                }, {
                    expand: true,
                    cwd: "",
                    src: "index.html",
                    dest: "dist",
                }]
            },
            htmlminSrc: {
                files: [{
                    expand: true,
                    cwd: "dist/plugin/src/" + product,
                    src: "**/*.html",
                    dest: "dist/plugin/src/" + product,
                }, {
                    expand: true,
                    cwd: "plugin/src/" + product,
                    src: "**/*.html",
                    dest: "dist/plugin/src/" + product
                }
                ]
            }
        },
        //压缩js
        uglify: {
            options: {
                mangle: true, //不混淆变量名
                preserveComments: 'false', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                footer: '' //添加footer
            },
            uglifyFrame: {
                expand: true,
                cwd: "./dist",
                src: ['**/*.js'],
                dest: "dist"
            },
            uglifySrc: {
                expand: true,
                cwd: "dist/plugin/src/" + product,
                src: ['**/*.js'],
                dest: "dist/plugin/src/" + product,
            }
        },
        //合并文件
        concat: {
            options: {
                separator: "",
                process: function (src, filepath) {
                    if (filepath.lastIndexOf('.js') == (filepath.length - 3)) {
                        return "<script lang='es6'>" + src + "</script>";
                    } else if (filepath.lastIndexOf('.css') == (filepath.length - 4)) {
                        return "<style scoped>" + src + "</style>";
                    } else {
                        return src;
                    }
                },
            },
            basic_and_extras: {
                files: {},
            },
        },

        //赋值配置文件到对应的目录
        copy: {
            copyFrame: {
                files: [
                    { expand: true, src: ['imgs/**'], dest: 'dist/' },
                    { expand: true, src: ['lib/element-ui/lib/**'], dest: 'dist' },
                    { expand: true, src: ['lib/de-indent/**'], dest: 'dist' },
                    { expand: true, src: ['lib/he/**'], dest: 'dist' },
                    { expand: true, src: ['lib/require-css/**'], dest: 'dist' },
                    { expand: true, src: ['lib/require-json/**'], dest: 'dist' },
                    { expand: true, src: ['lib/require-text/**'], dest: 'dist' },
                    { expand: true, src: ['lib/requirejs/**'], dest: 'dist' },
                    { expand: true, src: ['lib/vue-template-compiler/**'], dest: 'dist' },
                    { expand: true, src: ['lib/vue/dist/vue.js'], dest: 'dist', filter: 'isFile' },
                    { expand: true, src: ['lib/require-vuejs/dist/require-vuejs.js'], dest: 'dist', filter: 'isFile' },
                    { expand: true, src: ['lib/vue-router/dist/vue-router.js'], dest: 'dist', filter: 'isFile' },
                    { expand: true, src: ['lib/jquery/dist/jquery.js'], dest: 'dist', filter: 'isFile' },
                    { expand: true, src: ['lib/axios/dist/axios.js'], dest: 'dist', filter: 'isFile' },
                    { expand: true, src: ['lib/echarts/dist/echarts-all.min.js'], dest: 'dist', filter: 'isFile' },
                    { expand: true, src: ['lib/d3/dist/d3.js'], dest: 'dist', filter: 'isFile' },
                    { expand: true, src: ['lib/vuex/dist/vuex.js'], dest: 'dist', filter: 'isFile' },
                    { expand: true, src: ['lib/vue-i18n/dist/vue-i18n.js'], dest: 'dist', filter: 'isFile' },
                ],
            },
            copySrc: {
                files: [
                    { expand: true, src: ["plugin/src/" + product + "/configs/**"], dest: "dist/" },
                    { expand: true, src: ["plugin/src/" + product + "/files/**"], dest: "dist/" },
                    { expand: true, src: ["plugin/src/" + product + "/imgs/**"], dest: "dist/" },
                ],
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-vue-split-file');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask("asyncTaskFrame", function () {
        const done = this.async();
        var jsonPath = "dist/vueSplitLog.json";
        execGruntTaskFrame(done, jsonPath);
    })


    grunt.registerTask("asyncTaskSrc", function () {
        const done = this.async();
        var jsonPath = "dist/vueSplitLog.json";
        asyncTaskSrc(done, jsonPath);
    })


    grunt.registerTask('frame', ['clean:dist', "vue_split_file:vueSplitFrame", 'asyncTaskFrame'])

    grunt.registerTask('release', ['clean:src', "vue_split_file:vueSplitSrc", 'asyncTaskSrc'])

};