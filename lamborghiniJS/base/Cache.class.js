/**
 * 创建人：lhh
 * 创建日期:2017-1-5
 * 修改日期:2018-5-18
 * 名称：Cache类
 * 功能：缓存
 * 说明 :
 *        
 * note :
 * example:
 *
 * new Cache('mt11').find('jobId',1,function (index,id) {
		var data={
			"id":id,
			"jobId":id,
			"job":"程序员",
			"name":"李明",
			"addres":"雨花台区软件大道",
			"city":"南京",
			"sex":"男"
		};
		if(-1 === index){
			this.add(data);
		}else{
			this.update(index,data);
			text = this.get(index).name;
			this.remove(index);
			console.log(text);

		}
	});
 *
 *		
 * 
 */
const System =(typeof LAM3 !== 'undefined') ? LAM3 : require('./System');
const Component = require('./Component.class');
class Cache extends Component{
	constructor(name,expires){
		super();
        this.caches = [];
        this.name = name || 'cache';
        this.expires = System.isset(expires) && System.isNumber(expires) && (expires > 0) ? expires : 0;
        this.key = "";
        this.value = "";
	}
    isStorage(){}
    setItem(){return this;}
    getItem(){return this;}
    /**
     * @author lhh
     * 产品介绍：
     * 创建日期:2017-1-5
     * 修改日期:2018-12-12
     * 名称：find
     * 功能：
     * 说明：入口处,所有set,get,update,search,del 都在 callback 里操作;callback里this指的是Cache 实例化当前对象
     * 注意：
     * @param {String}key  		存储数据的标示符key
     * @param {String}value		存储数据的标示符value
     * @param {Function}callback
     * @returns {Cache|Object}
     */
    find(key,value,callback){
        this.key   = key.toString().trim();
        this.value = value.toString().trim();
        var index = this.getItem().exists(this.key,this.value);
        if(System.isFunction(callback)){
            callback.call(this,index,this.value);
            return this;
        }else{
            return {'index':index,'value':this.value};
        }
    }
    /**
     *
     * @param index
     */
    get(index){
        if(System.isset(index) && System.isNumeric(index)){
            return this.getItem().caches[index];
        }
    }

    /**
     * @author lhh
     * 产品介绍：
     * 创建日期:2017-1-5
     * 修改日期:2018-5-16
     * 名称：add
     * 功能：添加数据，可以设置一个有效期
     * 说明：
     * 注意：
     * @param {json}data
     * @param {timeStamp}expires 	NULL 失效期的时间戳
     * @returns {Cache}
     */
    add(data,expires){
        data[this.key] = this.value;
        data['expires'] = expires || this.expires;
        this.caches.push(data);
        this.setItem();
        return this;
    }
    set(data,expires){
        this.add(data,expires);
    }
    /**
     *
     * @param index
     * @param Obj
     * @returns {Cache}
     */
    update(index,Obj){
        this.caches[index] = Obj;
        this.setItem();
        return this;
    }
    /**
     * @author lhh
     * 产品介绍：
     * 创建日期:2017-1-5
     * 修改日期:2018-5-16
     * 名称：exists
     * 功能：检查数据是否存在，如果存在返回数据被存储在哪个数组的下标，不存在返回-1
     * 说明：
     * 注意：
     * @param {String}key
     * @param {String}value
     * @returns {number}
     */
    exists(key,value){
        key   = key   || this.key;
        value = value || this.value;
        var caches = this.caches;
        for(var i=0,len=caches.length;i<len;i++){
            if((key in caches[i]) && (value === caches[i][key])){
                var expires = caches[i].expires;
                if(System.isset(expires) && System.isNumber(expires) && expires !==0){
                    if(System.timestamp() >= expires){//当前时间大于等于设定时间
                        this.remove(i);
                        return -1;
                    }
                }
                return i;
            }
        }
        return -1;
    }
    clear(){
        this.caches = [];
        return this;
    }
    remove(index){
        if(System.isset(index) && System.isNumeric(index)){
            var caches = this.caches;
            if (index > -1 && index <= caches.length-1) {
                caches.removeAt(index);
                this.setItem();
            }
        }else{
            this.clear();
        }
        return this;
    }
}


module.exports = Cache;