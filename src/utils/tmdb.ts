import { API_KEY, API_URL } from '../constants/config';

export const getRandomTitles = async (mediaType: string) => {
    const page = Math.floor(Math.random() * 500) + 1;
    const endpoint = `${API_URL}discover/${mediaType}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;
    const res = await fetch(endpoint);
    const { results } = await res.json();
    return results;
  };

  export const getSimilarTitles = async (mediaType: string, titleId: number | string) => {
    const endpoint = `${API_URL}/${mediaType}/${titleId}/similar?api_key=${API_KEY}&language=en-US&page=1`;
    const res = await fetch(endpoint);
    const { results } = await res.json();
    return results;
  };