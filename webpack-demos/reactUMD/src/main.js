
class MyApp extends React.Component{
    constructor(props){
        super(props);
    }

    onck = () => {
        alert("Hello User")
    }

    render(){
        return (

            <div>
                <h1>Hello React</h1>
                <antd.Button type="primary" onClick={this.onck}>Primary</antd.Button>
            </div>
        )
    }
}



ReactDOM.render(<MyApp/>,document.getElementById("app"));