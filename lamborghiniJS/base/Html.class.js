const System =(typeof LAM3 !== 'undefined') ? LAM3 : require('./System');
const Component = require('./Component.class');
const Template = require('./Template.class');
const Fsc = require('./Fsc.class');
System.merge(null,[{
    'isHTMLDocument'	: System.type("HTMLDocument"),
    'isHTMLHtmlEment' 	: System.type("HTMLHtmlElement"),
    'isHTMLBodyElement' : System.type("HTMLBodyElement"),
    'isHTMLHeadElement' : System.type("HTMLHeadElement"),
    'isHTMLCollection' 	: System.type("HTMLCollection"),
    'isXMLHttpRequest' 	: System.type("XMLHttpRequest"),
    'isXMLSerializer' 	: System.type("XMLSerializer")
}],true);
class Html extends Component{
    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-1-15
     * 修改日期：2018-12-12
     * 名称： getFile
     * 功能：返回指定的文件
     * 说明：只有两个参数可选,第一个参数是jQuery 对象,第二个是json 对象
     * 注意：
     * @param 	(jQuery)$dom             	   NO NULL :
     * @param 	(Object)D                	   NO NULL :json 数据
     * @param 	(String)  	D.type             NO NULL :获取方式
     * @param 	(String)  	D.dataType         NO NULL :获取文件类型
     * @param 	(String)  	D.contentType      	  NULL :设置编码等
     * @param 	(String)  	D.url         	      NULL :请求地址
     * @param 	(String)  	D.url_404         	  NULL :404默认地址
     * @param 	(String)  	D.jump         	      NULL :404页面是否独立一个页面打开
     * @param 	(String|{}) D.data             	  NULL :请求地址的参数
     * @param 	(JSON) 		D.tpData               NULL :分配模版里的数据
     * @param 	(Array) 	D.delimiters          NULL :模版分隔符
     * @param 	(Number) 	D.repeat          	  NULL :模版循环次数(测试用)
     * @param 	(Boolean) 	D.async               NULL :是否异步加载
     * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
     * @param 	(Function)	D.beforeSend       	  NULL :在发送数据之前执行的方法
     * @param 	(Function)	D.capture       	  NULL :可以在第一时间捕获返回的数据字符串，处理修改后返回
     * @param 	(Function)	D.success       	  NULL :
     * @param 	(Function)	D.error       	  	  NULL :
     * @param 	(Function)	D.done       	  	  NULL :
     * @param 	(Function)	D.preform       	  NULL :
     * @return (void)
     * Example：
     *
     */
	constructor($dom,D){
		super();
        this.symbol=[];
        //如果第一个是对象且不是jQuery对象
        if ($dom && System.isObject($dom) && System.isPlainObject($dom) && !System.is_instanceof_jQuery($dom)) {
            D = $dom;
            $dom = null;
        }

        this.$dom = $dom;
        this.dataType 	 = D&&D.dataType 	||	"text";
        this.contentType = D&&D.contentType ||	"application/x-www-form-urlencoded; charset=UTF-8";
        this.file  		 = D&&D.url         ||  null;
        this.file_404  	 = D&&D.file_404    ||  System.ERROR_404;
        this.type  		 = D&&D.type  	 	||	"GET";
        this.repeat  	 = D&&D.repeat  	||	1;
        this.delimiters  = D&&D.delimiters  ||	System.Config.templat.delimiters;
        this.tpData  	 = D&&D.tpData  	||	null;
        this.data  		 = D&&D.data  	 	||	{};
        this.jump  	     = D&&D.jump        ||  null;
        this.async 		 = D&&D.async 		||  false;
        this.cache 		 = D&&D.cache 		||	false;
        this.beforeSend  = D&&D.beforeSend	||	0 ;
        this.capture 	 = D&&D.capture		||	0 ;
        this.success 	 = D&&D.success	    ||	0 ;
        this.error 	 	 = D&&D.error	    ||	0 ;
        this.done 	 	 = D&&D.done	    ||	function(){} ;
        this.preform 	 = D&&D.preform		||	0 ;
        this.file     = System.template(this.file);
        this.file_404 = System.template(this.file_404);
        if(System.isFunction(this.preform)){this.preform();}
	}

    init(){return this;}
    compile(S) {
        if(System.isArray(this.tpData)){
            return Template.foreach(S,this.tpData,this.delimiters);
        }else{
            return Template.compile(S,this.tpData,this.delimiters);
        }
    }
    loop(S) {
        var s = '',total = this.repeat >= 1 ? this.repeat : 1;
        while((total--) > 0){s+=S;}
        return s;
    }
    get(){
        var _this = this,url = this.file,n = url.indexOf('?'),content='';
        if(System.isFunction(System.Cache) && System.isset(this.file)) {
            getCache().find('id', System.Base64.encode(n > -1 ? url.substring(0,n).trim() : url.trim()), function (index) {//路径一定要抛弃?带的参数,才可以base64 
                if (-1 === index) {
                    _this.ajax();
                }else{
                    content = this.get(index).content;
                    if('js' === this.get(index).type){//脚本文件就直接执行 
                        System.globalEval(content);
                    }else{
                        ajax_success_callback.call(_this,content,null,null);
                    }
                }
            });
        }else{
            _this.ajax();
        }
    }
    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2019-06-19
     * 修改日期：2019-06-19
     * 名称： success_callback
     * 功能：
     * 说明：
     * 注意：
     * @param data			NO NULL:返回的数据
     * @param textStatus
     * @param jqXHR
     */
    success_callback(data,textStatus,jqXHR) {
        setCache(this.file,data);
        ajax_success_callback.call(this,data,textStatus,jqXHR);
    }
    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2019-06-19
     * 修改日期：2019-06-19
     * 名称： error_callback
     * 功能：
     * 说明：
     * 注意：
     * @param XMLHttpRequest
     * @param textStatus
     * @param errorThrown
     */
    error_callback(XMLHttpRequest, textStatus, errorThrown){
        try{
            switch(XMLHttpRequest.status) {
                case 404:
                    System.View.ERROR_404('the path Error '+this.file
                        ,this.file_404
                        ,this.jump ? null : this.$dom);
                    break;
                default:

            }

        }catch(e){
            throw new Error(e);
        }
        if(this.error && System.isFunction(this.error)){
            this.error(XMLHttpRequest, textStatus, errorThrown);
        }
    }
    html(obj){}
    ajax() {
        var _this = this;
        if(System.isset(this.file)){
            var data = Fsc.getFile(this.file);
            _this.success_callback(data,null,null);

        }
    }
    empty(){}
    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2019-06-19
     * 修改日期：2019-06-19
     * 名称： Html.init
     * 功能：实例化Html 的派生类时重定义此方法，可使override方法生效，否则一直被实例化的是Html类
     * 说明：
     * 注意：
     * @param $dom
     * @param D
     */
    static init($dom,D) {(new Html($dom,D)).init().get();}

    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-3-12
     * 修改日期：2016-10-14
     * 名称： Html.getFile
     * 功能：返回指定的文件
     * 说明：支持链式调用
     * 注意：
     * @param 	(String)  	D.url         	      NULL :请求地址
     * @param 	(Function)	D.callBack       	  NULL :参数：文件里的内容
     * @param 	(Object)D                	   NO NULL :json 数据
     * @param 	(String)  	D.type             NO NULL :获取方式
     * @param 	(String)  	D.dataType         NO NULL :获取文件类型
     * @param 	(String|{}) D.data             	  NULL :请求地址的参数
     * @param 	(Boolean) 	D.async               NULL :是否异步加载
     * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
     * @returns {Html|*}
     * Example：
     *
     */
    static getFile(url,callBack,D){
        if(!System.isString(url)){throw new Error("Warning :url 必须是请求文件的路径");}

        getFile(System.merge({
            'url':url,
            'success':callBack
        },[D || {}]));

        return System.Html;

    }

    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-10-14
     * 修改日期：2016-10-26
     * 名称： Html.getFiles
     * 功能：返回指定的多个文件
     * 说明：支持链式调用
     * 注意：
     * @param 	(Array)  	D.urls         	      NULL :请求地址
     * @param 	(Function)	D.callBack       	  NULL :参数：文件里的内容
     * @param 	(Object)D                	   NO NULL :json 数据
     * @param 	(String)  	D.type             NO NULL :获取方式
     * @param 	(String)  	D.dataType         NO NULL :获取文件类型
     * @param 	(String|{}) D.data             	  NULL :请求地址的参数
     * @param 	(Boolean) 	D.async               NULL :是否异步加载
     * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
     * @returns {Html|*}
     */
    static getFiles(urls,callBack,D){
        if(!System.isArray(urls)){throw new Error("Warning :url 必须是请求文件的路径(数组格式)");}
        System.each(urls,function(){
            if(!System.fileExisted(this)){
                if(System.isClassFile(this)){
                    System.classes.push(this);
                }
                System.files.push(this);
                Html.getFile(this,callBack,D);
            }
        });
        return System.Html;

    }

    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-9-9
     * 修改日期：2017-8-30
     * 名称： Html.analysisTpl
     * 功能：只能在 link,a,img 这几种标签范围内查找，并解析带自定义属性'[data-var=tpl]'元素的标签 或自定义的
     * 说明：
     * 注意：
     * @return {void}
     * Example：
     *
     */
    static analysisTpl(){
        var custom_attr=System.Config.templat.custom_attr || '[data-var=tpl]';
        var value;
        if(-1 === custom_attr.indexOf('[')){
            value ='['+custom_attr+']';
        }else{
            value = custom_attr;
        }

        var $value = $(value);
        if(!$value){return;}
        $value.each(function(){
            var $this=$(this);
            var attr=null;
            var tag = this.nodeName;
            switch(tag){
                case "LINK":
                case "A":
                    attr = attr || 'href';
                case "IMG":
                case "IFRAME":
                    attr = attr || 'src';
                    value=System.template($this.attr(attr));
                    $this.attr(attr,value);
                default :
                    value=System.template($this.html());
                    $this.html(value);
            }

        });

    }
    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-1-15
     * 修改日期：2018-4-10
     * 名称： Html.include
     * 功能：html文件里包含另一个文件
     * 说明：只有两个参数可选,第一个参数是jQuery 对象,第二个是json 对象
     * 注意：
     * @param 	(jQuery)$dom             NO NULL :
     * @param 	(Object)D                NO NULL :json 数据
     * @param 	(Function)D.callBack       	NULL :返回到会调函数里的内容:this: 当前include 节点;content:include 的文件
     * @return {void}
     * Example：
     *
     */
    static include($dom,D,
                          success){
        success = D && D.callBack || 0;
        //如果第一个是对象且不是jQuery对象
        if ($dom && System.isObject($dom) && System.isPlainObject($dom) && !System.is_instanceof_jQuery($dom)) {
            D = $dom;
            $dom = null;
            getFile(D);
            return;
        }

        if(!$dom) return;

        $dom.each(function(){
            var dom =this;
            if(success && System.isFunction(success)){
                D.success =function(content){
                    success.call(dom,content);
                };
            }
            var jump = eval($(this).attr('jump'));
            var path = $(this).attr('location');
            if(jump && System.isset(path)){
                location.href = path;
            }
            getFile($(dom),D);
        });

    }

    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-4-7
     * 修改日期：2018-11-30
     * 名称： Html.load
     * 功能：html文件里包含另一个文件
     * 说明：跟Html.include方法不一样的地方是 这里是包裹include的内容
     * 注意：
     * @param 	(jQuery)$dom             NO NULL :
     * @return ()
     * Example：
     *
     */
    static load($dom){
        $dom.each(function(){
            var $this =$(this);
            Html.getFile($this.attr('file'),function(content){
                $this.html(content);
            });
        });
    }


    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2015-8-25
     * 修改日期：2018-12-7
     * 名称： tag
     * 功能：动态返回指定的标签
     * 说明：
     * 注意：length 是关键字 属性里禁止使用
     * @param 	(Boolean)single            NULL : 成对标签还是单一标签，false 是成对标签
     * @param 	(String)name            NO NULL : 标签名称
     * @param 	(Object)Attr               NULL : 标签的属性
     * @param 	(String|Array)content      NULL : 内容
     * @return (String) 返回标签字符串
     * Example：
     *
     */
    static tag(single,name,Attr,content){
        return System.tag(single,name,Attr,content).join('');
    }

    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-9-4
     * 修改日期：2016-10-26
     * 名称： scriptFile
     * 功能：
     * 说明：
     * 注意：length 是关键字 属性里禁止使用
     * @param 	(String)src      NO NULL : 路径
     * @param 	(Object)Attr        NULL : 标签的属性
     * @return (String)
     * Example：
     *
     */
    static scriptFile(src,Attr){
        Attr = Attr || System.clone(sAttribute);
        return System.script(src,Attr);
    }

    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-9-4
     * 修改日期：2016-10-26
     * 名称： a
     * 功能：
     * 说明：
     * 注意：length 是关键字 属性里禁止使用
     * @param 	(String)href   		NO  NULL : 连接地址
     * @param 	(Object)Attr            NULL : 标签的属性
     * @return (String)
     * Example：
     *
     */
    static linkFile(href,Attr){
        if(!System.isString(href)){throw new Error('Warning: link 标签href参数必须是字符串！');}
        Attr = Attr || System.clone(cAttribute);
        Attr.href = href;
        return Html.tag(true,'link',Attr);
    }
    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-9-4
     * 修改日期：2016-10-25
     * 名称： script
     * 功能：
     * 说明：
     * 注意：length 是关键字 属性里禁止使用
     * @param 	(String)content      NO NULL : 内容
     * @param 	(Object)Attr            NULL : 标签的属性
     * @return (String)
     * Example：
     *
     */
    static script(content,Attr){
        Attr = Attr || {};
        Attr.type = Attr.type || 'text/javascript';
        return Html.tag('script',Attr,content);
    }
    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-9-4
     * 修改日期：2016-10-25
     * 名称： style
     * 功能：
     * 说明：
     * 注意：length 是关键字 属性里禁止使用
     * @param 	(String|Array)content     NO NULL : 内容
     * @param 	(Object)Attr             	 NULL : 标签的属性
     * @return (String)
     * Example：
     *
     */
    static style(content,Attr){
        Attr = Attr || {};
        Attr.type = Attr.type || 'text/css';
        return Html.tag('style',Attr,content);
    }
    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-9-4
     * 修改日期：2016-10-26
     * 名称： a
     * 功能：
     * 说明：
     * 注意：length 是关键字 属性里禁止使用
     * @param 	(String)href   			NO  NULL : 连接地址
     * @param 	(String|Array)content      NULL : 内容
     * @param 	(Object)Attr               NULL : 标签的属性
     * @return (String)
     * Example：
     *
     */
    static a(href,content,Attr){
        if(!System.isString(href)){throw new Error('Warning: a标签href参数必须是字符串！');}
        Attr = Attr || {};
        content = content || '';
        Attr.href = href;
        return Html.tag('a',Attr,content);
    }

    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2016-9-4
     * 修改日期：2016-10-26
     * 名称： img
     * 功能：
     * 说明：
     * 注意：length 是关键字 属性里禁止使用
     * @param 	(String)src      NO NULL : 图片 路径
     * @param 	(Object)Attr        NULL : 标签的属性
     * @return (String)
     * Example：
     *
     */
    static img(src,Attr){
        if(!System.isString(src)){throw new Error('Warning: img标签src参数必须是字符串！');}
        Attr = Attr || {};
        Attr.src = src;
        return Html.tag(true,'img',Attr);
    }


    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2018-4-19
     * 修改日期：2018-4-19
     * 名称： Html.encode
     * 功能：html 转成实体
     * 说明：
     * 注意：
     * @param {String}target
     * @returns {string}
     * Example：
     *
     */
    static encode(target) {
        target = String(target);
        return target
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

    }
    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2018-4-19
     * 修改日期：2018-4-19
     * 名称： Html.decode
     * 功能：实体转成html
     * 说明：
     * 注意：
     * @param {String}target
     * @returns {string}
     * Example：
     *
     */
    static decode(target) {
        target = String(target);
        return target
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&') //处理转义的中文和实体字符
            .replace(/&#([\d]+);/g, function ($0, $1) {
                return String.fromCharCode(parseInt($1, 10));
            })
    }
}

function getCache(name){
    if(!Cache){
        try{
            if(System.LAM_ENV_DEV){
                Cache = new System.Cache(
                    name || 'template'
                    ,System.configure_cache.expires || 0);
            }else{
                Cache = new System.Storage(
                    name || 'template'
                    ,System.configure_cache.type || 'sessionStorage'
                    ,System.configure_cache.expires || 0);
            }
        }catch (e){
            throw new Error(e);
        }


    }
    return Cache;
}

/** 
 * @author: lhh
 * 产品介绍：
 * 创建日期：2018-11-13
 * 修改日期：2018-11-13
 * 名称： setCache
 * 功能：数据存储到缓存中，
 * 说明：路径一定要抛弃?带的参数 
 *
 * @param url 
 * @param data 
 */
function setCache(url,data){
    var n = url.indexOf('?'),_url = url;
    getCache().find('id',System.Base64.encode(n > -1 ? url.substring(0,n).trim() : url.trim()), function (index) {
        if (-1 === index) {
            this.add({
                "path":_url.trim(),
                "type":System.isJsFile(url) ? 'js' : '',
                "content":data
            });
        }
    });
}

function ajax_success_callback(data,textStatus,jqXHR){
    var _this = this;
    data = Template.include(Template.define(data));
    if(System.isString(data) && (System.isPlainObject(_this.tpData) || System.isArray(_this.tpData))){data = _this.compile(data);}
    if(System.isFunction(_this.capture)){data = _this.capture(data);}
    if(parseInt(_this.repeat) > 1 && System.isString(data)){data = _this.loop(data);}
    if(_this.success && System.isFunction(_this.success)){
        _this.success(data,textStatus,jqXHR);
    }else{
        if(_this.$dom){
            _this.$dom.after(data).remove();
        }
    }
}

function getFile($dom,D){Html.init($dom,D);}

Html.code_map={
    '&' : '&#38'
    ,'"' : '&#34'
    ,"'" : '&#39'
    ,'>' : '&#62'
    ,'<' : '&#60'
};


module.exports = Html;