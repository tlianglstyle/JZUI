exports.Load =function(){
	//------------------------------一维数组-----------------------------------
	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) return i;
		}
		return -1;
	};
	Array.prototype.mergeArray = function(newArr) {
		var arr = this.concat();
		for(var i=0;i<newArr.length;i++){
			arr.indexOf(newArr[i]) === -1 ? arr.push(newArr[i]) : 0;
		}
		return arr;
	};
	Array.prototype.removeByIndex = function(dx) 
	{ 
	    if(isNaN(dx)||dx>this.length){return false;} 
	    this.splice(dx,1); 
		return this;
	}
	Array.prototype.removeByValue = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
		return this;
	}; 
	//删除普通数组中的多个值
	//传入一个包含多个值的数组
	Array.prototype.removeByValues = function(delArr) {
		for (var a in delArr){
			this.removeByValue(delArr[a]);
		}
		return this;
	};
	//判断数组是否包含另一个数组的所有元素
	Array.prototype.isContains = function(newArr) {
		var a = this;
	    if(!(a instanceof Array) || !(newArr instanceof Array)) return false;
	    if(a.length < newArr.length) return false;
		    var aStr = a;
		    for(var i = 0, len = newArr.length; i < len; i++){
		       if(aStr.indexOf(newArr[i]) == -1) return false;
		    }
		return true;
	}
	//------------------------------对象数组-----------------------------------
	Array.prototype.removeByKey = function(key,value) {
		for(var i=0;i<this.length;i++){
			if(this[i][key]==value){
				this.splice(i, 1);	
			}
		}
		return this;
	};
	//获得对象数组的某个键的集合
	Array.prototype.getKeys = function(key) {
	    return this.map(function(item) {
	        return item[key];
	    });
	};
	//获得对象数组中指定键集的集合
	//传入一个包含多个键的数组 
	//orderByKeys:按照keyArr排序
	//callback:对象操作
	Array.prototype.getByKeys = function(keyName,keyArr,orderByKeys,callback) {
		if(orderByKeys !=undefined){
			var newArr = [];
			for(var i=0;i<keyArr.length;i++){
				for(var j=0;j<this.length;j++){
					if(this[j][keyName]==keyArr[i] && this[j]['ArrayPush']==undefined){
						if(callback!=undefined){
							newArr.push(callback(this[j],newArr));	
						}else{
							newArr.push(this[j]);	
						}
						this[j]['ArrayPush']=1;
					}
				}
			}
			return newArr;
		}else{
			var newArr = [];
			for(var i=0;i<this.length;i++){
				if(keyArr.indexOf(this[i][keyName])>=0){ 
					newArr.push(this[i]);
				}
			}
			return newArr;
		}
	};
	//删除对象数组中的多个值
	//传入一个包含多个键的数组
	Array.prototype.removeByKeys = function(key,delArr) {
		for (var a in delArr){
			this.removeByKey(key,delArr[a]);
		}
		return this;
	};
	
	String.prototype.urlRandom = function() {
		return this+(this.indexOf('?')>0?'&':'?')+'randomUrl='+Math.random();
	};
}