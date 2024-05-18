'use client';

import { Pagination, Stack, Title } from '@mantine/core';
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
  const [totalPages, setTotalPages] = useState<number>();
  const [moviesList, setMoviesList] = useState<MovieType[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParamsType>(
    {
      language: 'en-US',
      sort_by: 'popularity.desc',
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
      data.total_pages > 500
        ? setTotalPages(500)
        : setTotalPages(data.total_pages);
    }
  };

  useEffect(() => {
    getGenresList();
    getMoviesList(searchParams);
  }, [searchParams]);

  const handlePageChange = (value: number) => {
    setSearchParams((params) => ({
      ...params,
      page: value,
    }));
    getMoviesList(searchParams);
  };

  return (
    <Fragment>
      <Header>
        <Title order={1}>Movies</Title>
      </Header>

      <Stack component='main' gap='lg'>
        <FiltersList genres={genres} />

        {moviesList &&
          <MoviesList
            moviesList={moviesList}
            genres={genres}
          />
        }

        {totalPages && totalPages > 0  &&
          <Pagination
            total={totalPages}
            value={searchParams.page ? +searchParams.page : 1}
            onChange={handlePageChange}
          />
        }
      </Stack>
    </Fragment>
  );
}
