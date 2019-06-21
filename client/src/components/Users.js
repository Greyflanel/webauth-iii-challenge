import React from 'react';
import Axios from 'axios';
import requireAuthentication from './requireAuthentication';

class Users extends React.Component {
    state = {
        users: []
    }
    
    componentDidMount() {
        const endpoint = 'http://localhost:4000/users'

        Axios
        .get(endpoint, { headers: { authorization: localStorage.token } })
        .then(res => {
            this.setState({
                users: res.data
            })
        })
        .catch(error => {
            console.log(error); 
        })
    }
    
    render() {
if(this.state.users.length === 0) {
    return (
        <div>Loading Users....</div>
    )
}
        return(
            <div>
                {this.state.users.map(user => 
                <div key={user.id}>
                    <p>{user.username}</p>
                    <p>{user.department}</p>
                </div>
                    )}
            </div>
        )
    }
}

export default  requireAuthentication(Users);