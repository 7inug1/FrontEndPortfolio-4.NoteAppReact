import React from 'react';

export default class Form extends React.Component{
  render(){
    return <> 
      {/* <h1 id="formHeading">Form</h1> */}
        <form id="form" name="form" onSubmit={this.props.submitNewNote}>
          {/* <fieldset> */}
          {/* <legend>New Note</legend> */}
            <label id="labelTitle">
            <span id="formTitle">Title:</span>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
              <input id="inputTitle" type="text" name="title" onChange={this.props.handleNewNoteTitleChange}/>
            </label><br/>

            <label id="labelTag">
            <span id="formTag">Tag:</span>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input id="inputTag" type="text" name="tag" onKeyUp={this.props.addTags} onChange={this.props.handleNewNoteTagChange} placeholder="Press shift or 'Add Tag' button to add tags one by one"/>
            <button id="addTagButton" onClick={(event)=>this.props.addTagsButton(event)}>Add Tag</button> 
            </label>

            <ul>
              {this.props.newNoteTags.map((newNoteTag, key)=>
                <li key={key}>
                  {/* <h1>key: {key}</h1> */}
                  <span>{newNoteTag}</span>
                  <button id="tagRemoveButton" onClick={(event)=>this.props.removeTags(event, key)}>❌</button>
                </li>
              )}
            </ul>

            <label id="labelContent">
            Content:&nbsp; 
              <textarea id="textareaContent" type="textarea" name="content" onChange={this.props.handleNewNoteContentChange} rows="4" cols="48"/>
            </label><br/><br/>

            <button id="submitButton">Submit</button>
            {/* </fieldset> */}
        </form>
      <br/>  
      </>;
    }
}
