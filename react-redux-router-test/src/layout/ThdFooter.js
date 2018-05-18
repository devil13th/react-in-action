import React from 'react';
import { Layout,Divider } from 'antd';


const { Footer } = Layout;




class ThdFooter extends React.Component{
    
    

    constructor(props){
        super(props);
        this.state = {
            current: 'mail',
        }
    } 
    
    handleClick(e){
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
   


    render(){
        

        const logoStl = {
            width: "240px",
            height: "46px",
            lineHeight:"46px",
            background: "rgba(255,255,255,.2)",  
            paddingLeft:"2em",
            fontSize:"1.5em",
            fontWeight:"bold",
            float: "left"
        }


        return (
            <Footer style={{borderTop:"1px solid #ddd",textAlign:"center",margin:"0px",background:"#eee",padding:"0px"}}>
                <Divider>footer</Divider>
            </Footer>
        )
    }
}

export default ThdFooter;
