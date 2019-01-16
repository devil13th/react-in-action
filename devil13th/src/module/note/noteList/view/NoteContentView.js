import React from 'react';
import {Button} from 'antd';
class NoteContentView extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="noteContent">
                {this.props.data}
                <Button onClick={this.props.saveNoteContent}></Button>
            </div> 
        );
    }
}

export {NoteContentView}