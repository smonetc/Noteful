import React from 'react'
import {Link} from 'react-router-dom'
import './SidebarNav.css'
import { AddFolder } from '../AddFolder'

export class SidebarNav extends React.Component{
    render(){
        return(
            <nav>
                <Link 
                to='/folder/folder.id'
                className='navbar-items'>
                    Important
                </Link>
                <Link 
                to='/folder/folder.id'
                className='navbar-items'>
                    Super
                </Link>
                <Link 
                to='/folder/folder.id'
                className='navbar-items'>
                    Important
                </Link>
                <AddFolder />
            </nav>
        )
    }
}