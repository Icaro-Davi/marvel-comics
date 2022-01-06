import { message } from 'antd';
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
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
    // setLocation: (location: PositionType) => void
    setLocation: Dispatch<SetStateAction<PositionType | undefined>>;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ userLocation, setLocation }) => {
    const initialLocation = useRef<PositionType>(defaultPosition);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
    });
    useEffect(() => {
        setLocation && getLocation((geolocation) => {
            const location = { lat: geolocation.coords.latitude, lng: geolocation.coords.longitude };
            initialLocation.current = location;
            setLocation(location);
        });
    }, [setLocation]);
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