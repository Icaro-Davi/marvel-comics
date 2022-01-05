import { Modal, Grid, message, Typography, List, Button, Tooltip, Popconfirm } from 'antd';
import { Dispatch, forwardRef, ForwardRefRenderFunction, SetStateAction, useEffect, useImperativeHandle, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { FaTrash } from 'react-icons/fa';

import { ComicsType } from '../../../services/marvel-requestor/marvel.types';

const { Text, Title } = Typography;

const defaultPosition = { lat: -7.224427, lng: -39.326499 };

const getLocation = (callback: (position: GeolocationPosition) => void) => {
    try {
        navigator.geolocation.getCurrentPosition(callback);
    } catch (error) {
        message.warning('Geolocalização não suportada pelo navegador.', 6);
    }
}

type PositionType = {
    lat: number; lng: number;
}

export interface DeliveryLocationModalRef {
    visibility: boolean;
    actions: {
        openModal: () => void;
        closeModal: () => void;
    };
}

interface DeliveryLocationModalProps {
    comics: ComicsType;
    setComics: Dispatch<SetStateAction<ComicsType>>;
}

const DeliveryLocationModal: ForwardRefRenderFunction<DeliveryLocationModalRef, DeliveryLocationModalProps> = (props, ref) => {
    const initialLocation = useRef<PositionType>(defaultPosition);
    const breakpoints = Grid.useBreakpoint();
    const [visibility, setVisibility] = useState(false);
    const [userLocation, setLocation] = useState<PositionType>();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
    });

    const openModal = () => setVisibility(true);
    const closeModal = () => setVisibility(false);

    const getUserLocation = () => {
        getLocation((geolocation) => {
            let location = { lat: geolocation.coords.latitude, lng: geolocation.coords.longitude };
            setLocation(location);
            initialLocation.current = location;
        })
    }

    const removeComicFromBag = (comicId: number) => {
        props.setComics(oldState => oldState.filter(comic => comic.id !== comicId))
    }

    useImperativeHandle(ref, () => ({
        visibility,
        actions: {
            openModal,
            closeModal,
        }
    }));

    useEffect(getUserLocation, []);

    return (
        <Modal
            centered
            title='Enviar Comics'
            visible={visibility}
            onCancel={closeModal}
            footer={null}
            width={breakpoints.xs && breakpoints.md ? 'auto' : '1000px'}
        >
            <div>
                <Title level={5}>Selecione a localização da entrega: </Title>
                <div style={{ height: 250 }}>
                    {isLoaded && (
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            onClick={(e) => e.latLng && setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                            center={initialLocation.current}
                            zoom={15}
                        >
                            <Marker position={userLocation ? userLocation : defaultPosition} />
                        </GoogleMap>
                    )}
                </div>
                <div style={{ marginTop: 12 }}>
                    <Title level={5}>Quadrinhos Selecionados: </Title>
                    <List
                        rowKey='id'
                        style={{ padding: 6, maxHeight: 300, overflow: 'auto' }}
                        dataSource={props.comics}
                        locale={{ emptyText: 'Não tem quadrinhos no momento' }}
                        renderItem={item => (
                            <List.Item key={item.id} className={`'background-white ${breakpoints.xs ? 'flex-column' : 'flex-row'}`} style={{ alignItems: breakpoints.xs ? 'center' : 'flex-start' }}>
                                <div style={{ position: 'relative', margin: 12 }}>
                                    <div style={{ position: 'absolute', left: -10, top: -10 }}>
                                        <Tooltip title='Remover'>
                                            <Button danger onClick={() => removeComicFromBag(item.id)} shape='circle' icon={<FaTrash />} />
                                        </Tooltip>
                                    </div>
                                    <img style={{ width: 'auto', height: 150, margin: 'auto auto', display: 'block' }} src={`${item.thumbnail.path}/portrait_medium.${item.thumbnail.extension}`} />
                                </div>
                                <Text strong style={{ textAlign: breakpoints.xs ? 'center' : 'left', width: '100%', marginTop: 12 }} >{item.title}</Text>
                            </List.Item>
                        )}
                    />
                </div>
                <div className='flex-column' style={{ marginTop: 12 }}>
                    <Popconfirm title='Finalizar?' onConfirm={() => message.success('Agora aguarde os seus quadrinhos chegarem na sua localização', 6)}>
                        <Button type='primary'>Enviar</Button>
                    </Popconfirm>
                </div>
            </div>
        </Modal >
    )

}

export default forwardRef(DeliveryLocationModal);