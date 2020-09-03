import React from 'react'
import config from '../config'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'
import NotefulError from '../NotefulError'

class AddNote extends React.Component{
    static defaultProps = {
        history: {
            push: () => { },
        }
        
    }

    constructor(props) {
        super(props);
        this.state = {
          name: {
            value: '',
            touched: false
          },
          content: '',
          folderId: ''
        }
    }


    static contextType = NotefulContext;


    handleSubmit = (e) => {
        e.preventDefault()

        const getNote ={
            name: e.target['name-section'].value,
            content: e.target['content'].value,
            folderId: e.target['folder-select'].value,
            modified: new Date()
        }
    
        fetch(`${config.API_ENDPOINT}/notes`,{
           method:'POST',
           body: JSON.stringify(getNote),
           headers:{
               'content-type': 'application/json'
           }
            })
            .then(notesRes => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e)) //function that returns the Promise object that is rejected with a given reason.
                return notesRes.json()
            })
            .then(note => {
                this.context.addNote(note)
                this.props.history.push('/')
            })
        .catch(error => {
            console.log(error)
        })
    }

    validateName = () => {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return "Name is required";
        } else if (name.length < 3) {
          return "Name must be at least 3 characters long";
        }
    }

    render(){
        const { folders = [] } = this.context
        return(
            <div className="AddNote">
                <h2>Create A Note</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label htmlFor='name'>Name</label>
                        <input 
                        type='text' 
                        id='name' 
                        name='name-section' required />
                    </div>
                    <div className='field'>
                        <label htmlFor='content'>Content</label>
                        <textarea 
                        id='content' 
                        name='content'/>
                    </div>
                    <div className='field'>
                        <label htmlFor='folder-select'>Folder</label>
                        <select 
                        id='folder-select' 
                        name='folder-select'>
                            <option value={null}>...</option>
                            {folders.map( folder => 
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                            )}
                        </select>
                    </div>
                    <div className='buttons'>
                        <NotefulError>
                            <button 
                                type='submit'
                                to='/'
                                disabled={this.validateName}
                            >
                                Add Note
                            </button>
                        </NotefulError>
                    </div>
                </NotefulForm>
            </div>
        )
    }
}

AddNote.propTypes = {
history: PropTypes.object,
name: PropTypes.string.isRequired,
content: PropTypes.string,
folderId: PropTypes.number,
modified: PropTypes.number
}

export default AddNote;
