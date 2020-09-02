import React from 'react'
import config from '../config'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulContext'

class AddNote extends React.Component{
    static defaultProps = {
            addNote: () => { },
        
    }

    static contextType = NotefulContext

    handleNoteSubmit = (e) => {
        e.preventDefault()

        const getNote ={
            name: e.target['name-section'].value,
            content: e.target['content'].value,
            folderId: e.target['folder-select'].value,
            modified: new Date()
        }

        fetch(`${config.API_ENDPOINT}/notes/note`,{
           method:'POST',
           headers:{
               'content-type': 'application/json'
           }, 
           body: JSON.stringify(getNote),
        })
        .then(notesRes => {
            if (!notesRes.ok)
                return notesRes.json().then(e => Promise.reject(e)) //function that returns the Promise object that is rejected with a given reason.
            return notesRes.json()
        })
        .then(note => { 
            this.context.addNote(note)
            this.props.history.push(`/folder/${note.folderId}`)
        })
        .catch(error => {
            console.log(error)
        })
    }



    render(){
        const { folders = [] } = this.context
        return(
            <div className="AddNote">
                <h2>Create A Note</h2>
                <NotefulForm>
                    <div className='field'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='name-section' required/>
                    </div>
                    <div className='field'>
                        <label htmlFor='content'>Content</label>
                        <textarea id='content'/>
                    </div>
                    <div className='field'>
                        <label htmlFor='folder-select'>Folder</label>
                        <select id='folder-select' name='folder-select'>
                            <option value={null}>...</option>
                            {folders.map( folder => 
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                            )}
                        </select>
                    </div>
                    <div className='buttons'>
                        <button type='submit'>
                        Add Note
                        </button>
                    </div>
                </NotefulForm>
            </div>
        )
    }
}

export default AddNote;
