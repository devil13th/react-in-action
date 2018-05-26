import React from 'react';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';
class AjaxExample extends React.Component{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state={url : "/data.json"};
    }

    componentDidMount(){
        //var url = this.refs.ajaxUrl;
        
        this.props.onClick();
    }

    onClick(){
        //console.log("XXXXXXXXXXXXXXXXX")
        //console.log(this.refs)
       
        //alert(ReactDOM.findDOMNode(this.refs.ajaxUrl).value);
        //this.props.onClick(ReactDOM.findDOMNode(this.refs.ajaxUrl).value);
        this.props.onClick(this.state.url);
    }

    onChange(e){
        this.setState({
            url : e.target.value
        });
    }

    render(){

        var dom = [];
       
        if(this.props.msg.msg=="success"){
            dom.push(
                <div>
                    name:{this.props.msg.ajaxData.name}<br/>
                    age:{this.props.msg.ajaxData.age}
                </div>
            );
        }else if(this.props.msg.msg=="error"){
            dom.push( <div>error!</div>);
        }else if(this.props.msg.msg=="loading"){
            dom.push( <div>正在读取数据</div>);
        }
        dom.push(<input type="text" value={this.state.url} onChange={this.onChange}/> )
        dom.push(<input type="button" value="获取数据" onClick={this.onClick}/>)
        return dom;
        
/*
        return (
            <div>111</div>
        )*/
    }
}


const mapStateToProps=function(state,ownerProps){
    return{
        msg:state.msg
    }
}

const mapDispatchToProps=function(dispatch,ownerProps){
    return{
        
        onClick : (url)=>{
            //alert(url);
            //发送异步请求,dispatch的参数是一个函数
            dispatch(actionCreator(url))
        }
    }
}


//------------action type ---------------
const LOAD_MORE_WORK = "LOAD_MORE_WORK";







// ----------sync action  ------------------
/**
 * 异步action不是一个对象，而是一个函数，通过中间件redux-thunk的时候会检测，如果action是对象则放行,如果是函数则进行执行
 */
const actionCreator = function(url="/data.json"){
    return (dispatch) => {
    console.log("======== run sync request =======");
    /* TODO: 请暂时无视我如此拙劣的dispatch行为 */
    /* 1. fetch之前，可以先发个pending的action */
    dispatch({
      type: LOAD_MORE_WORK,
      msg: 'pending',
    });
    fetch(url).then(resp => {
        // console.log('[resp]', resp.status);
      if (resp.status === 200) return resp.json();
      throw new Error('not 200 this time'); // 美滴很
    }).then(json => {
        console.log("-------====-=-=-=-=-=-=-=")
        console.log(json);
      /* 2. 异步结束了，发结果action */
      dispatch({
        type: "LOAD_SUCCESS",
        ajaxData: json,
      });
    }).catch(error => {
      /* 3. 倒霉催的，发报错action */
      dispatch({
        type: "LOAD_FAILURE",
        msg: error,
      });
    });
  };
}
   
  // ------------------ reducer  -------------------
  const msgReducer = function(state={msg:"loading"},action){
    switch(action.type){
        case "LOAD_MORE_WORK" : {
            return {msg:"loading"};
        }
        case "LOAD_SUCCESS" : {
            return {msg:"success",ajaxData:action.ajaxData}
        }
        case "LOAD_FAILURE" : {
            return {msg:"error"}
        }
        default : {
            return state;
        }
    }
  }



  
export  default connect(mapStateToProps,mapDispatchToProps)(AjaxExample) ;

export{
    msgReducer as msgReducer
}
