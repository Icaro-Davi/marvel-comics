import Axios from 'axios';
import { getParamsType } from './marvel.types';

const instance = Axios.create({
    baseURL: 'https://gateway.marvel.com:443/v1/public',
    params: {
        apikey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
    }
});

instance.interceptors.request.use(async (config) => {
    const { data: { timestamp, hash } } = await Axios.get<getParamsType>('/api/getParams');
    return {
        ...config,
        params: {
            ...config.params,
            hash: hash,
            ts: timestamp,
        }
    }
});

export default instance;