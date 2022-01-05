import { message} from 'antd';
import { useEffect, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export const defaultPosition = { lat: -7.224427, lng: -39.326499 };

const getLocation = (callback: (position: GeolocationPosition) => void) => {
    try {
        navigator.geolocation.getCurrentPosition(callback);
    } catch (error) {
        message.warning('Geolocalização não suportada pelo navegador.', 6);
    }
}

export type PositionType = {
    lat: number; lng: number;
}

interface GoogleMapProps {
    userLocation: PositionType | undefined;
    setLocation: (location: PositionType) => void
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ userLocation, setLocation }) => {
    const initialLocation = useRef<PositionType>(defaultPosition);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
    });
    const getUserLocation = () => {
        getLocation((geolocation) => {
            let location = { lat: geolocation.coords.latitude, lng: geolocation.coords.longitude };
            setLocation(location);
            initialLocation.current = location;
        })
    }
    useEffect(getUserLocation, []);
    return (
        <div className='map-container'>
            {isLoaded && (
                <GoogleMap
                    mapContainerClassName='w-100 h-100'
                    onClick={(e) => e.latLng && setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                    center={initialLocation.current}
                    zoom={15}
                >
                    <Marker position={userLocation ? userLocation : defaultPosition} />
                </GoogleMap>
            )}
        </div>
    )
}

export default GoogleMapComponent;