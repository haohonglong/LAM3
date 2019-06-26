/**
 *
 * @author lhh
 * 产品介绍：创建文件流对象
 * 创建日期：2016-10-17
 * 修改日期：2018-1-2
 * 名称：LAMJS.Fsc
 * 功能：
 * 说明：
 * 注意：
 * @return  ()						:
 * Example：
 */
const fs = require('fs');
const F_Component = require('./Component.class');
const Fsc = function(System){
	'use strict';
    const Component = F_Component(System);

	var __this__=null;
	var Fsc = Component.extend({
		constructor: function (url,D){
			this.base(url,D);
			__this__=this;
			this.fso =null;
			this.file=null;
		},
		'_className':'Fsc',
		'__constructor':function(){},




		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Fsc对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});
    /**
	 *
     * @param path
     * @returns {*}
     */
	Fsc.getFile=function (path) {
		path = path.toString();
        var content = fs.readFileSync(path);
        return content;
    };
    /**
	 *
     * @param path
     * @param content
     * @returns {boolean}
     */
	Fsc.putFile=function (path,content) {

		return true;
    };

	return Fsc;
};


module.exports = Fsc;