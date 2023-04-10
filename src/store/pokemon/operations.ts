import api from 'src/api';
import { API_URL } from 'src/constants';

export const getPokemonList = async ({ limit = 10, offset = 0 }) => {
    return await api({
        method: 'GET',
        url: `${API_URL}pokemon`,
        params: {
            limit,
            offset,
        },
    });
};

export const getPokemonDetails = async (id: number = 1) => {
    return await api({
        method: 'GET',
        url: `${API_URL}pokemon/${id}/`,
    });
};
