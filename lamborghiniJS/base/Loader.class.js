/**
 *
 * @author: lhh
 * 产品介绍： 文件加载器
 * 创建日期：2014-9-9
 * 修改日期：2019-6-25
 * 名称：Loader
 * 功能：导入js文件
 * 说明 :
 * 注意：
 *
 * Example：
 *
 */

const Loader = function(System){
    'use strict';
    System.is(System,'Object','Loader',System.classPath+'/base');

    var __this__=null;
    var files = [];
    var Loader = System.Object.extend({
        constructor: function(Config){
            this.base();
            __this__=this;
            this.Config = Config || System.Config;
            this.D = null;
            this.js  =[];
            this.css =[];
        },
        '_className':'Loader',
        '__constructor':function(){},
        /**
         *
         * @author: lhh
         * 名称： suffix_checkor
         * 功能：检查加载的文件路径是否已经包含后缀名,如果没有就添加返回，有就返回原路径
         * 创建日期：2016-11-3
         * 修改日期：2016-11-3
         * 说明：
         *
         * @param {String}str    文件路径
         * @param {String}suffix 对应文件的后缀名
         * @returns {*}
         */
        'suffix_checkor':function(str,suffix){
            var self = this;
            if(suffix){
                if(-1 === str.indexOf(suffix)){
                    return str+suffix;
                }else{
                    return str;
                }

            }
            for(var i= 0,
                    suffixs=self.Config.render.suffixs,
                    len=suffixs.length;
                i<len;i++){
                if(str.indexOf(suffixs[i]) !== -1){
                    return true;
                }
            }
            return false;
        },


        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2015-8-27
         * 修改日期：2017-9-1
         * 名称：import
         * 功能：导入指定的js文件
         * 说明：System 参数不用传
         * 注意：
         * @param   (Array)url 			    NO NULL :要加载js文件
         * @param   (String|Boolean)baseUrl 		   NULL :文件路径
         * @param   (String)suffix 		       NULL :文件后缀名
         * @returns {Loader}返回当前对象可以链式调用import方法
         * Example：
         */
        'import':function(url,baseUrl,suffix){
            var self = this;
            if(System.isString(url)){
                var str = url;
                url = [];
                url.push(str);
            }
            if(!System.isArray(url) || System.arr_isEmpty(url)){return this;}
            suffix = suffix || '.js';
            baseUrl = System.isset(baseUrl) ? baseUrl : System.ROOT;
            url.each(function(){
                var src=this;
                src = __this__.suffix_checkor(src,suffix);
                src = baseUrl ? baseUrl+src : src;
                if(!System.fileExisted(src)){
                    require(src);
                    if(System.isClassFile(src)){
                        System.classes.push(src);
                    }
                    System.files.push(src);
                }
            });
            return this;
        },

        /**
         *
         * @author: lhh
         * 名称：remove
         * 功能：清空加载器里的数据
         * 创建日期：2016-3-21
         * 修改日期：2016-3-21
         * 说明：
         * 调用方式：
         */
        'remove':function(){files = [];},
        /**
         *
         * @author: lhh
         * 名称：get_files
         * 功能：
         * 创建日期：2015-9-2
         * 修改日期：2015-9-2
         * 说明：
         * 调用方式：
         */
        'get_files':function(){return files;},
        /**
         *
         * @author: lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：
         * 说明：
         * 注意：
         * @return  ()                      :
         * Example：
         */
        'destructor':function(){}
    });

    System.import = new Loader().import;
    return Loader;

};


module.exports = {'class':Loader,'name':'Loader'};

