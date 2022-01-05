import { useState, useRef } from 'react';
import { Button } from 'antd';

import useComics from '../../hooks/useComics';
import { ComicsType, ComicType } from '../../services/marvel-requestor/marvel.types';
import DeliveryLocationModal, { DeliveryLocationModalRef } from './DeliveryLocationModal';
import FilterComics from './Filters';
import InfiniteList from './InfiniteList';

const ListComics: React.FC = props => {
    const { comics, pagination, actions, filters, isLoading } = useComics({ limit: 100, orderBy: 'title' });
    const [selectedComics, setSelectedComics] = useState<ComicsType>([]);
    const deliveryLocationModalRef = useRef<DeliveryLocationModalRef>(null);

    const onChecked = (comic: ComicType) => setSelectedComics(oldState => [...oldState, comic]);
    const onNotChecked = (comic: ComicType) => setSelectedComics(oldState => oldState.filter(_comic => _comic.id !== comic.id));
    const removeAll = () => setSelectedComics([]);

    return (
        <div className='flex-column h-100'>
            <DeliveryLocationModal
                ref={deliveryLocationModalRef}
                comics={selectedComics}
                setComics={setSelectedComics}
            />
            <FilterComics
                isLoading={isLoading}
                selectedComics={selectedComics}
                actions={{
                    applyFilters: actions.getComics,
                    resetComics: actions.resetList,
                    removeAllChecked: removeAll,
                }}
                filters={filters}
            />
            <InfiniteList
                comics={comics}
                isLoading={isLoading}
                pagination={pagination}
                selectedComics={selectedComics}
                actions={{
                    onChecked,
                    onNotChecked,
                    loadMore: actions.loadMore,
                }}
            />
            <div className='flex-column' style={{ alignItems: 'flex-end', padding: 6 }}>
                <Button onClick={() => deliveryLocationModalRef.current?.actions.openModal()}>Enviar Comics</Button>
            </div>
        </div>
    )
}

export default ListComics;