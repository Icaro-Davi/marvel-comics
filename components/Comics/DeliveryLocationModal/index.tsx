import { Modal, Grid, message, Typography, List, Button, Tooltip, Popconfirm } from 'antd';
import { Dispatch, forwardRef, ForwardRefRenderFunction, SetStateAction, useImperativeHandle, useState } from "react";
import { FaTrash } from 'react-icons/fa';

import { ComicsType } from '../../../services/marvel-requestor/marvel.types';
import GoogleMap, { PositionType } from './GoogleMap';

const { Text, Title } = Typography;

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
    const breakpoints = Grid.useBreakpoint();
    const [visibility, setVisibility] = useState(false);
    const [userLocation, setLocation] = useState<PositionType>();

    const openModal = () => setVisibility(true);
    const closeModal = () => setVisibility(false);

    const removeComicFromBag = (comicId: number) => {
        props.setComics(oldState => oldState.filter(comic => comic.id !== comicId))
    }

    const onSendComics = () => {
        message.success('Agora aguarde os seus quadrinhos chegarem na sua localização', 6);
        console.log(userLocation, props.comics)
    }

    useImperativeHandle(ref, () => ({
        visibility,
        actions: {
            openModal,
            closeModal,
        }
    }));

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
                <GoogleMap {...{ setLocation, userLocation }} />
                <div className='comics-list-container'>
                    <Title level={5}>Quadrinhos Selecionados: </Title>
                    <List
                        rowKey='id'
                        className='list-container'
                        dataSource={props.comics}
                        locale={{ emptyText: 'Você não selecionou nenhum quadrinho' }}
                        renderItem={item => (
                            <List.Item key={item.id} className={`background-white ${breakpoints.xs ? 'item-list-container-mobile' : 'item-list-container-desktop'}`}>
                                <div className='item-card-container'>
                                    <div className='delete-button' >
                                        <Tooltip title='Remover'>
                                            <Button danger onClick={() => removeComicFromBag(item.id)} shape='circle' icon={<FaTrash />} />
                                        </Tooltip>
                                    </div>
                                    <img src={`${item.thumbnail.path}/portrait_medium.${item.thumbnail.extension}`} />
                                </div>
                                <Text strong className='text w-100' style={{ textAlign: breakpoints.xs ? 'center' : 'left' }}>{item.title}</Text>
                            </List.Item>
                        )}
                    />
                </div>

                <div className='submit-button-container'>
                    <Popconfirm
                        disabled={!props.comics.length}
                        title='Finalizar?'
                        onConfirm={onSendComics}
                    >
                        <Button type='primary'>Enviar</Button>
                    </Popconfirm>
                </div>
            </div>
        </Modal >
    )

}

export default forwardRef(DeliveryLocationModal);