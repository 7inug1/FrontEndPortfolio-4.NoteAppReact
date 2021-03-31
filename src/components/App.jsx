import React, { Component } from 'react';
import './style.css';
import NewNoteForm from './NewNoteForm.jsx';
import Notes from './Notes.jsx';
import Tags from './Tags.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 1. NewNoteForm.jsx
      newNoteTitle: '',
      newNoteTag: '', // the one currently on input field
      newNoteContent: '',
      newNoteTags: [], // array that saves each tag through user pressing enter or clicking button

      // 2. Tags.jsx
      unduplicatedTagsArray: [], // array that contains unduplicated tags (used to make buttons for user to choose filter from)
      filteredTags: [], // array that contains tags to filter notes

      // 3. Notes.jsx
      notes: [
        {
          content: '위의 폼을 작성해 새 노트를 만들어보세요!',
          tag: ['knowhow', 'stickynote'],
          title: '고정 공지 노트',
        },
      ], // (entire) notes array
      filteredNotes: [], // array that contains notes based on 'filteredTags' above
    };
    // 1. NewNoteForm.jsx
    this.handleNewNoteTitleChange = this.handleNewNoteTitleChange.bind(this);
    this.handleNewNoteTagChange = this.handleNewNoteTagChange.bind(this);
    this.handleNewNoteContentChange = this.handleNewNoteContentChange.bind(
      this
    );

    this.addTagsButton = this.addTagsButton.bind(this);
    this.validateTags = this.validateTags.bind(this);
    this.removeTags = this.removeTags.bind(this);

    this.submitNewNote = this.submitNewNote.bind(this);
    this.validateForm = this.validateForm.bind(this);

    // 2. Tags.jsx
    this.getFilteredTags = this.getFilteredTags.bind(this);
    this.getNotesByTags = this.getNotesByTags.bind(this);
    this.removeFilteredTags = this.removeFilteredTags.bind(this);

    // 3. Notes.jsx
    this.deleteIndividualNote = this.deleteIndividualNote.bind(this);

    // 4. API-related
    this.saveNotesToLocalStorage = this.saveNotesToLocalStorage.bind(this);
    this.retrieveNotesFromLocalStorage = this.retrieveNotesFromLocalStorage.bind(
      this
    );
  }

  // 0. Lifecycle Methods
  componentDidMount() {
    if (this.state.notes.length > 0) {
      this.saveNotesToLocalStorage();
    }
    this.retrieveNotesFromLocalStorage(); //lawcal
    console.log('componentDidMount');
    let totalTagsArray = this.state.notes.map((note) => note.tag);
    let totalTagsArrayFlat = totalTagsArray.flat();
    // let tempNotes =
    // let tempFilteringTag = [undefined];
    this.setState({
      unduplicatedTagsArray: [...new Set(totalTagsArrayFlat)],
    });
    this.getNotesByTags(!undefined);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.notes !== this.state.notes ||
      prevState.filteredTags !== this.state.filteredTags
    ) {
      let tempTagArray = this.state.notes.map((note) => note.tag); // 1. get all notes' tag
      let tempTagArrayFlat = tempTagArray.flat(); // 2. make #1 flat
      let tempTagArrayFlatUnduplicated = [...new Set(tempTagArrayFlat)]; // 3. get #2 unduplicated

      this.setState({
        unduplicatedTagsArray: tempTagArrayFlatUnduplicated,
      });

      this.getNotesByTags(!undefined); // 게시판에 노트 추가되는 것처럼 보이게
    }
  }

  // 1. NewNoteForm.jsx
  handleNewNoteTitleChange(event) {
    this.setState({
      newNoteTitle: event.target.value,
    });
  }

  handleNewNoteTagChange(event) {
    this.setState({
      newNoteTag: event.target.value,
    });
  }

  handleNewNoteContentChange(event) {
    this.setState({
      newNoteContent: event.target.value,
    });
  }

  addTagsButton(event) {
    // has a default behaviour of acting as a submit button
    event.preventDefault();

    // Add a new tag only if there is any text in the text field
    if (this.state.newNoteTag) {
      let tempNewNoteTagsArray = this.state.newNoteTags;
      tempNewNoteTagsArray.push(this.state.newNoteTag);
      this.setState({
        newNoteTags: tempNewNoteTagsArray,
      });
    }
  }

  validateTags(event) {
    // if enter pressed, empty the input field
    if (window.event.keyCode === 13) {
      this.setState({
        newNoteTag: '',
      });
      event.target.value = '';
    }

    if (this.state.newNoteTags.length <= 0) {
      console.log('no tags yet');
    }
  }

  removeTags(event, key) {
    event.preventDefault();
    let tempNewNoteTagsArray = this.state.newNoteTags;
    tempNewNoteTagsArray.splice(key, 1);
    this.setState({
      newNoteTags: tempNewNoteTagsArray,
    });
  }

  submitNewNote(event) {
    event.preventDefault();

    let inputTag = document.querySelector('#inputTag');
    // inputTag.addEventListener('input', () => {
    if (inputTag.value === '') {
      console.log('1');
      inputTag.setCustomValidity('Enter at least a tag please!');
    }

    this.setState(
      {
        notes: [
          ...this.state.notes,
          {
            title: this.state.newNoteTitle,
            tag: this.state.newNoteTags,
            content: this.state.newNoteContent,
          },
        ],
        newNoteTitle: '',
        newNoteTags: [],
        newNoteContent: '',
      },
      () => {
        this.saveNotesToLocalStorage(); //lawcal
      }
    );
    event.target.reset();
  }

  validateForm(event) {
    // if(this.)
  }

  // 2. Tags.jsx
  getFilteredTags(tag) {
    let tempFilteredTags = [];
    tempFilteredTags.push(tag);
    let finalTags = [...this.state.filteredTags, tempFilteredTags];
    let finalTags2 = finalTags.flat();
    let finalTags3 = [...new Set(finalTags2)];

    this.setState({ filteredTags: finalTags3 });
    this.getNotesByTags(tag);
  }

  getNotesByTags(tag) {
    if (tag === undefined) {
      this.setState({
        filteredNotes: this.state.notes,
      });
      this.setState({
        filteredTags: [],
      });
    } else {
      let tempFilteredNotesArray = [];
      let checker = (arr, target) => target.every((item) => arr.includes(item));

      // 어려운 것
      for (let i = 0; i < this.state.notes.length; i++) {
        if (
          checker(this.state.notes[i].tag, this.state.filteredTags) === true
        ) {
          tempFilteredNotesArray.push(this.state.notes[i]);
        }
      }

      this.setState({
        filteredNotes: tempFilteredNotesArray,
      });
    }
  }

  removeFilteredTags(key) {
    let tempFilteredTagsArray = this.state.filteredTags;
    tempFilteredTagsArray.splice(key, 1);
    let tempFilteredNotesArray = [];
    let checker = (arr, target) => target.every((item) => arr.includes(item));

    this.state.notes.forEach((note) => {
      if (checker(note.tag, tempFilteredTagsArray) === true) {
        tempFilteredNotesArray.push(note);
      }
    });

    this.setState({
      filteredTags: tempFilteredTagsArray,
      filteredNotes: tempFilteredNotesArray,
    });
  }

  // 3. Notes.jsx
  deleteIndividualNote(event) {
    let key = event.target.id;
    console.log(event.target);
    console.log(key);
    let notesCopy = this.state.notes;
    if (window.confirm('정말 메모를 삭제하시겠습니까?')) {
      // 1. 잘 작동 안하는 localstorage 지우기
      // for(let i = 0; i < localStorage.length; i++){
      //   if(key === localStorage.getItem({i})){
      localStorage.removeItem(localStorage.key(localStorage.length - key - 1)); //lawcal // 문제
      //   }
      // }

      // 2. 잘 작동하는 notes[]
      notesCopy.splice(key, 1);
      this.setState({
        notes: notesCopy,
      });
    }
    this.getNotesByTags(!undefined);
  }

  // 4. API-related
  saveNotesToLocalStorage() {
    console.log('this.state.notes: ' + this.state.notes);
    console.log('this.state.notes.length: ' + this.state.notes.length);
    let key = this.state.notes.length - 1;
    let item = JSON.stringify(this.state.notes[key]);
    console.log('saveNotesToLocalStorage() item: ' + item);
    localStorage.setItem(key, item);
  }

  retrieveNotesFromLocalStorage() {
    let tempNotes = [];

    // localStorage.forEach(localStorageItem => {

    // })

    for (let i = 0; i < localStorage.length; i++) {
      let key = i;
      let retrievingData = JSON.parse(localStorage.getItem(key));
      console.log('retrievingData: ' + retrievingData);
      // console.log("retrievingData: " + JSON.parse(retrievingData))
      tempNotes.push(retrievingData);
    }

    this.setState({
      notes: tempNotes,
    });
  }
  // this.setState({
  //   notes: [...this.state.notes, { "title": this.state.newNoteTitle, "tag": this.state.newNoteTags, "content": this.state.newNoteContent}],
  //   newNoteTitle: "",
  //   newNoteTags: [],
  //   newNoteContent: ""
  // }, ()=>{
  //   this.saveNotesToLocalStorage(); //lawcal
  // });

  render() {
    return (
      <>
        <h1 id="nonDesktopMainHeading">React Note App</h1>
        <h1 id="desktopMainHeading">React Note App Portfolio</h1>
        <div id="grid">
          {/* 1. NewNoteForm.jsx */}
          <NewNoteForm
            newNoteTags={this.state.newNoteTags}
            newNoteContent={this.state.newNoteContent}
            validateForm={this.validateForm}
            submitNewNote={this.submitNewNote}
            handleNewNoteTitleChange={this.handleNewNoteTitleChange}
            validateTags={this.validateTags}
            addTagsButton={this.addTagsButton}
            handleNewNoteTagChange={this.handleNewNoteTagChange}
            handleNewNoteContentChange={this.handleNewNoteContentChange}
            removeTags={this.removeTags}
          />

          {/* 2. Tag.jsx */}
          <Tags
            filteredTags={this.state.filteredTags}
            unduplicatedTagsArray={this.state.unduplicatedTagsArray}
            getNotesByTags={this.getNotesByTags}
            removeFilteredTags={this.removeFilteredTags}
            getFilteredTags={this.getFilteredTags}
          />

          {/* 3. Note.jsx */}
          <Notes
            filteredNotes={this.state.filteredNotes}
            deleteIndividualNote={this.deleteIndividualNote}
          />
        </div>
        <footer className="footer">
          <p>&copy; 2021 Jinwook Shin</p>
        </footer>
      </>
    );
  }
}
