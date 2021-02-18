/*import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const mapContainerStyle = {
    width: '500px',
    height: '500px'
}

const center = {
    lat: -27.873650,
    lng: -55.135450
}

function App() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyDqLScR5cAaNwjQpgMo9L-A07K9mr2RnbU'
    })

    if (loadError) return 'Error loading maps'

    if (!isLoaded) return 'Loading maps'

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={16}
                center={center}
            >
                <Marker position={center} />
            </GoogleMap>
        </div>
    )
}*/

import axios from 'axios'

import { AuthContextProvider } from './contexts/AuthContext'
import routes from './routes'

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
    return (
        <AuthContextProvider>
            {routes}
        </AuthContextProvider>
    )
}

export default App