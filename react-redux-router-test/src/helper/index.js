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

export{
    lowerDimension as lowerDimension

}
