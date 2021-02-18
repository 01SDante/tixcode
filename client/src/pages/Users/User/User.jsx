import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { Paper, Typography } from '@material-ui/core'

import { useStyles } from '../../../styles'
import { useAuthContext } from '../../../contexts/AuthContext'
import UserService from '../../../services/UserService'
import GeocodeService from '../../../services/GeocodeService'
import Container from '../../../components/Container/Container'
import TopBar from '../../../components/TopBar/TopBar'
import Map from '../../../components/Map/Map'

export default function User() {
    const muiClasses = useStyles()
    
    const {id} = useParams()
    const {user} = useAuthContext()

    const [userProfile, setUserProfile] = useState({
        user: '',
        name: '',
        surname: '',
        address: ''
    })

    const [coordinates, setCoordinates] = useState({
        lat: '',
        lng: ''
    })

    useEffect(() => {
        UserService.getUser(id, user.authToken)
            .then(res => {
                setUserProfile({
                    user: res.data.user,
                    name: res.data.name,
                    surname: res.data.surname,
                    address: res.data.address,
                })
            })
            .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if (userProfile.address) {
            GeocodeService.getCoordinates(userProfile.address)
            .then(res => {
                const {lat, lng} = res.data.results[0].geometry.location
                setCoordinates({
                    lat,
                    lng
                })
            })
            .catch(err => console.log(err))
        }
    }, [userProfile.address])

    return (
        <Container>
            <TopBar />
            <Paper className={muiClasses.paper}>
                <Typography component='h1' variant='h6'><b>User:</b> {userProfile.user}</Typography>
                <Typography component='h1' variant='h6'><b>Name:</b> {userProfile.name}</Typography>
                <Typography component='h1' variant='h6'><b>Surname:</b> {userProfile.surname}</Typography>
                <Typography component='h1' variant='h6'><b>Address:</b> {userProfile.address}</Typography>
                <br />
                <div style={{border: '1px solid black', height: '500px'}}>
                    {coordinates.lat && coordinates.lng ? 
                        <Map lat={coordinates.lat} lng={coordinates.lng} />
                    : 'map'}
                </div>
            </Paper>
        </Container>
    )
}