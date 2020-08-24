import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { SidebarNav } from '../SidebarNav/SidebarNav'
import './Sidebar.css'
import { Important } from './Folder/Important'

export class Sidebar extends React.Component{
    render(){
        return(
            <div className='sidebar'>
                <SidebarNav />
                <Switch>
                    <Route 
                    path='/folder/folder.id'
                    component={Important}/>
                </Switch>
            </div>
        )
    }
}