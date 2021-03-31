import React from 'react';

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="form" name="form" onSubmit={this.props.submitNewNote}>
          <label id="labelTitle">
            <input
              id="inputTitle"
              type="text"
              name="title"
              required="required"
              placeholder="제목 입력"
              onChange={this.props.handleNewNoteTitleChange}
            />
          </label>

          <label id="labelTag">
            <div className="inputTagSectionGrid">
              <input
                id="inputTag"
                type="text"
                name="tag"
                placeholder="버튼이나 엔터키로 태그 추가"
                onKeyUp={this.props.validateTags}
                onChange={this.props.handleNewNoteTagChange}
              />
              <button
                id="addTagButton"
                onClick={(event) => this.props.addTagsButton(event)}
              >
                +
              </button>
            </div>
          </label>

          <div className="listContainer">
            <ul>
              {this.props.newNoteTags.map((newNoteTag, key) => (
                <li key={key}>
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
          </div>

          <label id="labelContent">
            <textarea
              id="textareaContent"
              type="textarea"
              name="content"
              rows="4"
              cols="48"
              required="required"
              placeholder="내용을 입력하세요"
              onChange={this.props.handleNewNoteContentChange}
            />
          </label>
          <button id="submitButton">Submit</button>
        </form>
        <br />
      </>
    );
  }
}
