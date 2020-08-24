import React from 'react';
import {Route, Switch,Link} from 'react-router-dom'
import './App.css';
import Header from './Header'
import STORE from './STORE'
import { Sidebar } from './Sidebar/Sidebar';
import { MainPage } from './MainPage/MainPage';
import {findFolder,findNote,getNotesForFolder,countNotesForFolder} from './Notes-Helper'

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



  render(){

    return(
      <div className="App">
        <Sidebar />
        <MainPage 
         notes={this.state.notes}/>
         <Header />
      </div>
    )
  }
}

export default App;
