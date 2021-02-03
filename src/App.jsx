import React, { Component } from 'react';
import './style.css';
import Form from "./Form.jsx";
import Note from "./Note.jsx";
import Tag from "./Tag.jsx";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      key: [],
      data: [],

      show: false,
      setShow: false,
      
      newNoteTitle: "",
      newNoteTag: "",
      newNoteTags: [],
      newNoteContent: "",
      notes: [
        {"title": "How to make a new note", "tag": ["note"], "content": "Fill out the form above to make a new note!"}
        // {"title": "make a table", "tag": ["recipe"], "content": "Put table boil it."},
        // {"title": "계란밥 만드는 법", "tag": ["recipe", "soup"], "content": "계란에 밥 비비기"},
        // {"title": "비빔밥 만드는 법", "tag": ["soup", "recipe"], "content": "밥 비비기"},
        // {"title": "How to study", "tag": ["recipe", "soup", "lifehack"], "content": "Just do it."},
        // {"title": "How to make a katsu", "tag": ["lifehack", "recipe", "soup"], "content": "Fry chicken or pork."},
        // {"title": "How to save money", "tag": ["lifehack"], "content": "Just save it."},
        // {"title": "What is life?", "tag": ["philosophy"], "content": "Life is something that has no meaning itself. You make of your own."}
      ],
      filteringTag: [], 
      filteredTags: [], 
      filteredNotes: [],
      unduplicatedTagsArray: [],
      currentlyClickedFilter: false
    }
    this.handleNewNoteTitleChange = this.handleNewNoteTitleChange.bind(this); 
    this.handleNewNoteTagChange = this.handleNewNoteTagChange.bind(this); 
    
    this.handleNewNoteContentChange = this.handleNewNoteContentChange.bind(this); 
    this.getFilteredTags = this.getFilteredTags.bind(this);
    this.getNotesByTags = this.getNotesByTags.bind(this);
    this.submitNewNote = this.submitNewNote.bind(this); 
    this.addTags = this.addTags.bind(this); 
    this.addTagsButton = this.addTagsButton.bind(this); 
    this.removeFilteredTags = this.removeFilteredTags.bind(this);
    this.removeTags = this.removeTags.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.saveNotesToLocalStorage = this.saveNotesToLocalStorage.bind(this);
    this.retrieveNotesFromLocalStorage = this.retrieveNotesFromLocalStorage.bind(this);
  }
  
  saveNotesToLocalStorage(){
    for(let i = 0; i < this.state.notes.length; i++){
      let key = i;
      // key.toString();
      let item = JSON.stringify(this.state.notes[i]);
      // console.log("key: " + key)
      // console.log("item: " + (item))
      localStorage.setItem(key, item);
    }
    console.log("localStorage length: " + localStorage.length)
  }

  retrieveNotesFromLocalStorage(){
    let tempNotes = [];
    // let totalTagsArray = 
    // this.state.notes.map((note)=>
    //   tempNotes.push(note)
    // )
    console.log("localStorage length: " + localStorage.length)
    for(let i = 0; i < localStorage.length; i++){
      let key = i;
      let retrievingData = JSON.parse(localStorage.getItem(key));
      // console.log("retrievingData: " + retrievingData)
      // console.log("retrievingData: " + JSON.parse(retrievingData))
      tempNotes.push(retrievingData);
    }
    this.setState({
      notes: tempNotes
    })
  }

  componentDidMount(){
    this.saveNotesToLocalStorage();
    this.retrieveNotesFromLocalStorage();
    let totalTagsArray = this.state.notes.map((note)=>note.tag)
    let totalTagsArrayFlat = totalTagsArray.flat()
    let tempFilteringTag = [undefined];
    this.setState({
      filteringTag: tempFilteringTag,
      unduplicatedTagsArray: [...new Set(totalTagsArrayFlat)],
    })
    
    this.getNotesByTags(); 
    
  }

  getFilteredTags(tag){
    let tempFilteredTags = [];
    tempFilteredTags.push(tag)
    let finalTags = [...this.state.filteredTags, tempFilteredTags]
    let finalTags2 = finalTags.flat();
    let finalTags3 = [...new Set(finalTags2)]
    
    this.setState({filteredTags: finalTags3})
    this.getNotesByTags(tag)
  }

  getNotesByTags(tag){
    if(tag===undefined){
      this.setState({
        filteredNotes: this.state.notes 
      })
    }else{
      let tempFilteredNotesArray = [];
      let checker = (arr, target) => target.every(item => arr.includes(item));
      for(let i = 0; i < this.state.notes.length; i++){
        if (checker(this.state.notes[i].tag, this.state.filteredTags) === true ){
          tempFilteredNotesArray.push(this.state.notes[i])
        }
      }      
      this.setState({
        filteredNotes: tempFilteredNotesArray
      })
      
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.notes !== this.state.notes || prevState.filteredTags !== this.state.filteredTags ){
      let tempTagArray = this.state.notes.map((note)=>note.tag) // 1. get all notes' tag
      let tempTagArrayFlat = tempTagArray.flat() // 2. make #1 flat
      let tempTagArrayFlatUnduplicated = [...new Set(tempTagArrayFlat)] // 3. get #2 unduplicated

      this.setState({
        unduplicatedTagsArray: tempTagArrayFlatUnduplicated
      })
      
      this.getNotesByTags(!undefined);
      // this.saveNotesToLocalStorage();
      // this.handleShow();
    }
  }

  handleNewNoteTitleChange(event){
    this.setState({
      newNoteTitle: event.target.value
    });
  }

  addTags(event){
    event.preventDefault();
    // if(event === "button"){
      // alert("button clicked")
    // }
    if(event.key === "Shift" && event.target.value){
      console.log("added")
      let tempNewNoteTagsArray = this.state.newNoteTags;
      tempNewNoteTagsArray.push(event.target.value);

      this.setState({
        newNoteTags: tempNewNoteTagsArray
      });  
      console.log("newNoteTags: " + "["+this.state.newNoteTags+"]")
      event.target.value = "";
    } 
  }

  addTagsButton(event){
    event.preventDefault();

    let tempNewNoteTagsArray = this.state.newNoteTags;
    tempNewNoteTagsArray.push(this.state.newNoteTag);

    this.setState({
      newNoteTags: tempNewNoteTagsArray
    });  
    //   console.log("newNoteTags: " + "["+this.state.newNoteTags+"]")
    
    // event.target.value = "";
    // } 
  }

  handleNewNoteTagChange(event){
    this.setState({
      newNoteTag: event.target.value
    });
  }

  handleNewNoteContentChange(event){
    this.setState({
      newNoteTag: event.target.value
    });
  }

  removeTags(event, key){
    event.preventDefault();
    let tempNewNoteTagsArray = this.state.newNoteTags;
    tempNewNoteTagsArray.splice(key, 1)
    this.setState({
      newNoteTags: tempNewNoteTagsArray
    })
  }

  removeFilteredTags(key){
    let tempFilteredTagsArray = this.state.filteredTags
    tempFilteredTagsArray.splice(key, 1)
    let tempFilteredNotesArray = [];
    let checker = (arr, target) => target.every(item => arr.includes(item));
    for(let i = 0; i < this.state.notes.length; i++){
      if (checker(this.state.notes[i].tag, tempFilteredTagsArray) === true ){
        tempFilteredNotesArray.push(this.state.notes[i])
      }
    }

    this.setState({
      filteredTags: tempFilteredTagsArray,
      filteredNotes: tempFilteredNotesArray
    })
  }

  submitNewNote(event){
    event.preventDefault();
    // console.log(this.state.newNoteTitle);
    // console.log(this.state.newNoteTags);
    // console.log(this.state.newNoteContent);
    // if(this.state.newNoteTitle==="" || !this.state.newNoteTags==="" || !this.state.newNoteContent===""){
    //   alert("Please fill out the form for all the sections.")
    // }
    // else{

      this.setState({
        notes: [...this.state.notes, { "title": this.state.newNoteTitle, "tag": this.state.newNoteTags, "content": this.state.newNoteContent}],
        newNoteTitle: "",
        newNoteTags: [],
        newNoteContent: ""
      });
      event.target.reset();

      console.log(this.state.notes)
    // }
  }

  handleShow(){
    this.setState({
      show: true,
      setShow: true
    })
  }

  handleClose(){
    this.setState({
      show: false,
      setShow: false
    })
  }

  render() {
    return (
      <>  
        <h1 id="mainHeading">Note App</h1>
        <div id="grid">
          {/* 1. Form */}
          <Form 
            newNoteTags={this.state.newNoteTags}
            newNoteContent={this.state.newNoteContent}
            submitNewNote={this.submitNewNote} 
            handleNewNoteTitleChange={this.handleNewNoteTitleChange}
            addTags={this.addTags}
            addTagsButton={this.addTagsButton}
            handleNewNoteTagChange={this.handleNewNoteTagChange}
            handleNewNoteContentChange={this.handleNewNoteContentChange}
            removeTags={this.removeTags}
          />
        
          {/* 2. Tag */}
          <Tag
            filteredTags={this.state.filteredTags}
            unduplicatedTagsArray={this.state.unduplicatedTagsArray}
            getNotesByTags={this.getNotesByTags}
            removeFilteredTags={this.removeFilteredTags}
            getFilteredTags={this.getFilteredTags}
          />

          {/* 3. Note section */}
          <Note 
            filteredNotes={this.state.filteredNotes}
            show={this.state.show}
            setShow={this.state.setShow}
            handleShow={this.handleShow}
            handleClose={this.handleClose}
          />
        </div>
      </>
    );
  }
}

