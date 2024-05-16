'use client';

import { Title } from '@mantine/core';
import axios, { AxiosResponse } from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { ProxyApiPaths } from '@app/types/enums/api-paths';
import { SearchParamsType } from '@app/types/types/request-types';
import { GenreType, MovieType, MoviesListResponseType } from '@app/types/types/response-types';
import { Header } from '../components/header';
import { MoviesList } from '../components/movies-list';
import { FiltersList } from './components/filters-list/filters-list';

export default function MoviesPage() {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [moviesList, setMoviesList] = useState<MovieType[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParamsType>(
    {
      language: 'en-US',
      sort_by: 'popularity.asc',
      page: 1,
    }
  );

  const getGenresList = async () => {
    const { data } = await axios.get(ProxyApiPaths.GENRES_LIST);
    if(data) {
      setGenres(data.genres);
    }
  };

  const getMoviesList = async (searchParams: SearchParamsType) => {
    const { data }: AxiosResponse<MoviesListResponseType> = await axios.get(
      ProxyApiPaths.MOVIES_LIST,
      {
        params: {
          ...searchParams
        }
      }
    );

    if(data) {
      setMoviesList(data.results);
    }
  };

  useEffect(() => {
    getGenresList();
    getMoviesList(searchParams);
  }, [searchParams]);

  return (
    <Fragment>
      <Header>
        <Title order={1}>Movies</Title>
      </Header>

      <main>
        <FiltersList genres={genres} />

        <MoviesList
          moviesList={moviesList}
          genres={genres}
        />
      </main>
    </Fragment>
  );
}
