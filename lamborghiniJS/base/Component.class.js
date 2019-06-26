
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2018-10-28
 * 名称：组件类
 * 功能：服务于应用层类
 * 说明 : 这个基类不允许被直接实例化，要实例化它的派生类。
 *
 * note :
 *
 *
 *
 */
const F_Object = require('./Object.class');
const Component = function(System){
	'use strict';
    var Object = F_Object(System);
	System.merge(null,[{



		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-02-17
		 * 修改日期：2016-02-17
		 * 名称：checkout
		 * 功能：
		 * 说明：
		 * 注意：
		 * Example：
		 */
		'checkout': function() {},




		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-11-09
		 * 修改日期：2015-11-09
		 * 名称： System.log
		 * 功能：调试工具
		 * 说明：
		 * 注意：
		 * @param  (Object)M	         	　　	NO NULL : 提示出错信息
		 * @return (Boolean)
		 * Example：
		 *
		 */
		'log':function(M){
			var defaults={
				'line':'行号',
				'message':'message'
			};
			M = isObject(M) ? System.merge({},[M,defaults]) : defaults;
			throw new Error(["Warning:: at ","'",M.line,"'"," line tip: -> ",M.message].join(''));
		},
		/**
		 * 产品介绍：
		 * 创建日期：2017-9-5
		 * 修改日期：2017-9-5
		 * 名称：System.printErrorInfoOfObject
		 * 功能：打印错误信息对象里的所有属性
		 * 说明：
		 * 注意：
		 * @param D
		 * @returns {string}
		 */
		'printErrorInfoOfObject':function(D){
			var arr =['\n{'];
			System.search(D,function(k,v){
				if(!System.isObject(v)){
					arr.push('\t'+k+':'+typeof v+',');
				}
			});
			arr.push('}\n');
			return arr.join('\n');
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-04-18
		 * 修改日期：2016-04-18
		 * 名称：getRootPath
		 * 功能：获取项目根路径，如： http://localhost:8083/uimcardprj
		 * 说明：
		 * 注意：
		 * @param (void)
		 * @returns {string}
		 */
		'getRootPath':function(){
			//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
			var curWwwPath=window.document.location.href;
			//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
			var pathName=window.document.location.pathname;
			var pos=curWwwPath.indexOf(pathName);
			//获取主机地址，如： http://localhost:8083
			var localhostPaht=curWwwPath.substring(0,pos);
			//获取带"/"的项目名，如：/uimcardprj
			var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
			return(localhostPaht+projectName);
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-1-18
		 * 修改日期：2016-3-22
		 * 名称：System.use
		 * 功能：用createElement 方式创建标签并且设为异步
		 * 说明：
		 * 注意：
		 * @return  (System)
		 * Example：
		 */
		'use':function(){
			this.Config.render.use();
			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-1-18
		 * 修改日期：2016-3-22
		 * 名称：System.unuse
		 * 功能：用document.write() 方式创建标签并且设为非异步
		 * 说明：
		 * 注意：
		 * @return  (System)
		 * Example：
		 */
		'unuse':function(){
			this.Config.render.unuse();
			return this;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：覆写方法
		 * 创建日期：
		 * 修改日期：
		 * 名称： System.override
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param   (Function)old_fn 	 NO NULL :
		 * @param 	(Function)new_fn     NO NULL :
		 * Example：返回原有的方法原型
		 *
		 */
		'override':function(old_fn,new_fn){
			var old=old_fn;
			old_fn=new_fn;
			return old;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-11-27
		 * 修改日期：2014-11-27
		 * 名称：System.autoCenter
		 * 功能：元素自定垂直居中容器中间
		 * 说明：
		 * 注意：
		 * @param(Number) 		NO NULL : W  容器宽
		 * @param(Number) 		NO NULL : w  元素宽
		 * @param(Number) 		NO NULL : H  容器高
		 * @param(Number) 		NO NULL : h  元素高
		 * @param(Number) 		NULL 	: p  有padding值时
		 * @return (Object) 返回居中位置的xy 坐标
		 * Example：
		 *		System.autoCenter(500,10,500,10,0);
		 */
		'autoCenter':function(W,w,H,h,p){
			p=p || 0;
			W=parseInt(W);
			w=parseInt(w);
			H=parseInt(H);
			h=parseInt(h);
			p=parseInt(p);
			if(!W || !w || !H || !h) return 0;
			return {'x':parseInt((W-w-p)/2),'y':parseInt((H-h-p)/2)};
		}
	}],true);

	var __this__=null;

	var Component = Object.extend({
		constructor: function() {
			this.base();
			__this__=this;
		},
		'_className':'Component',
		'__set':function(){},
		'__get':function(){},
		'bootstrap':function(){},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-14
		 * 修改日期：2016-8-23
		 * 名称：merge
		 * 功能：合并多个对象方法到当前的类里
		 * 说明：默认同名方法名不会被覆盖
		 * 注意：除了语法错误外，如果合并的方法没起作用，是因为与原有方法重名了
		 * @param  (Boolean)deep  		   NULL :是否要深度拷贝对象
		 * @param  (Array)args   		NO NULL :要合并对象的集合
		 * @param  (Boolean)override 	   NULL :是否覆盖同名键名值,默认 false 是不覆盖
		 * @return  (Object) 当前对象
		 *		merge([A[,...]],override);
		 * Example：
		 */
		'merge':function(args,override){
			var deep;
			if(System.isBoolean(args)){
				deep = args;
				args = arguments[1];
				override = arguments[2];
			}
			System.merge(deep || false,this,args,override || false);
			return this;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：extends
		 * 功能：动态继承对象
		 * 说明：
		 * 注意：
		 * @param  (Boolean)deep  		   NULL :是否要深度拷贝对象
		 * @param   (Object)sub 			NO NULL :
		 * @param   (Object)_super 			NO NULL :
		 * @param  (Boolean)override 	   	   NULL :是否覆盖同名键名值,默认 false 是不覆盖
		 * @return  (Object)						:返回继承完父类后的子类对象
		 * Example：
		 */
		'extends': function( sub,_super,override) {
			var deep;
			if(System.isBoolean(sub)){
				deep = sub;
				_super = arguments[1];
				override = arguments[2];
			}
			return System.merge(deep || false,sub,[_super],override || false);

		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-15
		 * 修改日期：2016-7-15
		 * 名称：clone
		 * 功能：克隆当前对象
		 * 说明：
		 * 注意：
		 * @return  (Object)				:返回克隆后的新对象
		 * Example：
		 */
		'clone': function() {
			return System.clone(this);

		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-15
		 * 修改日期：2016-7-15
		 * 名称：isclone
		 * 功能：当前对象是克隆对象吗
		 * 说明：
		 * 注意：
		 *
		 * @returns {boolean}
		 */
		'isclone': function() {
			return System.isclone(this);


		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-15
		 * 修改日期：2016-7-15
		 * 名称：isitclone
		 * 功能：当前对象是从它克隆来的？
		 * 说明：
		 * 注意：
		 * @return  (Object)obj				:非克隆对象
		 * @param obj
		 * @returns {boolean}
		 */
		'isitclone': function(obj) {
			if(!this.isclone()){
				throw new Error("Warning: 当前对象不是克隆对象");

			}
			if(System.isclone(obj)){
				throw new Error("Warning: 参数是克隆对象");

			}
			if(obj._hashCode === this._hashCode.split('_')[0]){
				return true;
			}else{
				return false;
			}

		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-15
		 * 修改日期：2016-7-15
		 * 名称：iscurclone
		 * 功能：是从当前对象克隆过来的吗
		 * 说明：
		 * 注意：
		 * @return  (Object)obj				:克隆对象
		 * @param obj
		 * @returns {boolean}
		 */
		'iscurclone': function(obj) {
			if(this.isclone()){
				throw new Error("Warning: 当前对象是克隆对象");

			}
			if(!System.isclone(obj)){
				throw new Error("Warning: 参数不是是克隆对象");

			}
			if(this._hashCode === obj._hashCode.split('_')[0]){
				return true;
			}else{
				return false;
			}

		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Component对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});


	return Component;
};

module.exports = Component;

