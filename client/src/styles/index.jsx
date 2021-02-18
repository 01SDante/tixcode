import { makeStyles } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

export const useStyles = makeStyles(theme => ({
    loginForm: {
        marginTop: theme.spacing(8)
    },
    signupForm: {
        marginTop: theme.spacing(4)
    },
    lock: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    check: {
        margin: theme.spacing(1),
        backgroundColor: green[600]
    },
    buttonWrapper: {
        position: 'relative'
    },
    button: {
        marginBottom: theme.spacing(1)
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -16,
        marginLeft: -12
    },
    paragraph: {
        margin: theme.spacing(2)
    },
    link: {
        margin: theme.spacing(2),
        textDecoration: 'none',
        color: '#1976d2',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    middleLink: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        textDecoration: 'none',
        color: '#1976d2',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    paper: {
        marginTop: theme.spacing(12),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '900px',
        padding: theme.spacing(3)
    }
}))