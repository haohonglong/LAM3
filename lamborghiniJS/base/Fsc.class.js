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
const System =(typeof LAM3 !== 'undefined') ? LAM3 : require('./System');
const Component = require('./Component.class');
class Fsc extends Component{
    constructor(url,D){
    	super(url,D);
        this.fso =null;
        this.file=null;
	}
    /**
     *
     * @param path
     * @returns {*}
     */
    static getFile(path) {
        path = path.toString();
        var content = fs.readFileSync(path);
        return content;
    }
    /**
     *
     * @param path
     * @param content
     * @returns {boolean}
     */
    static putFile(path,content) {

        return true;
    }

}



module.exports = Fsc;