import { useState } from 'react'

import { Avatar, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { CheckCircleOutlined as CheckCircleOutlinedIcon } from '@material-ui/icons'

import { useStyles } from '../../styles'
import { useAuthContext } from '../../contexts/AuthContext'
import Container from '../../components/Container/Container'
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg'
import UserService from '../../services/UserService'
import { Link, Redirect } from 'react-router-dom'
import SubmitButton from '../../components/SubmitButton/SubmitButton'

export default function Signup() {
    const muiClasses = useStyles()

    const {user} = useAuthContext()

    const [state, setState] = useState({
        name: '',
        surname: '',
        user: '',
        address: '',
        password: '',
        confirmPassword: ''
    })
    
    const [loading, setLoading] = useState(false)
    const [lengthPasswordError, setLengthPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [success, setSuccess] = useState(false)

    const handleChange = event => {
        setState({...state, [event.target.name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()

        if (state.password.length < 8) {
            setLengthPasswordError(true)
            setErrorMsg('Password must be at least 8 characters long')
            return
        }

        if (state.password !== state.confirmPassword) {
            setConfirmPasswordError(true)
            setErrorMsg('Passwords do not match')
            return
        }

        setLoading(true)
        UserService.signup(state)
            .then(res => {
                setSuccess(true)
            })
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

    if (success) {
        return (
            <Container>
                <div className='AvatarContainer' style={{margin: 'auto'}}>
                    <Avatar className={muiClasses.check}>
                        <CheckCircleOutlinedIcon />
                    </Avatar>
                    <p style={{margin: 'auto'}}>Registration successful. You may now <Link to='/login' className={muiClasses.middleLink}>login</Link>.</p>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <Paper elevation={2} className={['Form', muiClasses.signupForm].join(' ')}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} className='AvatarContainer'>
                            <Typography component='h1' variant='h5'>
                                Sign Up
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name='name'
                                label='Name'
                                value={state.name}
                                onChange={handleChange}
                                variant='outlined'
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name='surname'
                                label='Surname'
                                value={state.surname}
                                onChange={handleChange}
                                variant='outlined'
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name='address'
                                label='Address'
                                value={state.address}
                                onChange={handleChange}
                                variant='outlined'
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
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
                                error={lengthPasswordError || confirmPasswordError}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name='confirmPassword'
                                label='Repeat Password'
                                type='password'
                                value={state.confirmPassword}
                                onChange={handleChange}
                                variant='outlined'
                                error={confirmPasswordError}
                                required
                                fullWidth
                            />
                        </Grid>
                        <ErrorMsg msg={errorMsg} />
                        <Grid item xs={12}>
                        <Grid item xs={12}>
                            <SubmitButton label='Sign Up' loading={loading} />
                        </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <p className={muiClasses.paragraph}>Already have an account? <Link to='/login' className={muiClasses.middleLink}>Login</Link></p>
        </Container>
    )
}