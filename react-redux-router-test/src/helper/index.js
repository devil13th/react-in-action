/**
扁平化数据
data数据格式：

[
	{
		xx:xx,
		xx:xx,
		children:[
			{
				xxx:xxx,
				xxx:xxx,
				children:[...]
			},
		]
	},
	{
		xx:xx,
		xx:xx,
		children:[
			{
				xxx:xxx,
				xxx:xxx,
				children:[...]
			},
		]
	}
]
*/
const lowerDimension = (data,childrenProName,ary = []) => {
	data.map(item => {
		ary.push(item);
		if(item[childrenProName]){
			lowerDimension(item[childrenProName],childrenProName,ary);
		}		
	})
	return ary;
}



//此函数功能为汇总模块内部的state,对外(对整体的store)公开成一个对象,避免store的state第一层键太多不易于管理的现象
const makeReducer = (actionHandlers, initialState) => {
	return (state = initialState, action) => {
		const handler = actionHandlers[action.type];
		return handler ? handler(state, action) : state;
	};
};
  


const uuid = () => {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
	  s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";
   
	var uuid = s.join("");
	return uuid;
}


const jsonArrayUtil = {

	/*
	为某个节点创建路径
	@param idName : 属性名称
	@param jsonData : json数组
	@param childrenName : 对象的子对象数组的属性名称
	*/
	makePath :function (idName,jsonData,childrenName,path){
		
		for(var i = 0 , j = jsonData.length ; i < j ; i++){
			console.log("makePath [" + idName + ":" + jsonData[i][idName] + "]" );
			
			jsonData[i]["__path__"] = path+"--"+jsonData[i][idName];
			if(jsonData[i][childrenName] && jsonData[i][childrenName].length > 0){
				this.makePath(idName, jsonData[i][childrenName],childrenName,jsonData[i]["__path__"]);
			}
		}
	},
	/*
	查找某对象

	@param idName : 属性名称
	@param key : 值
	@param jsonData : json数组
	@param childrenName : 对象的子对象数组的属性名称

	查找[jsonData]数组及其中对象中属性名为[childrenName]的子对象中(递归) 属性名称为[idName]的值为[key]的对象

	*/
	findObj :function (idName,key,jsonData,childrenName){
		
		for(var i = 0 , j = jsonData.length ; i < j ; i++){
			//console.log("find node [" + idName + ":" + jsonData[i][idName] + "]" );
			if(jsonData[i][idName] === key){
				return jsonData[i];
			}else{
				if(jsonData[i][childrenName] && jsonData[i][childrenName].length > 0){
					var node = this.findObj(idName,key,jsonData[i][childrenName],childrenName);
					if(node){
						return node; 
					}
				}
			}
		}
	},

	/*
	新增对象

	@param idName : 属性名称
	@param key : 值
	@param jsonData : json数组
	@param childrenName : 对象的子对象数组的属性名称
	@param obj:新增的对象

	在[jsonData]数组及其中对象中属性名为[childrenName]的子对象中(递归) 属性名称为[idName]的值为[key]的对象的[childrenName]属性中插入[obj]对象

	*/
	addObj:function (idName,key,jsonData,childrenName,obj){
		var r = this.findObj(idName,key,jsonData,childrenName);
		if(!r[childrenName]){
			r[childrenName] = [];
		}
		r[childrenName].push(obj);
	},

	/*
	更新对象

	@param idName : 属性名称
	@param key : 值
	@param jsonData : json数组
	@param childrenName : 对象的子对象数组的属性名称
	@param obj:更新的对象

	在[jsonData]数组及其中对象中属性名为[childrenName]的子对象中(递归) 属性名称为[idName]的值为[key]的对象并将其更新为[obj]

	*/
	updateObj: function (idName,key,jsonData,childrenName,res){

		var r = this.findObj(idName,key,jsonData,childrenName);
		Object.entries(res).forEach(function(item,index){
			r[item[0]] = item[1];
		})
		//console.log(r);
	},



	/*
	查找某对象的父对象
	@param idName : 属性名称
	@param key : 值
	@param jsonData : json数组
	@param childrenName : 对象的子对象数组的属性名称
	在[jsonData]数组及其中对象中属性名为[childrenName]的子对象中(递归) 属性名称为[idName]的值为[key]的对象的父对象

	*/
	findObjParent : function (idName,key,jsonData,childrenName){
		//console.log(jsonData[idName] +"|"+key);
		if(jsonData[childrenName]){
			for(var i = 0 , j = jsonData[childrenName].length ; i < j ; i++){
				console.log("find parent node [" + idName + ":" + jsonData[childrenName][i][idName] + "]" );
				if(jsonData[childrenName][i][idName] === key){
					//console.log("匹配:" + jsonData[childrenName][i][idName])
					return jsonData;
				}else{
					if(jsonData[childrenName][i][childrenName] && jsonData[childrenName][i][childrenName].length > 0){
						var node = this.findObjParent(idName,key,jsonData[childrenName][i],childrenName)
						if(node){
							return node;
						}
					}
				}
			}
		}
	},

	/*
	删除某对象

	@param idName : 属性名称
	@param key : 值
	@param jsonData : json数组
	@param childrenName : 对象的子对象数组的属性名称

	删除 [jsonData]数组及其中对象中属性名为[childrenName]的子对象中(递归) 属性名称为[idName]的值为[key]的对象

	*/
	deleteObj : function (idName,key,jsonData,childrenName){
		var parentObj = this.findObjParent(idName,key,jsonData,childrenName);
		var newChildren = parentObj[childrenName].filter(function(item){
			return !(item[idName] === key);
		})
		parentObj[childrenName] = newChildren;
	},
	/*
	判断两个节点是否是父子关系(或者爷孙或更高)

	@param idName : 属性名称
	@param jsonData : json数组
	@param childrenName : 对象的子对象数组的属性名称
	@param key1 : 节点1key值
	@param key2 : 节点2key值
	
	*/
	hasParentRela : function (idName,jsonData,childrenName,key1,key2){
		this.makePath(idName,jsonData,childrenName,"root");
		//console.log(JSON.stringify(jsonData))
		var node1 = this.findObj(idName,key1,jsonData,childrenName);
		var node2 = this.findObj(idName,key2,jsonData,childrenName);
		//alert(node1);
		//alert(node2);
		if(!node1 || !node2){
			return false;
		}else{
			//console.log(node1.__path__)
			//console.log(node2.__path__)
			//alert(node2.__path__.indexOf(node1.__path__))
			return node2.__path__.indexOf(node1.__path__) > -1
		}
	}
}

export{
	lowerDimension as lowerDimension,
	uuid as uuid,
	jsonArrayUtil as jsonArrayUtil,
	makeReducer as makeReducer

}
