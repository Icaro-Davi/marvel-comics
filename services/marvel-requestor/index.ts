import MarvelRequestor from './requestor';
import { ComicCharactersType, ComicCreatorsType, ComicsResponseType, ComicsType, getComicsParams } from './marvel.types';

class MarvelApiRequestor {
    static basePath = '/comics';

    static async getComics(params?: getComicsParams) {
        try {
            const { data } = await MarvelRequestor.get<ComicsResponseType<ComicsType>>(`${this.basePath}`, {
                params: params
            });            
            return data?.data;
        } catch (error) {
            process.env.NODE_ENV === 'development' && console.error('[MarvelApiRequestor Error: getComics]', error);
            throw error;
        }
    }

    static async getComicCharacters(comicId: number){
        try {
            const {data} = await MarvelRequestor.get<ComicsResponseType<ComicCharactersType>>(`${this.basePath}/${comicId}/characters`);
            return data.data;
        } catch (error) {
            process.env.NODE_ENV === 'development' && console.error('[MarvelApiRequestor Error: getComicCharacters]', error);
            throw error;
        }
    }

    static async getComicCreators(comicId: number){
        try {
            const {data} = await MarvelRequestor.get<ComicsResponseType<ComicCreatorsType>>(`${this.basePath}/${comicId}/creators`);
            return data.data;
        } catch (error) {
            process.env.NODE_ENV === 'development' && console.error('[MarvelApiRequestor Error: getComicCreators]', error);
            throw error;
        }
    }
}

export default MarvelApiRequestor;