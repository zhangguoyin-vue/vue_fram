var splitLogPath = "dist/vueSplitLog.json";
module.exports = function (grunt) {
    var product = grunt.option('product');
    if (product === '' || product === undefined) {
        grunt.log.writeln('错误：');
        grunt.log.writeln('    parameter of current product can\'t be null!');
        grunt.log.writeln('正确示例：');
        grunt.log.writeln('    grunt release --product=bhz');
        return;
    } else {
        grunt.log.writeln('parameter of current product is ' + product + '.');
    }
    let cleanFileList = [];
    let concatFileList = {};

    function getIsFileExists(filepath) {
        if (!grunt.file.exists(filepath)) {
            return false;
        } else {
            return true;
        }
    }
    function execGruntTask(done) {
        var isFeleCheck = getIsFileExists(splitLogPath);
        if (isFeleCheck) {
            grunt.config.data.clean.clena_last = getDeleteFlieByJson();
            grunt.config.data.concat.basic_and_extras.files = getJsJsonListToObject();

            grunt.task.run(['babel:babelDist', "cssmin:yasuoDist", "htmlmin:yasuoDist", "uglify:bulidDist", "concat", 'clean:clena_last', "babel:babelSrc", "cssmin:yasuoSrc", "htmlmin:yasuoSrc", "uglify:bulidSrc", "copy", "clean:clean_grunt"])

            done(true)   //给回调函数传入false实参
        } else {
            setTimeout(() => {
                execGruntTask();
            }, 1000)
        }
    }

    function getJsJsonListToObject() {
        var jsJsonFlieList = grunt.file.readJSON(splitLogPath);
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

    function getDeleteFlieByJson() {
        var jsJsonFlieList = grunt.file.readJSON(splitLogPath);
        var tempObjects = [splitLogPath];
        jsJsonFlieList.forEach(function (itemJson) {
            itemJson.fileNameList.forEach(function (itemFile) {
                tempObjects.push(itemFile);
            });
        });
        return tempObjects;
    };


    // Project configuration.
    grunt.initConfig({
        //删除目录
        clean: {
            src: ["dist"],
            clena_last: cleanFileList,
            clean_grunt: ["dist/node_modules"]
        },
        //拆分VUE文件为 HTML JS CSS
        vue_split_file: {
            options: {
                excepts: ["App.vue"]
            },
            yasuo: {
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
                    }, {
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
            babelDist: {
                files: [
                    {
                        expand: true,//表示使用相对路径
                        cwd: "dist",//相对路径的根目录
                        src: "**/*.js",//相对路径下需要压缩的文件，*表示所有该后缀类型的文件，写具体的就是某个具体的文件将会被压缩
                        dest: "dist"//压缩后的文件需要放置的目录，如果不存在的话，会自动创建
                    }
                ]
            },
            babelSrc: {
                files: [
                    {
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
                    }, {
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
            yasuoDist: {
                options: {
                    mangle: false
                },
                expand: true,
                cwd: 'dist',//压缩那个文件夹里的文件
                src: '**/*.css',//压缩那个文件
                dest: 'dist',//放压缩后文件的文件夹
                ext: '.css'//压缩后文件的的名字
            },
            yasuoSrc: {
                files: [
                    {
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
                    }, {
                        expand: true,
                        cwd: "plugin/src/" + product,
                        src: "**/*.css",
                        dest: "dist/plugin/src/" + product,
                        ext: '.css'
                    }
                ]
            }
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
            yasuoDist: {
                expand: true,
                cwd: 'dist/',
                src: ['**/*.html'],
                dest: 'dist'
            },
            yasuoSrc: {
                expand: true,
                cwd: './',
                src: ['**/*.html'],
                dest: 'dist'
            }
        },
        //压缩js
        uglify: {
            options: {
                mangle: true, //不混淆变量名
                preserveComments: 'false', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                footer: '' //添加footer
            },
            bulidDist: {
                expand: true,//表示使用相对路径
                cwd: "./dist",//相对路径的根目录
                src: ['**/*.js'],//相对路径下需要压缩的文件，*表示所有该后缀类型的文件，写具体的就是某个具体的文件将会被压缩
                dest: "dist"//压缩后的文件需要放置的目录，如果不存在的话，会自动创建
            },
            bulidSrc: {
                expand: true,//表示使用相对路径
                cwd: "./dist",//相对路径的根目录
                src: ['**/*.js'],//相对路径下需要压缩的文件，*表示所有该后缀类型的文件，写具体的就是某个具体的文件将会被压缩
                dest: "dist"//压缩后的文件需要放置的目录，如果不存在的话，会自动创建
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
                files: concatFileList,
            },
        },

        //赋值配置文件到对应的目录
        copy: {
            main: {
                files: [
                    { expand: true, src: ['imgs/**'], dest: 'dist/' },
                    { expand: true, src: ['lib/**'], dest: 'dist/' },
                    { expand: true, src: ["plugin/src/" + product + "/configs/**"], dest: "dist/" },
                    { expand: true, src: ["plugin/src/" + product + "/files/**"], dest: "dist/" },
                    { expand: true, src: ["plugin/src/" + product + "/imgs/**"], dest: "dist/" },
                ],
            },
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

    //设置默认任务
    // grunt.registerTask('default', ['clean:src', 'vue_split_file', 'babel', 'cssmin', 'htmlmin', 'uglify', 'copy', 'concat', 'clean:clena_last']);

    grunt.registerTask("asyncTask", function () {
        const done = this.async()
        execGruntTask(done);
    })
    //grunt.registerTask('default', ['clean:src', "vue_split_file", 'asyncTask'])
    grunt.registerTask('release', ['clean:src', "vue_split_file", 'asyncTask'])

    //grunt.registerTask('release', ['copy']);
};