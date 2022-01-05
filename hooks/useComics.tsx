import { message } from "antd";
import { useEffect, useState } from "react";
import MarvelApiRequestor from "../services/marvel-requestor";
import { ComicsType, getComicsParams } from "../services/marvel-requestor/marvel.types";

const useComics = (initialParams?: getComicsParams) => {
    const [comics, setComics] = useState<ComicsType>([]);
    const [pagination, setPagination] = useState({ offset: 0, total: 0, limit: 0 });
    const [filters, setFilters] = useState<getComicsParams>(initialParams ? initialParams : {});
    const [loading, setLoading] = useState(false);

    const getComics = async (params?: getComicsParams) => {
        try {
            setLoading(true);
            const { results, total, limit, offset, count } = await MarvelApiRequestor.getComics(params);
            setPagination(oldState => ({
                offset: !!offset ? oldState.offset + count : limit,
                total,
                limit
            }));            
            !!comics.length
                ? setComics(oldState => [...oldState, ...results.filter(result => !comics.find(comics => comics.id === result.id))])
                : setComics(results);
            setLoading(false);
        } catch (error) {
            message.error('Falha ao requisitar a listar de quadrinhos.', 6);
            setTimeout(() => {
                message.warning('Tentando novamente', 6)
                getComics(removeBlankValuesFromFilter(filters));
            }, 12000);
        }
    }

    const loadMore = () => {
        getComics(filters ? { ...filters, offset: pagination.offset} : {
            ...initialParams,
            limit: initialParams?.limit || 10,
            offset: pagination.offset + 1
        });
    }

    const resetList = () => {
        setComics([]);
        setPagination({ offset: 0, total: 0, limit: 0 });
    }

    const removeBlankValuesFromFilter = (filters: getComicsParams): getComicsParams => (
        Object.keys(filters).reduce((prev, current) => ({
            ...prev,
            ...!!(filters as any)[current] ? { [current]: (filters as any)[current] } : {}
        }), {})
    )

    useEffect(() => {
        resetList();
        getComics(removeBlankValuesFromFilter(filters));
    }, [filters]);

    return {
        comics,
        isLoading: loading,
        pagination,
        filters: {
            get: filters,
            set: setFilters
        },
        actions: {
            loadMore,
            resetList,
            getComics
        }
    };
}

export default useComics;