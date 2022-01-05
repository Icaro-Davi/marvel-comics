import { Button, Input, Badge } from 'antd';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { FaEraser, FaFilter } from 'react-icons/fa';

import { ComicsType, getComicsParams } from '../../services/marvel-requestor/marvel.types';
import FilterContainerModal, { FilterActionsRef } from './FilterContainerModal';

const { Search } = Input;

export type filtersType = {
    get: getComicsParams;
    set: Dispatch<SetStateAction<getComicsParams>>
}

interface FilterComicsProps {
    selectedComics: ComicsType;
    isLoading: boolean;
    actions: {
        removeAllChecked: () => void;
        applyFilters: (params?: getComicsParams) => Promise<void>;
        resetComics: () => void;
    };
    filters: filtersType;
}


const FilterComics: React.FC<FilterComicsProps> = props => {
    const FilterContainerModalRef = useRef<FilterActionsRef>(null);
    const onSend = (text: string) => props.filters.set(oldState => ({ ...oldState, titleStartsWith: text }));
    return (
        <div style={{ flex: 0, display: 'flex', padding: 6 }}>
            <FilterContainerModal ref={FilterContainerModalRef} filters={props.filters} isLoading={props.isLoading} />
            <Badge size='small' count={props.selectedComics.length} offset={[-8, 3]}>
                <Button
                    onClick={props.actions.removeAllChecked}
                    title='Limpar quadrinhos selecionados'
                ><FaEraser /></Button>
            </Badge>
            <Search
                allowClear
                disabled={props.isLoading}
                loading={props.isLoading}
                onSearch={onSend}
                placeholder='Buscar por titulo'
            />
            <Button onClick={() => FilterContainerModalRef.current?.action.openModal()} title='Filtrar quadrinhos' ><FaFilter /></Button>
        </div>
    )
}

export default FilterComics;