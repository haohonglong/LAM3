
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2019-06-19
 * 名称：the base of controller
 * 功能：
 * 说明 : 这个基类不允许被直接实例化，要实例化它的派生类。
 *
 * note :
 *
 *
 *
 */
const System =(typeof LAM3 !== 'undefined') ? LAM3 : require('./System');
const Component = require('./Component.class');
const View = require('./View.class');
class Controller extends Component{
    constructor(init){
        super();
        init = init || {};
        this.layout = 'main';
        this.suffix = '.html';
        this.layoutPath = 'layouts';
        this.viewpath = System.VIEWS;
        this.ajaxConfig = null;
        this.title = 'title';
        this.content = {};
        this.view = null;
    }
    init(){}
    getView(){
        if(!(this.view instanceof View)){
            this.view = new View();
        }
        this.view.title      = this.title;
        this.view.ajaxConfig = this.ajaxConfig;
        this.view.viewpath   = this.viewpath;
        this.view.suffix     = this.suffix;
        return this.view;
    }
    /**
     * @author lhh
     * 产品介绍：渲染视图与layout
     * 创建日期：2018-9-12
     * 修改日期：2019-06-18
     * 名称：render
     * 功能：render the page
     * 说明：返回视图
     * 注意：
     * @param name{String}              NO NULL:name of view
     * @param data{Object}              NULL:assigning data for page
     * @param ajaxConfig{Object}        NULL:init ajax configure
     * @param callback{Function}        NULL:
     * @returns {string}
     */
    render(name,data,ajaxConfig,callback) {
        var content = this.renderPartial(name,data,ajaxConfig);
        this.viewpath = System.VIEWS;
        return this.renderContent(content,callback);
    }
    /**
     * @author lhh
     * 产品介绍：渲染视图与layout
     * 创建日期：2019-06-18
     * 修改日期：2019-06-18
     * 名称：renderContent
     * 功能：
     * 说明：返回视图
     * 注意：
     * @param content
     * @param callback
     * @returns {string}
     */
    renderContent(content,callback) {
        var obj = System.Template.layout(content);
        if(System.isPlainObject(obj)){
            content = obj.content;
            this.title   = obj.title   || this.title;
            this.suffix  = obj.suffix  || this.suffix;
            this.layout  = obj.name    || this.layout;
            System.isPlainObject(obj.data) && System.merge(true,this.content,[obj.data],true);
            this.layoutPath = (obj.path && this.layoutPath+'/'+obj.path) || this.layoutPath;
        }
        return this.renderPartial('/'+this.layoutPath+'/'+this.layout,{
            'VIEWS':System.VIEWS,
            'IMAGE':System.IMAGE,
            'LAM':System,
            'title':this.title,
            'D':this.content,
            'content':content
        },callback || null,this.ajaxConfig);
    }
    /**
     * @author lhh
     * 产品介绍：渲染视图,没有layout
     * 创建日期：2019-02-3
     * 修改日期：2019-06-19
     * 名称：renderPartial
     * 功能：render the page
     * 说明：
     * 注意：
     * @param name{String}              NO NULL:name of view
     * @param data{Object}              NULL:assigning data for page
     * @param callback{Function}        NULL:callback
     * @param ajaxConfig{Object}        NULL:init ajax configure
     * @returns {string}
     */
    renderPartial(name,data,callback,ajaxConfig) {
        data = data || System.createDict();
        data.title = data.title || this.title;
        return this.getView().render(name, data, callback, ajaxConfig);

    }
}




module.exports = Controller;

