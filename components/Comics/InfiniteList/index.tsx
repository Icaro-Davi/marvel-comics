import { Fragment, useRef } from 'react';
import { List, Checkbox, Popover, Divider, Spin, Tag, Grid } from 'antd';

import InfiniteScroll from "react-infinite-scroll-component";
import { ComicsType, ComicType } from '../../../services/marvel-requestor/marvel.types';

import ComicCard from '../../layouts/Card/Comic';
import ComicInfoModal, { RefComicInfoModal } from '../ComicInfoModal';

interface InfiniteListProps {
    comics: ComicsType;
    isLoading: boolean;
    selectedComics: ComicsType;
    pagination: {
        offset: number;
        total: number;
        limit: number;
    };
    actions: {
        loadMore: () => void;
        onChecked: (comic: ComicType) => void;
        onNotChecked: (comic: ComicType) => void;
    };
}

const InfiniteList: React.FC<InfiniteListProps> = props => {
    const breakpoints = Grid.useBreakpoint();
    const ComicInfoModalRef = useRef<RefComicInfoModal>(null);
    const onClickComic = (item: ComicType) => {
        ComicInfoModalRef.current?.actions.setCurrentComic(item);
        ComicInfoModalRef.current?.actions.openModal();
    }
    return (
        <Fragment>
            <ComicInfoModal ref={ComicInfoModalRef} />
            <div style={{ position: 'relative', flex: 1 }}>
                <div id='infinite-list' style={{ position: 'absolute', width: '100%', height: '100%', overflowY: 'auto' }}>
                    <InfiniteScroll
                        dataLength={props.comics.length}
                        next={props.actions.loadMore}
                        hasMore={props.comics.length < props.pagination.total}
                        loader={<Divider><Spin /></Divider>}
                        endMessage={props.comics.length ? <Divider plain>Você chegou ao final da lista</Divider> : ''}
                        scrollableTarget="infinite-list"
                    >
                        <List
                            rowKey='id'
                            style={{ padding: 6 }}
                            dataSource={props.comics}
                            locale={{ emptyText: 'Não tem quadrinhos no momento' }}
                            loading={!props.comics.length && props.isLoading}
                            renderItem={item => (
                                <List.Item key={item.id} className='background-white'>
                                    <div className='flex-row'>
                                        <Checkbox
                                            checked={!!props.selectedComics.find((_comic) => _comic.id === item.id)}
                                            onChange={(e) => e.target.checked ? props.actions.onChecked(item) : props.actions.onNotChecked(item)}
                                            style={{ marginRight: 6 }}
                                        />
                                        <div>
                                            <Tag>{item.format}</Tag>
                                            <Popover visible={breakpoints.xs ? false : undefined} content={<ComicCard src={`${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`} />}>
                                                <a onClick={() => onClickComic(item)} style={{ cursor: 'pointer' }}>{item.title}</a>
                                            </Popover>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            </div>
        </Fragment>
    )
}

export default InfiniteList;