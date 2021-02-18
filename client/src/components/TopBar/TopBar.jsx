import { useState } from 'react'

import { AppBar, ClickAwayListener, IconButton, ListItemIcon, MenuItem, Paper, Popper, Toolbar } from '@material-ui/core'
import { AccountCircle, ExitToApp, Person } from '@material-ui/icons'

import { useAuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function TopBar() {
    const {user, logout} = useAuthContext()

    const [profileAnchor, setProfileAnchor] = useState(null)
	
	const handleProfilePopper = (event) => {
		setProfileAnchor(profileAnchor ? null : event.currentTarget)
	}
    
    return (
        <>
            <AppBar>
                <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton style={{color: 'white'}} onClick={handleProfilePopper}>
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Popper open={Boolean(profileAnchor)} anchorEl={profileAnchor} style={{zIndex: 1500}} placement='bottom-end'>
				<ClickAwayListener onClickAway={handleProfilePopper}>
					<Paper style={{padding: '5px 0'}}>
                        <Link to={`/users/${user.userId}`} style={{textDecoration: 'none', color: 'inherit'}}>
						    <MenuItem style={{paddingRight: '20px'}}>
                                <ListItemIcon>
                                    <Person />
                                </ListItemIcon>
                                My Profile
                            </MenuItem>	
                        </Link>
						<MenuItem onClick={logout} style={{paddingRight: '20px'}}>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            Logout
                        </MenuItem>	
					</Paper>	
				</ClickAwayListener>
			</Popper>
        </>
    )
}