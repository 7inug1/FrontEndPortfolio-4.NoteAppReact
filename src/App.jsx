import React, { Component } from 'react';
import './style.css';
import Form from "./Form.jsx";
import Note from "./Note.jsx";
import Tag from "./Tag.jsx";

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      // bootstrap
      show: false,
      setShow: false,
      
      // new note data
      newNoteTitle: "",
      newNoteTag: "",
      newNoteTags: [],
      newNoteContent: "",
      
      // notes array
      notes: [

        // {"title": "How to make a new note", "tag": ["note"], "content": "Fill out the form above to make a new note!"},
        // {"title": "make a table", "tag": ["recipe"], "content": "Put table boil it."}
        // {"title": "계란밥 만드는 법", "tag": ["recipe", "soup"], "content": "계란에 밥 비비기"}
        // {"title": "비빔밥 만드는 법", "tag": ["soup", "recipe"], "content": "밥 비비기"},
        // {"title": "How to study", "tag": ["recipe", "soup", "lifehack"], "content": "Just do it."},
        // {"title": "How to make a katsu", "tag": ["lifehack", "recipe", "soup"], "content": "Fry chicken or pork."},
        // {"title": "How to save money", "tag": ["lifehack"], "content": "Just save it."},
        // {"title": "What is life?", "tag": ["philosophy"], "content": "Life is something that has no meaning itself. You make of your own."}
      ],

      filteringTag: [], 
      filteredTags: [], 
      filteredNotes: [],

      // for creating buttons
      unduplicatedTagsArray: [],
      // currentlyClickedFilter: false
    }
    this.handleNewNoteTitleChange = this.handleNewNoteTitleChange.bind(this); 
    this.handleNewNoteTagChange = this.handleNewNoteTagChange.bind(this); 
    
    this.handleNewNoteContentChange = this.handleNewNoteContentChange.bind(this); 
    this.getFilteredTags = this.getFilteredTags.bind(this);
    this.getNotesByTags = this.getNotesByTags.bind(this);
    this.submitNewNote = this.submitNewNote.bind(this); 
    this.deleteIndividualNote = this.deleteIndividualNote.bind(this);
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
    console.log("this.state.notes: " + this.state.notes);
    console.log("this.state.notes.length: " + this.state.notes.length);
    let key = this.state.notes.length-1;
    let item = JSON.stringify(this.state.notes[key]);
    console.log("saveNotesToLocalStorage() item: " + item);
    localStorage.setItem(key, item);
  }

  retrieveNotesFromLocalStorage(){
    let tempNotes = [];
    for(let i = 0; i < localStorage.length; i++){
      let key = i;
      let retrievingData = JSON.parse(localStorage.getItem(key));
      console.log("retrievingData: " + retrievingData)
      // console.log("retrievingData: " + JSON.parse(retrievingData))
      tempNotes.push(retrievingData);
    }
    this.setState({
      notes: tempNotes
    })
  }
  // this.setState({
  //   notes: [...this.state.notes, { "title": this.state.newNoteTitle, "tag": this.state.newNoteTags, "content": this.state.newNoteContent}],
  //   newNoteTitle: "",
  //   newNoteTags: [],
  //   newNoteContent: ""
  // }, ()=>{
  //   this.saveNotesToLocalStorage(); //lawcal
  // });

  componentDidMount(){
    this.retrieveNotesFromLocalStorage(); //lawcal
    let totalTagsArray = this.state.notes.map((note)=>note.tag);
    let totalTagsArrayFlat = totalTagsArray.flat();
    // let tempNotes = 
    let tempFilteringTag = [undefined];
    this.setState({
      filteringTag: tempFilteringTag,
      unduplicatedTagsArray: [...new Set(totalTagsArrayFlat)],
    })
    
    this.getNotesByTags(!undefined); 
    
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.notes !== this.state.notes || prevState.filteredTags !== this.state.filteredTags ){
      // if(this.state.notes.length>0){
      let tempTagArray = this.state.notes.map((note)=>note.tag) // 1. get all notes' tag
      // }else{
      //   let tempTagArray=[];
      // }
      let tempTagArrayFlat = tempTagArray.flat() // 2. make #1 flat
      let tempTagArrayFlatUnduplicated = [...new Set(tempTagArrayFlat)] // 3. get #2 unduplicated

      this.setState({
        unduplicatedTagsArray: tempTagArrayFlatUnduplicated
      })
      
      this.getNotesByTags(!undefined); // 게시판에 노트 추가되는 것처럼 보이게
    }
  }

  deleteIndividualNote(event){
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
        notes: notesCopy
      })
    } 
    this.getNotesByTags(!undefined);
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
      this.setState({
        filteredTags: []
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
      // console.log("newNoteTags: " + "["+this.state.newNoteTags+"]");
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
      newNoteContent: event.target.value
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
    }, ()=>{
      this.saveNotesToLocalStorage(); //lawcal
    });
    event.target.reset();   
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
        <h1 id="nonDesktopMainHeading">React Note App</h1>
        <h1 id="desktopMainHeading">React Note App Portfolio</h1>
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

