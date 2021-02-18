import { Redirect, Route } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext'

export default function PrivateRoute({component: Component, ...rest}) {
    const {user} = useAuthContext()

    return (
        <Route 
            {...rest}
            render={props => 
                user.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: '/login'}} />
                )
            }
        />
    )
}