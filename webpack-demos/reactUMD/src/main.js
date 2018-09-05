
class MyApp extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (

            <div>
                <h1>Hello React</h1>
                <Button type="primary">Primary</Button>
            </div>
        )
    }
}



ReactDOM.render(<MyApp/>,document.getElementById("app"));