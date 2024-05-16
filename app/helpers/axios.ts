import axios from 'axios';
import { ApiPaths } from '@app/types/enums/api-paths';

export const instance = axios.create({
    baseURL: ApiPaths.BASE_URL,
    headers: {
        'Authorization': `Bearer ${process.env.SECRET_KEY}`,
        'accept': 'application/json',
    }
});