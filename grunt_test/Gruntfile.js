/*------------------------------------------------------------------------------------------------
	这个文件就是三步走：1、插件配置；2、加载插件；3、定义“注册任务-匹配相应的插件”
	wapper函数，所有的代码都写在这里
------------------------------------------------------------------------------------------------*/
module.exports=function(grunt)
{
/*------------------------------------------------------------------------------------------------
	
------------------------------------------------------------------------------------------------*/
	var req = {
		options: {
			baseUrl: 'src/js/action',
			optimize: "none",
			mainConfigFile: 'src/js/main.js',
			paths: {"jQuery":"empty:","highcharts":"empty:","Easemob":"empty:"}
			/*
			grunt.file.readJSON('app/config/exclude.json')
			*/
		}
	};
	grunt.file.expand({
		cwd: "src/js/action"
	}, "**/*.js").forEach(function(file) {
		//if (file !== 'jQuery.js') {
		//requireJsModules.push('action/' + file.replace(/\.js$/, ''));
		var fileName = file.replace(/\.js$/, '');
		req[fileName] = {
			options: {
				name: fileName,
				out: 'compiled_src/js/' + file,
				include: ['../main']
			}
		};
		//}
	});
	// grunt.file.expand({
	// 	cwd: ".tmp/css"
	// }, "*.css").forEach(function(file) {
	// 	var fileName = file.replace(/\.css$/, '');
	// 	req[fileName+'-css'] = {
	// 		options: {
	// 			optimizeCss: 'standard',
	// 			cssIn: ".tmp/css/"+file,
	// 			out: ".tmp/css/"+file
	// 		}
	// 	};
	// });
/*------------------------------------------------------------------------------------------------
	grunt.initConfig，所有的插件配置都在此：注意这里仅仅是配置，还没有运行
------------------------------------------------------------------------------------------------*/
    grunt.initConfig({
        //引入package.json文件,封装为pkg对象，pkg会用到
        pkg:grunt.file.readJSON("package.json"),
        /*
         	每一个插件就是一个任务：每一个任务又可以有多个“目标”——子任务
         	【uglify——压缩js代码】
         	1、uglify插件——名字不可改写！只能叫做uglify
     		2、uglify配置,需要注意：此处容易出错的地方是：缺少逗号，或者分号，要严格按照json的写法
            3、uglify是一个任务，可以在旗下配置多个“目标”a/b——子任务grunt uglify:a/b,
    		       其中的option也可以配置在每一个目标中，从而覆盖全局任务中的option
    		  	注意：如果某个任务配置多个目标，且grunt 某个任务，则会遍历所有的目标
        */
        uglify:
        {
            options://任务级别的options配置
            {
                //说明文本，每次编译时都在压缩文件的开始增加一段文本和时间
                banner:"/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
            },
            //目标target(子任务/目标)——static_mapping，静态配置
            static_mapping:
            {
                /*
                 	简洁格式：即直接写src：**,dest：**--
                	src:"js_src/main.js",
                	dest:"js/main.min.js"
                	或者
                	src: ['src/bb.js', 'src/bbb.js'],
  					dest: 'dest/b.js',
                */
               
                /*
                 	 文件对象格式：files:{}
                 	files: 
                 	{
				        'dest/a.js': ['src/aa.js', 'src/aaa.js'],
				        'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
      				}
                */
               /*
                	文件数组格式：files:[对象1，对象2]
               		files: 
               		[
				        {src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js'},
				        {src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js'}
			      	],
               */


                //文件数组格式：files：[{src:["原文件路径"],dest："目标路径"},{}……]
                //files:[{src:["js_src/main.js"],dest:"js/main.min.js"}]
            },
            //另一个自定义的target：动态配置，好处在于处理大量的js文件时，极为方便
            dynamic_mapping:
            {
                files:
                [
                    {
                        expand:true,//是否开启动态配置
                        cwd:"compiled_src/js",//原文件的根路径，src将以此为开始 
                        src:"**/*.js",//匹配js_src下的所有路径下的的所有的js文件
                        dest:"mini/mini_js",//目标路径  mini\mini_js
                        ext:".min.js",//目标文件的扩展名
                        extDot:"first"
                    }
                ]
            }
        },
        /*
         	任务task——less，编译less文件
        */
		less:
		{
			target:
			{
				files:grunt.file.readJSON("src/less/config.json")
			}
		},
        /*
         	任务task——cssmin，压缩css文件
        */
		cssmin:
		{
			options:
			{
			    shorthandCompacting: false,
			    roundingPrecision: -1
			},
			target:
			{
				files:
				[
			        {
						expand:true,//是否开启动态配置
						cwd:"compiled_src/css",//原文件的根路径，下面的src将以此为开始
						src:"**/*.css",//匹配js_src下的所有路径下的的所有的js文件
						dest:"mini/mini_css",//目标路径
						ext:".min.css"//目标文件的扩展名
			        }
			    ]
			}
		},
		/*
		 	任务task——concat，合并文件，可用于js；将多个文件合并为一个文件，如果不写target（concat_js）是无法编译成功的！
		 	在命令行写：grunt:concatFile后面可以不加目标名，因为concat的目标只配置了一个concat_js目标
		*/
		concat:
		{
			options: 
			{
		      stripBanners: true,
		      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - '+'<%= grunt.template.today("yyyy-mm-dd") %> */\n',
		    },
		    /*
		    	如果只运行grunt:concatFile，它会将两个target：concat_js和concat_js2都运行一遍！ 
		    */
			concat_js:
			{
				//此处可以单独写一个concat_js.json文件，来独立设置,也可以如下配置
				files:grunt.file.readJSON("src/js/config.json")
				/*
				{
					'compiled_src/js/index.js':['src/js/base.js','src/js/index/index.js']
				}
				*/        	
			}
		},
		/*
		 	任务task——jshint，检测js是否语法正确
		*/
		jshint:
		{
			check_js:["src/js/**/*.js"],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		/*
			requireJs配置
		*/
		requirejs: req,
		/*
		 	任务task——watch，监控文件，当文件改变时，执行相应的任务
		*/
		watch:
		{
			//添加两个target：js & less
			js:
			{
				files:"src/js/**/*.js",
				tasks:["jshint","uglify"]//依次执行 js检测，js文件连接，js文件压缩
			},
			less:
			{
				files:"src/less/**/*.less",
				tasks:["less","cssmin"]
			},
			options: 
			{
				debounceDelay: 250,//监测到当修改文件后，经过多少毫秒开始执行以上的任务（默认500）
			}
		}
    });
    //加载uglify插件,压缩js
    grunt.loadNpmTasks("grunt-contrib-uglify");
    //加载concat插件，连接多个js文件，显而易见这里可以不用requirejs
    grunt.loadNpmTasks("grunt-contrib-concat");
    //加载cssmin插件，css压缩
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    //加载less插件，less编译为css
    grunt.loadNpmTasks("grunt-contrib-less");
    //加载jshint插件，检查js语法
    grunt.loadNpmTasks("grunt-contrib-jshint");
    //加载require插件，模块化异步加载js
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    //加载watch插件，监控
    grunt.loadNpmTasks("grunt-contrib-watch");
    
    
    
    //编写任务名称
    grunt.registerTask("lessCompiled",["less"]);
    grunt.registerTask("concatFile",["concat"]);
    grunt.registerTask("minCss",["cssmin"]);
    grunt.registerTask("default",["watch"]);
    grunt.registerTask("dev",["less","cssmin","requirejs","uglify"]);
};
