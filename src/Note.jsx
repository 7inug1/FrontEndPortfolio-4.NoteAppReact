import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Modal } from 'react-bootstrap';

export default class Note extends React.Component {
  render() {
    return <>
      {/* <h1 id="notesHeading">Notes</h1> */}
      <div id="notes">
        <div id="notes-container">
        {/* <h1>Notes</h1> */}
        {this.props.filteredNotes.map((filteredNote, key)=>
            <div className="individualNote" key={key} id={key}>
            {/* <div className="individualNote" key={key} onClick={this.props.handleShow}> */}
              <h3 className="individualNoteTitle"> 
                {key}. {filteredNote.title} 
              </h3>
              <button className="individualNoteDeleteButton" key={key} id={key} onClick={this.props.deleteIndividualNote}>X</button>
              <hr/>
              <div className="individualNoteContent"> 
                {filteredNote.content} 
              </div>
              {/* <hr/> */}
              <div className="individualNoteTag"> 
                  {filteredNote.tag.map((tag, key)=>
                    <li key={key}>{tag}</li>
                  )} 
              </div>
            </div>

            
        )}
          </div>
        </div>
    </>
  }
}

