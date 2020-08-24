import React from 'react'
import { MainPageNotes }  from './MainPageNotes'
import './Notes.css'


export class MainPage extends React.Component{
    static defaultProps = {
        notes: []
      };
    render(){
        const { notes } = this.props
        return(
            <div className='main'>
                <div className='container'>
                    <div className='notes-item'>
                        <MainPageNotes notes={this.props.notes} /> 
                    </div>
                </div>
            </div>
        )
    }
}

                         
    