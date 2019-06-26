
/**
 * 创建人：lhh
 * 创建日期:2018－10－28
 * 修改日期:2018－10－28
 * 名称：HttpRequest
 * 功能：
 * 说明 : http
 *        
 * note : 
 * 		  
 *		
 * 
 */
const url = require('url');
const HttpRequest = function(System,req){
	'use strict';
    var Component = require(System.files[0]['Component'])(System);

	var __this__=null;

	var HttpRequest = Component.extend({
		constructor: function () {
			this.base();
			__this__ = this;
		},
		'_className':'HttpRequest',

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销HttpRequest对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});

    /**
     * @author lhh
     * 产品介绍：
     * 创建日期：2015-6-25
     * 修改日期：2019-6-25
     * 名称：HttpRequest.get
     * 功能：根据指定的url参数获取相对应的参数值
     * 说明：
     * 注意：
     * @param   (String)name            NO NULL :参数名称
	 * @param req
     * @return  {String}
     *
     */
    HttpRequest.get=function(name){
        return url.parse(req.url, true).query[name];

    };


    HttpRequest.post=function(){};
    HttpRequest.put=function(){};
    HttpRequest.delete=function(){};

    System.merge(null,[{
    	'get':HttpRequest.get
	}],true);

	return HttpRequest;
};

module.exports = HttpRequest;

