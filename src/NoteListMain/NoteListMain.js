import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulContext';
import {getNotesForFolder} from '../Notes-Helper'
import PropTypes from 'prop-types'
import './NoteListMain.css'

class NoteListMain extends React.Component{

  static defaultProps = {
    match: {
      params: {}
    }
  };

  static contextType = NotefulContext;

  render(){
    const { folder_id } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folder_id) //folderId
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                title={note.title}  //name
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}

NoteListMain.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  modified: PropTypes.number,
}

export default NoteListMain;