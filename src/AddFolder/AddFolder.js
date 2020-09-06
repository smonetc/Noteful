import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulContext'
import config from '../config'
import PropTypes from 'prop-types'
import './AddFolder.css'
import NotefulError from '../NotefulError'
import ValidationError from '../ValidationError/ValidationError'


class AddFolder extends React.Component{

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
            touched:false
          },
          errorMessage: null
          
        }
    }

    static contextType = NotefulContext;

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
      }

    handleSubmit = (e) => {
    
        e.preventDefault()
        if (this.isNameValid()){
            const newfolder = {
                name: e.target['folder-section'].value
              }
      
              fetch(`${config.API_ENDPOINT}/folders`, {
                  method: 'POST',
                  body: JSON.stringify(newfolder),
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
    }

    // function will validate that the name is longer than 3 characters
   isNameValid = () => {
    const name = this.state.name.value.trim();
     if (name.length < 3) {
        this.setState({errorMessage: "Name must be at least 3 characters long"});
        return false;
    }
    return true;
}

    render(){
 
        return(
            <NotefulError>
                <div className="AddFolder">
                    <h2>Create A Folder</h2>
                    <NotefulForm onSubmit={this.handleSubmit}>
                            <div>
                                <label htmlFor='name'>
                                Name
                                </label>
                                <input 
                                type='text' 
                                id='name' 
                                name="folder-section" 
                                aria-required="true"
                                aria-label="Name"
                                onChange={e => this.updateName(e.target.value)}
                                required  //requires the user inputs a name
                                />
                            </div>
                            <div className='buttons'>
                                <button 
                                type='submit'
                                >
                                Add folder
                                </button>
                                {this.state.errorMessage && <ValidationError message={this.state.errorMessage}/>}
                            </div>
                    </NotefulForm>
                </div>
            </NotefulError>
        )
    }
}

AddFolder.propTypes = {
    history: PropTypes.object,
    name: PropTypes.string.isRequired
}

export default AddFolder;