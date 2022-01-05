import React, { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useState } from "react";
import { Modal, Card, Typography, Row, Col, message, Grid, Divider, Tag, Popover } from 'antd';
import moment from "moment";
moment.locale('pt-br');

import { ComicCharactersType, ComicType } from "../../../services/marvel-requestor/marvel.types";
import MarvelApiRequestor from "../../../services/marvel-requestor";
import CardItem from "./CardItem";

const { Title, Text } = Typography;

export interface RefComicInfoModal {
    visibility: boolean;
    actions: {
        openModal: () => void;
        closeModal: () => void;
        setCurrentComic: (comic: ComicType) => void;
    }
}

const ComicInfoModal: ForwardRefRenderFunction<RefComicInfoModal> = (props, ref) => {
    const breakpoints = Grid.useBreakpoint();
    const [visibility, setVisibility] = useState(false);
    const [currentComic, setCurrentComic] = useState<ComicType>();
    const [characters, setCharacters] = useState<ComicCharactersType>([]);

    const openModal = () => setVisibility(true);
    const closeModal = () => setVisibility(false);

    useImperativeHandle(ref, () => ({
        visibility,
        actions: {
            openModal,
            closeModal,
            setCurrentComic
        }
    }));

    useEffect(() => {
        setCharacters([]);
        currentComic && MarvelApiRequestor.getComicCharacters(currentComic.id)
            .then(creators => setCharacters(creators.results))
            .catch(error => {
                message.error('Falha ao requisitar personagens.', 6);
            })
    }, [currentComic]);

    return (
        <Modal
            visible={visibility}
            footer={null}
            centered
            onCancel={closeModal}
            width={breakpoints.xs && breakpoints.md ? 'auto' : '1000px'}
        >
            <Card size='small' className='comicInfoModal-card-container'>
                <Row className='w-100' justify='center'>
                    <Col xs={24} sm={6} md={6} className='flex-column flex-align-center'>
                        <img style={{ width: breakpoints.xs ? '80%' : '100%', height: 'auto' }} src={`${currentComic?.thumbnail.path}/portrait_uncanny.${currentComic?.thumbnail.extension}`} />
                    </Col>
                    <Col xs={24} md={18} className='margin-info-container' style={{ textAlign: breakpoints.xs ? 'center' : 'justify' }}>
                        <Title level={3}>{currentComic?.title}</Title>
                        <Divider />

                        {!!currentComic?.creators.available && (
                            <CardItem title="Autores:">
                                {currentComic?.creators.items.map((creator) => <Tag key={creator.name} title={creator.role} className='authors-tag'>{creator.name}</Tag>)}
                            </CardItem>
                        )}

                        <CardItem title="Formato:">
                            <Tag>{currentComic?.format}</Tag>
                        </CardItem>

                        {!!currentComic?.pageCount && (
                            <CardItem title="Quantidade de Páginas:">{currentComic?.pageCount}</CardItem>
                        )}

                        {!!currentComic?.prices.length && (
                            <CardItem title="Preço:">
                                {Number(currentComic?.prices.find(price => price.type === 'printPrice')?.price).toLocaleString('en-us', { style: 'currency', currency: 'USD' })}
                            </CardItem>
                        )}

                        {!!currentComic?.dates.length && moment(currentComic?.dates.find(date => date.type === 'onsaleDate')?.date).isValid() && (
                            <CardItem title="Data de Venda:">{moment(currentComic?.dates.find(date => date.type === 'onsaleDate')?.date).format('DD/MM/YYYY')}</CardItem>
                        )}

                        {!!characters.length && (
                            <div>
                                <Text strong>Personagens:</Text>
                                <div className='characters-container'>
                                    <div className='scroll-container'>
                                        {characters.map(character => (
                                            <Popover key={character.id} title='Descrição' trigger='click' content={<div className='w-100'><Text>{character.description || 'Descrição Indisponível'}</Text></div>}>
                                                <div className='card-character-container'>
                                                    <div>
                                                        <img className='w-100 h-auto' src={`${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}`} />
                                                    </div>
                                                    <div>
                                                        <Text strong >{character.name}</Text>
                                                    </div>
                                                </div>
                                            </Popover>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {!!currentComic?.description && (
                            <CardItem title="Descrição:">
                                <div dangerouslySetInnerHTML={{ __html: currentComic?.description }} />
                            </CardItem>
                        )}

                    </Col>
                </Row>
            </Card>
        </Modal>
    )
}

export default forwardRef(ComicInfoModal);