import { useEffect, useState } from 'react'

import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core'

import { useStyles } from '../../styles'
import Container from '../../components/Container/Container'
import TopBar from '../../components/TopBar/TopBar'
import UserService from '../../services/UserService'
import { useAuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Search } from '@material-ui/icons'

export default function Users() {
    const muiStyles = useStyles()

    const {user} = useAuthContext()

    const [users, setUsers] = useState([])

    useEffect(() => {
        UserService.getUsers(user.authToken)
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const headers = ['User', 'Name', 'Surname', 'Address', '']

    return (
        <Container>
            <TopBar />
            <Paper className={muiStyles.paper}>
                <Typography component='h1' variant='h5'>Users</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell key={index}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user._id} hover>
                                <TableCell>{user.user}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.surname}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>
                                    <Tooltip title='See Profile'>
                                        <Link to={`/users/${user._id}`}>
                                            <IconButton>
                                                <Search />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    )
}