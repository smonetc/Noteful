import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext';
import config from '../config'
// import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import './Notes.css'


class Note extends React.Component{
  static defaultProps ={
    onDeleteNote: () => {},
  }

  static contextType = NotefulContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render(){
    const { name, id, modified } = this.props
    return (
      // <NotefulContext.Consumer> 
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${id}`}>
              {name}
            </Link>
          </h2>
          <button 
          className='Note__delete' 
          type='button'
          onClick={this.handleClickDelete}
          >
            <FontAwesomeIcon icon='trash-alt' />
            {' '}
            remove
          </button>
          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified
              {' '}
              <span className='Date'>
                {modified}
                {/* {format(modified, 'Do MMM YYYY')} */}
              </span>
            </div>
          </div>
        </div>
      // </NotefulContext.Consumer>
      )
  }
}

Note.propTypes = {
  onDeleteNote: PropTypes.func,
  name: PropTypes.string,
  modified: PropTypes.number
}


export default Note;
                         
    