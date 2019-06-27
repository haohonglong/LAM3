const System =(typeof LAM3 !== 'undefined') ? LAM3 : require('./System');
const Component = require('./Component.class');
const HttpRequest = require('./HttpRequest.class');
const View = require('./View.class');
const Controller = require('./Controller.class');
class Router extends Component{
    constructor(){
    	super();
	}
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
    static init(r,m,req){
        r = r || 'r';
        m = m || 'm';

        m = HttpRequest.get(m,req) ? HttpRequest.get(m,req) : null;
        r = HttpRequest.get(r,req) ? HttpRequest.get(r,req) : System.defaultRoute || 'site/index';

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
            return {'r':r.toString(),'m':m.toString()};
        }else{
            return {'r':r.toString(),'m':false};
        }

    }

    /**
     * perform controller by url and run the action
     */
    static run(r,m,req,res) {
        var R = Router.init(r,m,req);
        r = R.r.split('/');
        var M = '';
        var str = r[0];
        var ControllerName = str.substring(0,1).toUpperCase()+str.substring(1);
        if(System.isString(R.m)) M = R.m+'/';
        var MyController = require(System.CONTROLLERS+'/'+M+ControllerName+'Controller.class');

        var action = r[1]+'Action';
        var id = r[2];
        var view="";
        id = System.eval(id);
        try{
            var controller = new MyController();
            if(controller instanceof Controller){
                if(action && System.isFunction(controller[action])){
                    controller.viewpath = System.VIEWS+'/'+M+ControllerName.toLowerCase();
                    controller.init();
                    view = controller[action](id);
                    if(System.isset(view) && System.isString(view)) return view;
                }else{
                    throw new Error("the action that '"+action+"' was not found");
                }
            }
        }catch(e){
            View.ERROR_404(res,e);
            throw new Error(e);
        }
    }
}



module.exports = Router;

