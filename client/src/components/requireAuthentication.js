import React from 'react';

export default function (Component) {
    return class Authenticated extends React.Component {
        render() {
            const token = localStorage.token
            const logMessage = <div>Please log into see the users</div>
            return (
                <div>
                    {token ? <Component {... this.props}/> : logMessage}
                </div>
            )
        }
    }
}

