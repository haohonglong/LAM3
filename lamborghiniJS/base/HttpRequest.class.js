
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
const System =(typeof LAM3 !== 'undefined') ? LAM3 : require('./System');
const Component = require('./Component.class');
const url = require('url');
class HttpRequest extends Component{
    constructor(){
    	super();
	}
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
    static get(name,req){return url.parse(req.url, true).query[name];}
    static post(){}
    static put(){}
    static delete(){}
}

System.merge(null,[{
    'get':HttpRequest.get
}],true);
module.exports = HttpRequest;

