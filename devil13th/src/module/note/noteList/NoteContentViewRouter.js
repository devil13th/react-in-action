import React from 'react';
import { connect } from 'dva';
import {NoteContentView} from './view/NoteContentView';
class NoteContentViewRouter extends React.Component{
    constructor(props){
        super(props);
    }
    saveNoteContent = () => {
        alert(this.props.noteId)
    }
    render(){
        return(
            <NoteContentView
                data={this.props.data}
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