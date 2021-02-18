import { useState } from 'react'

import { Link, Redirect } from 'react-router-dom'
import { Avatar, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'

import { useStyles } from '../../styles'
import { useAuthContext } from '../../contexts/AuthContext'
import userService from '../../services/UserService'
import Container from "../../components/Container/Container"
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg'
import SubmitButton from '../../components/SubmitButton/SubmitButton'

export default function Login() {
    const muiClasses = useStyles()

    const {user, setToken} = useAuthContext()

    const [state, setState] = useState({
        user: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = event => {
        setState({...state, [event.target.name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)
        userService.login(state)
            .then(res => setToken(res.data))
            .catch(err => {
                let msg = 'An error occurred'
                if (err.response && err.response.data && err.response.data.message) {
                    msg = err.response.data.message
                }
                setErrorMsg(msg)
            })
            .finally(() => setLoading(false))
    }

    if (user.isAuthenticated) return <Redirect to='/' />

    return (
        <Container>
            <Paper elevation={2} className={['Form', muiClasses.loginForm].join(' ')}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} className='AvatarContainer'>
                            <Avatar className={muiClasses.lock}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component='h1' variant='h5'>
                                Login
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name='user'
                                label='User'
                                value={state.user}
                                onChange={handleChange}
                                variant='outlined'
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name='password'
                                label='Password'
                                type='password'
                                value={state.password}
                                onChange={handleChange}
                                variant='outlined'
                                required
                                fullWidth
                            />
                        </Grid>
                        <ErrorMsg msg={errorMsg} />
                        <Grid item xs={12}>
                            <SubmitButton label='Login' loading={loading} />
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Link to='/signup' className={muiClasses.link}>Don't have an account? Sign Up</Link>
        </Container>
    )
}