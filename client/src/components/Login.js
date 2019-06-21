import React from 'react';
import Axios from 'axios';


class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

   handleChanges = (event) => {
       this.setState({[event.target.name]: event.target.value})
   }

   handleSubmit = (event) => {
       event.preventDefault()
       const endpoint = 'http://localhost:4000/login'
       Axios
       .post(endpoint, this.state)
       .then(res => {
           localStorage.setItem('token', res.data.token)
           this.props.history.push('/users')
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
        <div><button type="submit">Log-In</button></div>
    </form> 
    </div>
)  
 }
}

    


export default Login;
