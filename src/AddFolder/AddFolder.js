import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulContext'
import config from '../config'
import PropTypes from 'prop-types'
import './AddFolder.css'


class AddFolder extends React.Component{

    static defaultProps = {
        history: {
          push: () => { },
        }
    }
      
    static contextType = NotefulContext;

    handleSubmit = (e) => {
    
        e.preventDefault()
        const folder = {
          name: e.target['folder-section'].value
        }

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
              'content-type': 'application/json',
            }
          })
          .then(foldersRes => {
            if (!foldersRes.ok)
                return foldersRes.json().then(e => Promise.reject(e)) //function that returns the Promise object that is rejected with a given reason.
            return foldersRes.json()
            })
            .then(folder => {
                this.context.addFolder(folder)
                this.props.history.push('/')
            })
        
        .catch(error => {
            console.error({error});
        }) 
    }


    render(){
        // const {folders: []} = this.context
        return(
            <div className="AddFolder">
                <h2>Create A Folder</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor='name'>
                            Name
                            </label>
                            <input type='text' id='name' name="folder-section" />
                        </div>
                        <div className='buttons'>
                            <button type='submit'>
                            Add folder
                            </button>
                        </div>
                </NotefulForm>
            </div>
        )
    }
}

AddFolder.propTypes = {
    name: PropTypes.string
}

export default AddFolder;