import React from 'react';
import Axios from 'axios';


class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        department: ''
    }

   handleChanges = (event) => {
       this.setState({[event.target.name]: event.target.value})
   }

   handleSubmit = (event) => {
       event.preventDefault()
       const endpoint = 'http://localhost:4000/register'
       Axios
       .post(endpoint, this.state)
       .then(res => {
           this.props.history.push('/login')
       })
       .catch(error => {
           console.log(error);
       })
   }
    

 render() {

   return (

    <div className="input-field">
    <form onSubmit={this.handleSubmit}>
        <div><label htmlFor="username"></label><input  onChange={this.handleChanges} id="username" name="username" placeholder="username" value={this.state.username} type="text"/></div>
        <div><label htmlFor="password"></label><input onChange={this.handleChanges} id="password" name="password" placeholder="password" value={this.state.password} type="password"/></div>
        <div><label htmlFor="department"></label><input  onChange={this.handleChanges} id="department" name="department" placeholder="department" value={this.state.department} type="text"/></div>
        <div><button type="submit">Sign-up</button></div>
    </form> 
    </div>
)  
 }
}

    


export default Signup;
