import {drawComponent as drawDiv} from './dragComponent/Div';

//控件类型字典
const DicComponentType = {
    BASECOMPONENT : "BASECOMPONENT", //基本控件
    CONTAINER : "CONTAINER", //容器
    PATTERNCOMPONENT :"PATTERNCOMPONENT" //模式组件
}


//组件列表
const DicComponents = {
    baseComponents:{
        div:{
            //主键,唯一标志
            id:"div",
            //组件分类
            componentType:DicComponentType.CONTAINER,
            //中文名称
            name:"层",
            //菜单图标
            icon:"",
            //预览图
            previewImg:"",
            //组件属性
            attributes:[],
            //组件事件
            events:[],
            drawMethod : drawDiv    
        }
    },
    containers:{
        button:{
            //主键,唯一标志
            id:"button",
            //组件分类
            componentType:DicComponentType.BASECOMPONENT,
            //中文名称
            name:"按钮",
            //菜单图标
            icon:"",
            //预览图
            previewImg:"",
            //组件属性
            attributes:[],
            //组件事件
            events:[]
            //绘制函数
            
        }
    }
}

const componentsMap = new Map();

Object.values(DicComponents.baseComponents).forEach(item => {
    componentsMap.set(item.id,item);
})

Object.values(DicComponents.containers).forEach(item => {
    componentsMap.set(item.id,item);
})


export {
    DicComponentType as DicComponentType,
    DicComponents as DicComponents,
    componentsMap as componentsMap
};