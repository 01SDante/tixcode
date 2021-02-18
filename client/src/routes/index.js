import { Redirect, Route, Switch } from 'react-router-dom'

import PrivateRoute from '../components/PrivateRoute/PrivateRoute'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Users from '../pages/Users/Users'
import User from '../pages/Users/User/User'
import NotFound from '../pages/NotFound/NotFound'

export default (
    <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/'>
            <Redirect to='/users' />
        </Route>
        <PrivateRoute exact path='/users' component={Users} />
        <PrivateRoute exact path='/users/:id' component={User} />
        <PrivateRoute path='*' component={NotFound} />
    </Switch>
)