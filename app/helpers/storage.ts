import { MovieType } from '@app/types/types/response-types';

export const getStorageItem = () => {
  const storage = localStorage.getItem('rated_movies');
  const ratedList: MovieType[] = storage ? JSON.parse(storage) : [];

  return ratedList;
};