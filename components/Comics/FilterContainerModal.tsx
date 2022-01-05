import { Button, Select, Row, Col, Form, Modal } from 'antd';
import { Dispatch, forwardRef, ForwardRefRenderFunction, SetStateAction, useImperativeHandle, useState } from 'react';
import { IoArrowDownSharp, IoArrowUpOutline } from 'react-icons/io5';

import { ComicOrderByType, getComicsParams } from '../../services/marvel-requestor/marvel.types';

const { Option } = Select;

type filtersType = {
    get: getComicsParams;
    set: Dispatch<SetStateAction<getComicsParams>>
}

interface FilterModalOptionsProps {
    filters: filtersType;
    isLoading: boolean;
}

export interface FilterActionsRef {
    visibility: boolean;
    action: {
        openModal: () => void;
        closeModal: () => void;
    };
}

const FilterContainerModal: ForwardRefRenderFunction<FilterActionsRef, FilterModalOptionsProps> = (props, ref) => {
    const [visibility, setVisibility] = useState(false);
    const [ascendant, setAscendant] = useState(true);

    const openModal = () => setVisibility(true);
    const closeModal = () => setVisibility(false);

    const toggleToAscendant = () => setAscendant(true);
    const toggleToDecreasing = () => setAscendant(false);

    useImperativeHandle(ref, () => ({
        visibility,
        action: {
            openModal,
            closeModal,
        }
    }));

    return (
        <Modal visible={visibility} footer={null} title='Filtros' onCancel={closeModal}>
            <Form
                layout='vertical'
                initialValues={props.filters.get}
                onFinish={(values: getComicsParams) => {
                    process.env.NODE_ENV === 'development' && console.log('[FilterListForm Values]', values);
                    props.filters.set(oldState => ({
                        ...oldState,
                        ...values,
                         orderBy: `${ascendant ? '' : '-'}${values.orderBy}` as ComicOrderByType
                    }));
                    closeModal();
                }}
            >
                <Row>
                    <Col xs={24}>
                        <Form.Item name='format' label='Formato:'>
                            <Select allowClear>
                                <Option value='comic'>Comic (Quadrinhos)</Option>
                                <Option value='magazine'>Magazine (Revista)</Option>
                                <Option value='trade paperback'>Trade Paperback (Livro de Bolso)</Option>
                                <Option value='hardcover'>Hardcover (Capa Dura)</Option>
                                <Option value='digest'>Digest (Digerir)</Option>
                                <Option value='graphic novel'>Graphic Novel (História em Quadrinhos)</Option>
                                <Option value='digital comic'>Digital Comic (Quadrinhos Digitais)</Option>
                                <Option value='infinite comic'>Infinite Comic (Cômico Infinito)</Option>
                            </Select>
                        </Form.Item>
                        <div className='flex-row flex-align-end'>
                            <Form.Item name='orderBy' label='Ordenar por:' className='w-100'>
                                <Select allowClear>
                                    <Option value='title'>Titulo</Option>
                                    <Option value='onsaleDate'>Data de Venda</Option>
                                </Select>
                            </Form.Item>
                            <div style={{ marginBottom: 24 }}>
                                {ascendant ? <Button onClick={toggleToDecreasing} icon={<IoArrowUpOutline />} /> : <Button onClick={toggleToAscendant} icon={<IoArrowDownSharp />} />}
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} className='flex-column'>
                        <Button disabled={props.isLoading} loading={props.isLoading} htmlType='submit'>Aplicar</Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default forwardRef(FilterContainerModal);