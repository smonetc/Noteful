import React from 'react'
import {Link} from 'react-router-dom'
import './Notes.css'


export class MainPageNotes extends React.Component{
    render(){
        return(
            <div>
                <div className='notes-item'>
                    {this.props.notes.map(note =>
                        <ul 
                        className='notes-list'
                        key={note.id}>
                            <li>
                                <Link 
                                to={`/note/${note.id}`}
                                className='link'>
                                {note.name}
                                </Link>
                            </li>
                            <li> 
                                Modified {note.modified}
                            </li>
                            <button>Remove</button>
                        </ul>
                    )} 
                </div>
            </div>
        )
    }
}