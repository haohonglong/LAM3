
const F_Component = require('./Component.class');
const F_View = require('./View.class');
const F_Controller = require('./Controller.class');
const F_HttpRequest = require('./HttpRequest.class');

const Router = function(System,req,res){
	'use strict';
	const Component = F_Component(System);
	const View = F_View(System,res);
	const Controller = F_Controller(System);
	const HttpRequest = F_HttpRequest(System,req);


	var __this__=null;
	var Router = Component.extend({
		constructor: function () {
			this.base();
			__this__ = this;

		},
		'_className':'Router',
		'__constructor':function(){},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Router对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});
    /**
     *
     * @author lhh
     * 产品介绍：Router.init
     * 创建日期：2015-4-2
     * 修改日期：2019-6-21
     * 名称：destructor
     * 功能：
     * 说明：
     * 注意：
     * @param r
     * @param m
     * @returns {*}
     */
	Router.init=function(r,m){
		r = r || 'r';
		m = m || 'm';

		m = HttpRequest.get(m) ? HttpRequest.get(m) : null;
		r = HttpRequest.get(r) ? HttpRequest.get(r) : System.defaultRoute || 'site/index';

	    var routeRules = System.routeRules;
	    if(routeRules){
	    	System.each(routeRules,function(k,v){
		    	if(k === r){
		    		r = v;
		    		return false;
		    	}
		    });
	    }
        if(System.isset(m) && !System.empty(m)){//分模块
			return {'r':r,'m':m};
        }else{
            return {'r':r,'m':false};
		}

	};

    /**
	 * perform controller by url and run the action
     */
	Router.run=function (r,m) {
        var R = Router.init(r,m);
		r = R.r.split('/');
		var M = '';
	    var str = r[0];
        var ControllerName = str.substring(0,1).toUpperCase()+str.substring(1);
        if(System.isString(R.m)) M = R.m+'/';
        var MyController = require(System.CONTROLLERS+'/'+M+ControllerName+'Controller.class')(System);

        var action = r[1]+'Action';
        var id = r[2];
        var view="";
        id = System.eval(id);
        try{ 
        	var controller = new MyController(); 
        	if(controller instanceof Controller){ 
        		if(action && System.isFunction(controller[action])){
                    controller.viewpath = System.VIEWS+'/'+M+Controller.toLowerCase();
                    controller.init();
                    view = controller[action](id);
                    if(System.isset(view) && System.isString(view)) return view; 
        		}else{ 
        			throw new Error("the action that '"+action+"' was not found"); 
        		} 
        	} 
        }catch(e){ 
        	View.ERROR_404(e); 
        	throw new Error(e); 
        }
    };


	
	return Router;
};


module.exports = Router;

