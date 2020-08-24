import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import Header from './Header'
import STORE from './STORE'
import {findFolder,findNote,getNotesForFolder,} from './Notes-Helper'
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      notes: STORE.notes,
      folders:STORE.folders
    }
  }

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(STORE), 600);
}

renderNavRoutes() {
  const {notes, folders} = this.state;
  return (
    <>
      {['/', '/folder/:folderId'].map(path => (
        <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav
              folders={folders}
              notes={notes}
              {...routeProps}
              />
            )}
        />
        ))}
        <Route
            path="/note/:noteId"
            render={routeProps => {
                const {noteId} = routeProps.match.params;
                const note = findNote(notes, noteId) || {};
                const folder = findFolder(folders, note.folderId);
                return <NotePageNav {...routeProps} folder={folder} />;
            }}
      />
      <Route path="/add-folder" component={NotePageNav} />
      <Route path="/add-note" component={NotePageNav} />
    </>
  );
}

renderMainRoutes() {
  const {notes, folders} = this.state;
  return (
      <>
          {['/', '/folder/:folderId'].map(path => (
              <Route
                  exact
                  key={path}
                  path={path}
                  render={routeProps => {
                      const {folderId} = routeProps.match.params;
                      const notesForFolder = getNotesForFolder(
                          notes,
                          folderId
                      );
                      return (
                          <NoteListMain
                              {...routeProps}
                              notes={notesForFolder}
                          />
                      );
                  }}
              />
          ))}
          <Route
              path="/note/:noteId"
              render={routeProps => {
                  const {noteId} = routeProps.match.params;
                  const note = findNote(notes, noteId);
                  return <NotePageMain {...routeProps} note={note} />;
              }}
          />
      </>
  );
}

  render(){
    return(
      <div className="App">
        <nav className="App__nav">{this.renderNavRoutes()}</nav>
        <main className="App__main">{this.renderMainRoutes()}</main>
        <Header />
      </div>
    )
  }
}

export default App;


