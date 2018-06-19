import {Div} from './dragComponent/Div';
import {Button} from './dragComponent/Button';
import {Div2} from './dragComponent/Div2';
import {TableLayout} from  './dragComponent/TableLayout';
import {Tbody} from  './dragComponent/Tbody';
import {Tr} from  './dragComponent/Tr';
import {Td} from  './dragComponent/Td';
//控件类型字典
const DicComponentType = {
    BASECOMPONENT : "BASECOMPONENT", //基本控件
    CONTAINER : "CONTAINER", //容器
    PATTERNCOMPONENT :"PATTERNCOMPONENT" //模式组件
}


//组件列表
const DicComponents = {
    baseComponents:{
        Button:{
            //主键,唯一标志
            id:"Button",
            //组件类
            componentClass : Button,
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
            events:[],
            //是否在菜单中可见(有的是组件内部的组件,不可单独使用)
            visible:true
        }
    },
    containers:{
        Div:{
            id:"Div",
            componentClass : Div,
            componentType:DicComponentType.CONTAINER,
            name:"层",
            icon:"",
            previewImg:"",
            attributes:[
            {
                attributeId:"width",
            },{
                attributeId:"height",
            }],
            events:[],
            visible:true
        },
        TableLayout:{
            id:"TableLayout",
            componentClass : TableLayout,
            componentType:DicComponentType.CONTAINER,
            name:"表格布局",
            icon:"",
            previewImg:"",
            attributes:[
            {
                attributeId:"width",
            },{
                attributeId:"height",
            }],
            events:[],
            visible:true
        },
        Tbody:{            
            id:"Tbody",            
            componentClass : Tbody,            
            componentType:DicComponentType.CONTAINER,            
            name:"Tbody",           
            icon:"",         
            previewImg:"",           
            visible:false
          
        },
        Tr:{            
            id:"Tr",           
            componentClass : Tr,            
            componentType:DicComponentType.CONTAINER,
            name:"Tr",
            icon:"",
            previewImg:"",           
            visible:false
        },
        Td:{
            id:"Td",
            componentClass : Td,
            componentType:DicComponentType.CONTAINER,
            name:"Td",
            icon:"",
            previewImg:"",           
            visible:false
          
        }
        
    },
    patternComponents:{
        Div2:{
            id:"Div2",
            componentClass : Div2,
            componentType:DicComponentType.PATTERNCOMPONENT,
            name:"层",
            icon:"",
            previewImg:"",
            attributes:[],
            events:[],
            visible:true
        }
    }
}


const DicAttributes = [
    {
        id : "width",
        name:"宽度",
        nameEn:"width",
        type:"int",
        description:"宽度",
    },{
        id : "height",
        name:"高度",
        nameEn:"height",
        type:"int",
        description:"高度",
    }
]

const componentsMap = new Map();

Object.values(DicComponents.baseComponents).forEach(item => {
    componentsMap.set(item.id,item);
})
Object.values(DicComponents.containers).forEach(item => {
    componentsMap.set(item.id,item);
})
Object.values(DicComponents.patternComponents).forEach(item => {
    componentsMap.set(item.id,item);
})


export {
    DicComponentType as DicComponentType,
    DicComponents as DicComponents,
    componentsMap as componentsMap
};