import { Button, Input, Badge } from 'antd';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { FaEraser, FaFilter } from 'react-icons/fa';

import { ComicsType, getComicsParams } from '../../services/marvel-requestor/marvel.types';
import FilterContainerModal, { FilterActionsRef } from './FilterContainerModal';

export type filtersType = {
    get: getComicsParams;
    set: Dispatch<SetStateAction<getComicsParams>>
}

interface FilterComicsProps {
    selectedComics: ComicsType;
    actions: {
        removeAllChecked: () => void;
        applyFilters: (params?: getComicsParams) => Promise<void>;
        resetComics: () => void;
    };
    filters: filtersType;
}

const FilterComics: React.FC<FilterComicsProps> = props => {
    const FilterContainerModalRef = useRef<FilterActionsRef>(null);
    const [debounceId, setDebounceId] = useState<NodeJS.Timeout>();

    const debounce = (func: Function) => {
        !!debounceId && clearTimeout(debounceId);
        setDebounceId(setTimeout(() => { func() }, 500));
    }

    const onTitleChange = (text: string) => debounce(() => {
        props.filters.set(oldState => ({ ...oldState, titleStartsWith: text }));
    });

    return (
        <div style={{ flex: 0, display: 'flex', padding: 6 }}>
            <FilterContainerModal ref={FilterContainerModalRef} filters={props.filters} />
            <Badge size='small' count={props.selectedComics.length} offset={[-8, 3]}>
                <Button
                    onClick={props.actions.removeAllChecked}
                    title='Limpar quadrinhos selecionados'
                ><FaEraser /></Button>
            </Badge>
            <Input onChange={(e) => onTitleChange(e.target.value)} placeholder='Buscar por titulo' />
            <Button onClick={() => FilterContainerModalRef.current?.action.openModal()} title='Filtrar quadrinhos' ><FaFilter /></Button>
        </div>
    )
}

export default FilterComics;