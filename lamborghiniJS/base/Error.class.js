const System =(typeof LAM3 !== 'undefined') ? LAM3 : require('./System');
const Component = require('./Component.class');
class Error extends Component{
	constructor(sMessage, sUrl, sLine){
		super();
        this.sMessage=sMessage;
        this.sUrl=sUrl;
        this.sLine=sLine;
	}
    //注意：onerror事件必需在此网页中其它Javascript程序之前！
    reportError(){
        var str = "";
        str += " 错误信息:" + this.sMessage + "\n";
        str += " 错误地址:" + this.sUrl + "\n";
        str += " 错误行数:" + this.sLine + "\n";
        str += "<=========调用堆栈=========>\n";
        var func = window.onerror.caller;
        var index = 1;
        while (func != null) {
            str += "第" + index + "个函数：" + func + "\n";
            str += "第" + index + "个函数：参数表：";
            for(var i=0;i<func.arguments.count;i++){
                str += func.arguments[i] + ",";
            }
            str += func;
            str += "\n===================\n";
            func = func.caller;
            index++;
        }
        return true;
    }
    message(sMessage){
        this.sMessage=sMessage;
    }
    set_line(sLine){
        this.sLine=sLine;
    }
}

module.exports = Error;


