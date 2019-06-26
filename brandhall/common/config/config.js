/**
 * 创建人：lhh
 * 创建日期:2019-6-25
 * 修改日期:2019-6-25
 * 功能：配置文件
 * 说明 :
 *
 * note :
 *
 *
 *
 */

const config = function(ROOT,undefined){
    'use strict';
    return {
        'vendorPath':ROOT+'/lamborghiniJS/',
        'LAM_DEBUG':true,
        'LAM_ENV':'dev',
        'Public':(function(){
            const SELF = ROOT+'/brandhall';
            return {
                'SELF':SELF
                ,'ROOT':ROOT
                ,'COMMON':ROOT+'/common'
                ,'PLUGINS':ROOT+'/common/plugins'
                ,'MYCOMMON':SELF+'/common'
                ,'CSS':SELF+'/public/css'
                ,'SCRIPT':SELF+'/public/js'
                ,'IMAGE':SELF+'/public/images'
                ,'CONTROLLERS':SELF+'/controllers'
                ,'VIEWS':SELF+'/views'
                ,'LAYOUTS':SELF+'/views/layouts'
                ,'COMPONENTS':SELF+'/views/components'
                ,'ERROR_404':SELF+'/views/_404.html'
                ,'INDEX':'index.html?r='
                ,'PORT':'8080'
                ,'HOAT':'locallhsot'
            };
        })(),
        'components':{
            'moduleID':'m',
            'routeName':'r',
            'defaultRoute':'room/list',
            'routeRules':{
                'login':'site/login',
                'list':'room/list',
                'detail':'room/detail'
            },
            't':function (System) {
                var id =0;
                System.Moudle = System.createDict();
                System.Object.g_key_id=function(){
                    return System.timestamp()+Math.round(Math.random()*System.random)+'_'+id++;
                };
                System.listen(function(){
                    if(System.isFunction(System.import)){

                        return true;
                    }
                },1);
                return System.timestamp();
            }
        },
        'configure_cache':{
            'type':'sessionStorage',
            'expires':0
        },
        //hashcode 随机种子
        'random':10000,
        //定义模版标签
        'templat':{
            'custom_attr':'[data-var=tpl]',
            'delimiters':['{{','}}']
        },
        'files':[],
        'XHR':{//配置加载xhr 的公共参数
            'type': 'GET'
            ,'async':false
            ,'cache':true
            ,'beforeSend':function(){}
        },
        //配置基础文件
        'autoLoadFile':function() {
            var classPath = this.getClassPath();
            return{
                 'System':classPath + '/base/System.js'
                ,'Base':classPath + '/base/Base.class.js'
                ,'Object':classPath + '/base/Object.class.js'
                ,'Component': classPath + '/base/Component.class.js'
                // ,'Loader': classPath + '/base/Loader.class.js'
                ,'Helper': classPath + '/base/Helper.class.js'
                ,'Compiler': classPath + '/base/Compiler.class.js'
                ,'Base64': classPath + '/base/Base64.class.js'
                ,'Cache': classPath + '/base/Cache.class.js'
                ,'HttpRequest': classPath + '/base/HttpRequest.class.js'
                // ,classPath+'/base/Browser.class.js'
                // ,classPath+'/base/Event.class.js'
                // ,classPath+'/base/Dom.class.js'
                ,'View': classPath + '/base/View.class.js'
                ,'Template': classPath + '/base/Template.class.js'
                ,'Html': classPath + '/base/Html.class.js'
                ,'Storage': classPath+'/base/Storage.class.js'
                ,'Controller': classPath+'/base/Controller.class.js'
                ,'Router': classPath+'/base/Router.class.js'
        };
        },

        //标签的渲染方式
        'render':{
            //加载文件的后缀名称
            'suffixs':['.js','.css'],
            //输出标签的方式 ()
            'fragment':null,
            //true : document.createElement(); false :document.write();
            'create':false,
            //加载后是否要移除添加过的script 节点
            'remove':false,
            'append':'after',
            'default':{
                'script':{
                    'Attribute':{
                        'type':'text/javascript',
                        //'async':'async',
                        //'defer':'defer',
                        'charset':'utf-8'
                    }
                },
                'css':{
                    'Attribute':{
                        'type':'text/css',
                        'rel':'stylesheet'
                    }
                }
            },
            'H':function(){
                return {
                    'html'    : document.getElementsByTagName('html')[0],
                    'head'    : document.getElementsByTagName('head')[0],
                    'body'    : document.getElementsByTagName('body')[0],
                    'meta'    : document.getElementsByTagName('meta')[0],
                    'script'  : document.getElementsByTagName('script')[0],
                    'link'    : document.getElementsByTagName('link')[0],
                    'div'    : document.getElementsByTagName('div')[0]
                };
            },
            /**
             * 用createElement 创建标签并且设为异步
             */
            'use':function(){},
            /**
             * 用document.write() 创建标签并且设为非异步
             */
            'unuse':function(){}
        },
        'params':{},
        'getClassPath':function(){
            return this.vendorPath;
        }
    };

};

module.exports = config;












