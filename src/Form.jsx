import React, { Component } from 'react';

export default class Form extends React.Component{
  render(){
    return <> 
      {/* <h1 id="formHeading">Form</h1> */}
        <form id="form" name="form" onSubmit={this.props.submitNewNote}>
          <fieldset>
          <legend>New Note</legend>
            <label>
            Title:&nbsp; 
              <input type="text" name="title" size="66" onChange={this.props.handleNewNoteTitleChange}/>
            </label><br/>

            <label>
            Tag:&nbsp; 
              <input type="text" name="tag" size="55" onKeyUp={this.props.addTags} onChange={this.props.handleNewNoteTagChange} placeholder="Press shift or 'Add Tag' button to add tags one by one"/>
            <button onClick={(event)=>this.props.addTagsButton(event)}>Add Tag</button> 
            </label>

            <ul>
              {this.props.newNoteTags.map((newNoteTag, key)=>
                <li key={key}>
                  {/* <h1>key: {key}</h1> */}
                  <span>{newNoteTag}</span>
                  <button onClick={(event)=>this.props.removeTags(event, key)}>❌</button>
                </li>
              )}
            </ul>

            <label>
            Content:&nbsp; 
              <textarea type="textarea" name="content" onChange={this.props.handleNewNoteContentChange} rows="4" cols="47"/>
            </label><br/><br/>

            <button >Submit</button>
            </fieldset>
        </form>
      <br/>  
      </>;
    }
}
