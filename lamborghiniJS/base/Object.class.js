/**
 * @author：lhh
 * 创建日期:2015-3-20
 * 修改日期:2018-11-23
 * 名称：Object类
 * 功能：服务于派生类生成hashCode
 * 标准 :
 * 说明 :
 *
 * note :
 *
 *
 *
 */
const System =(typeof LAM3 !== 'undefined') ? LAM3 : require('./System');
//自增长数字
var id = 0;
class Object{


    constructor() {
        this._className = "Object";
		this._disposed = false;
		this._id = null;
        this._disposed=true;
        if(!(System.app instanceof Object)){
            System.app=this;
            System.each(System.components,function(name,value){
                if(name in System.app){return true;}
                if(System.isFunction(value)){
                    System['app'][name] = value.call(System.app,System);
                }
            });
        }
        this._hashCode=Object.generate();
    }
    getDisposed(){
        return this._disposed;
    }
    /**
     *
     * @returns {*}
     */
    hashCode(){
        return this._hashCode;
    }
    getId(){
        return this._id;
    }
    equals(o){
        if(!o._hashCode) {Object.toHashCode(o);}
        return (this._hashCode === o._hashCode);
    }
    setId(v){
        this._id=v;
    }
    getUserData(){
        return this._userData;
    }
    setUserData(v){
        this._userData=v;
    }
    toHashCode(){
        return Object.toHashCode(this);
    }
    dispose(){
        this._disposed=true;
        delete this._userData;
    }
    toString(){
        if(this._className)
            return"[object "+this._className+"]";
        return"[object Object]";
    }
    getProperty(sPropertyName){
        var getterName="get"+sPropertyName.charAt(0).toUpperCase()+sPropertyName.substr(1);
        if(System.isFunction(this[getterName]))
            return this[getterName]();
        throw new Error("No such property, "+sPropertyName);
    }
    setProperty(sPropertyName,oValue){
        var setterName="set"+sPropertyName.charAt(0).toUpperCase()+sPropertyName.substr(1);
        if(System.isFunction(this[setterName]))
            this[setterName](oValue);
        else throw new Error("No such property, "+sPropertyName);
    }

    static generate(){
        return this._hashCodePrefix+Math.round(Math.random()*System.random)+Object._hashCodeCounter++;
    }
    static toHashCode(o){
        if(o._hashCode!=null)
            return o._hashCode;
        return o._hashCode=this.generate();
    };

    static g_key_id(){
    	return '_'+id++;
    }

}


Object._hashCodeCounter=0;
Object. _hashCodePrefix='hc'+System.timestamp();
//节点元素唯一标示符
Object.key = 'node-id';


module.exports = Object;
