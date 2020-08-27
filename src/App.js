import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import Header from './Header'
// import STORE from './STORE'

import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import NotefulContext from './NotefulContext';
import config from './config';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      notes: [],
      folders:[]
    }
  }

  setNotes = notes => {
    this.setState({
      notes,
      error: null,
    })
  }

  setFolders = folders => {
    this.setState({
      folders,
      error: null,
    })
  }

  componentDidMount() {
    // fake date loading from API call
    // setTimeout(() => this.setState(STORE), 600);
    // Promise.all([
    //   fetch(config.API_folders),
    //   fetch(config.API_notes) ],
    //   {
    //     method: 'GET',
    //     headers: {
    //       'content-type': 'application/json',
    //     }
    //   })        
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
  //     .then((results) => 
  //       Promise.all(results.map(r => r.text()))
  //     )
  //     .then(this.setNotes, this.setFolders)
  //     .catch(error => this.setState({ error }))
  // }
  .then(([notesRes, foldersRes]) => {
    if (!notesRes.ok)
        return notesRes.json().then(e => Promise.reject(e));
    if (!foldersRes.ok)
        return foldersRes.json().then(e => Promise.reject(e));

    return Promise.all([notesRes.json(), foldersRes.json()]);
})
.then(([notes, folders]) => {
    this.setState({notes, folders});
})
.catch(error => {
    console.error({error});
});
}

renderNavRoutes() {
  // const {notes, folders} = this.context;
  return (
    <>
      {['/', '/folder/:folderId'].map(path => (
        <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
        />
        ))}
        <Route
            path="/note/:noteId"
            component={NotePageNav}
      />
      <Route path="/add-folder" 
      component={NotePageNav} />

      <Route path="/add-note" 
      component={NotePageNav} />
    </>
  );
}

renderMainRoutes() {
  // const {notes, folders} = this.context;
  return (
      <>
          {['/', '/folder/:folderId'].map(path => (
              <Route
                  exact
                  key={path}
                  path={path}
                  component={NoteListMain}
              />
          ))}
          <Route
              path="/note/:noteId"
             component={NotePageMain}
          />
      </>
  );
}

deleteNote = noteId => {
  // console.log(noteId)
  // const newNotes = this.state.notes.filter(note =>
  // note.id !== noteId
  // )
  this.setState({
    notes: this.state.notes.filter(note => note.id !== noteId)
  })
};

  render(){
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      }
    return(
      <div className="App">
        <NotefulContext.Provider value={contextValue}>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <main className="App__main">{this.renderMainRoutes()}</main>
          <Header />
        </NotefulContext.Provider>
      </div>
    )
  }
}

export default App;


