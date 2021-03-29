import React from 'react';

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="form" name="form" onSubmit={this.props.submitNewNote}>
          {/* <fieldset> */}
          {/* <legend>New Note</legend> */}
          <h2 id="newNoteTitle">New Note</h2>
          <label id="labelTitle">
            <span id="formTitle">Title: </span>
            <input
              id="inputTitle"
              type="text"
              name="title"
              required="required"
              placeholder="Enter title of the note"
              onChange={this.props.handleNewNoteTitleChange}
            />
          </label>

          <label id="labelTag">
            <span id="formTag">Tag: </span>
            <input
              id="inputTag"
              type="text"
              name="tag"
              placeholder="Enter tags by pressing enter or clicking button"
              onKeyUp={this.props.validateTags}
              onChange={this.props.handleNewNoteTagChange}
            />
            <button
              id="addTagButton"
              onClick={(event) => this.props.addTagsButton(event)}
            >
              +
            </button>
          </label>

          <ul>
            {this.props.newNoteTags.map((newNoteTag, key) => (
              <li key={key}>
                {/* <h1>key: {key}</h1> */}
                <span>{newNoteTag}</span>
                <button
                  id="tagRemoveButton"
                  onClick={(event) => this.props.removeTags(event, key)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <label id="labelContent">
            <span id="formContent">Content:</span>
            <textarea
              id="textareaContent"
              type="textarea"
              name="content"
              rows="4"
              cols="48"
              required="required"
              placeholder="Enter content of the note"
              onChange={this.props.handleNewNoteContentChange}
            />
          </label>

          <button id="submitButton">Submit</button>
          {/* </fieldset> */}
        </form>
        <br />
      </>
    );
  }
}
