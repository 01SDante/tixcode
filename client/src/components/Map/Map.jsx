import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

export default function Map({lat, lng}) {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyDqLScR5cAaNwjQpgMo9L-A07K9mr2RnbU'
    })

    if (loadError) return 'Error loading map'

    if (!isLoaded) return 'Loading maps'

    return (
        <GoogleMap
            mapContainerStyle={{height: '100%', width: '100%'}}
            zoom={16}
            center={{lat, lng}}
        >
            <Marker position={{lat, lng}} />
        </GoogleMap>
    )
}