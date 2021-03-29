import React from 'react';

export default class Note extends React.Component {
  render() {
    return (
      <>
        <div id="notes">
          <div id="notes-container">
            {/* Go through 'notes' array to create individual note with each index */}
            {this.props.filteredNotes.map((filteredNote, key) => (
              <div className="individualNote" key={key} id={key}>
                {/* 1. Note Title */}
                <h3 className="individualNoteTitle">
                  {key}. {filteredNote.title}
                </h3>

                {/* 2. Note Delete Button */}
                <button
                  className="individualNoteDeleteButton"
                  key={key}
                  id={key}
                  onClick={this.props.deleteIndividualNote}
                >
                  X
                </button>
                <hr />

                {/* 3. Note Content */}
                <div className="individualNoteContent">
                  {filteredNote.content}
                </div>

                {/* 4. Note Tag */}
                <div className="individualNoteTag">
                  Tag:
                  {filteredNote.tag.map((tag, key) => (
                    <li key={key}>{tag}</li>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
