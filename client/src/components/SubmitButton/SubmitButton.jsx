import { Button, CircularProgress } from '@material-ui/core'

import { useStyles } from '../../styles'

export default function SubmitButton({label, loading, ...rest}){
    const muiClasses = useStyles()

    return (
        <div className={muiClasses.buttonWrapper}>
            <Button
                type='submit'
                variant='contained'
                color='primary'
                className={muiClasses.button}
                disabled={loading}
                fullWidth
                {...rest}
            >
                {label}
            </Button>
            {loading && <CircularProgress size={24} className={muiClasses.buttonProgress} />}
        </div>
    )
}