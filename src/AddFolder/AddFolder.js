import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulContext'
import config from '../config'
import './AddFolder.css'


class AddFolder extends React.Component{

    static defaultProps = {
        history: {
          push: () => { },
        }
    }
      
    static contextType = NotefulContext;

    handleFolderSubmit = (e) => {

        e.preventDefault()
        const folder = {
          name: e.target['folder-section'].value
        }

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(folder),
          })
          .then(foldersRes => {
            if (!foldersRes.ok)
                return foldersRes.json().then(e => Promise.reject(e)) //function that returns the Promise object that is rejected with a given reason.
            return foldersRes.json()
        })
        .then(folder => {
            this.context.addFolder(folder)
            this.props.history.push(`/folder/${folder.id}`)
          })
        .catch(error => {
            console.error({error});
        }); 
    }


    render(){
        return(
            <div className="AddFolder">
                <h2>Create A Folder</h2>
                <NotefulForm onSubmit={this.handleFolderSubmit}>
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

export default AddFolder;