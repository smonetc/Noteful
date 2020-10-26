import React, { Fragment }  from 'react'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext';
import {findNote} from '../Notes-Helper'
import './NotePageMain.css'
import PropTypes from 'prop-types'

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };

  static contextType = NotefulContext;

  handleDeleteNote = note_id => {
    this.props.history.push(`/`)
  }

  render(){
    const { notes=[] } = this.context
    const { note_id } = this.props.match.params //noteId
    const note = findNote(notes, note_id) || { content: '' } //noteId
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          title={note.title}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          <Fragment>
            {note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </Fragment>
        </div>
      </section>
    )
  }

}

NotePageMain.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  modified: PropTypes.number,
  onDeleteNote: PropTypes.func
}

export default NotePageMain;


