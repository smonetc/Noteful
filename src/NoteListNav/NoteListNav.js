import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import './NoteListNav.css'
import {countNotesForFolder} from '../Notes-Helper'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types'

class NoteListNav extends React.Component{
static defaultProps = {
    folders: []
  };

  static contextType = NotefulContext;

  render(){
    const {folders=[], notes= []} = this.context;

    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'> 
                  {countNotesForFolder(notes, folder.id)} 
                </span>
                {folder.title}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'> 
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
    
  }

NoteListNav.propTypes = {
  folders: PropTypes.array
}
  
export default NoteListNav;