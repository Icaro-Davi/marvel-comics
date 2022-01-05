import { Button, Select, Row, Col, Form, Modal } from 'antd';
import { Dispatch, forwardRef, ForwardRefRenderFunction, SetStateAction, useImperativeHandle, useState } from 'react';

import { ComicFormatType, getComicsParams } from '../../../services/marvel-requestor/marvel.types';

const { Option } = Select;

type filtersType = {
    get: getComicsParams;
    set: Dispatch<SetStateAction<getComicsParams>>
}

interface FilterModalOptionsProps {
    filters: filtersType;
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

    const openModal = () => setVisibility(true);
    const closeModal = () => setVisibility(false);

    useImperativeHandle(ref, () => ({
        visibility,
        action: {
            openModal,
            closeModal,
        }
    }));

    return (
        <Modal visible={visibility} footer={null} title="Filtros" onCancel={closeModal}>
            <Form
                layout='vertical'
                initialValues={{ format: props.filters.get.format }}
                onFinish={(values) => {
                    props.filters.set(
                        oldState => ({ ...oldState, format: values.format as ComicFormatType })
                    )
                    closeModal();
                }}
            >
                <Row>
                    <Col xs={24}>
                        <Form.Item name='format' label="Formato">
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
                    </Col>
                    <Col xs={24} className='flex-column'>
                        <Button htmlType='submit'>Aplicar</Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default forwardRef(FilterContainerModal);