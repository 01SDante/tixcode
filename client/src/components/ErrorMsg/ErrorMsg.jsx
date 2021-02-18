import { Grid } from '@material-ui/core'

import classes from './ErrorMsg.module.css'

export default function ErrorMsg({msg}) {
    return (
        msg ? (
            <Grid item xs={12}>
                <p className={classes.ErrorMsg}>{msg}</p> 
            </Grid>
        ) : null
    )
}