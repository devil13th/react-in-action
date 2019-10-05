import React from 'react';
import { connect } from 'dva';
import NoteContentView from './view/NoteContentView';
class NoteContentViewRouter extends React.Component{
    constructor(props){
        super(props);
    }
    saveNoteContent = (content) => {
        this.props.dispatch({
            type:"modNoteListModel/saveModNoteContent",
            payload : {
                noteId:this.props.noteId,
                noteContent:content
            }
        })
    }
    render(){
        
        return(
            <NoteContentView
                text={this.props.text}
                noteId={this.props.noteId}
                saveNoteContent={this.saveNoteContent}
            ></NoteContentView>
        )
    }
}

export default connect(({noteListModel,loading }) => ({
    noteListModel,
    loading 
  }))(NoteContentViewRouter);