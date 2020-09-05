import React from 'react'

class NotefulError extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
      }

    componentDidCatch(error, errorInfo) {
   
    logErrorToMyService(error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {      
            return (
            <h2>Could not display this screen.</h2>
            );
        }
        return this.props.children;
    } 
}

export default NotefulError;