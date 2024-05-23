'use client';

import { Flex, Group, LoadingOverlay, Select, Stack, Title } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import axios, { AxiosResponse } from 'axios';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useState } from 'react';
import { SORT_OPTIONS } from '@app/constants/sort-options';
import { ProxyApiPaths } from '@app/types/enums/api-paths';
import { SearchParamsType } from '@app/types/types/request-types';
import { GenreType, MovieType, MoviesListResponseType } from '@app/types/types/response-types';
import { CustomPagination } from '../components/custom-pagination';
import { EmptyList } from '../components/empty-list';
import { Header } from '../components/header';
import { FiltersList } from './components/filters-list/filters-list';

const MoviesList = dynamic(() => import('../components/movies-list').then((mod) => mod.MoviesList), {
  ssr: false,
});

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

  const [isLoading, setIsLoading] = useState(false);

  const getGenresList = async () => {
    const { data } = await axios.get(ProxyApiPaths.GENRES_LIST);
    if(data) {
      setGenres(data.genres);
    }
  };

  const getMoviesList = async (searchParams: SearchParamsType) => {
    try {
      setIsLoading(true);
      const { data }: AxiosResponse<MoviesListResponseType> = await axios.get(
        ProxyApiPaths.MOVIES_LIST,
        {
          params: {
            ...searchParams
          },
        }
      );
  
      if(data) {
        setMoviesList(data.results);
        data.total_pages > 500
          ? setTotalPages(500)
          : setTotalPages(data.total_pages);
        setIsLoading(false);
      }
    } catch(error) {
      setMoviesList([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGenresList();
    getMoviesList(searchParams);
  }, [searchParams]);

  const handlePageChange = (value: number) => {
    setSearchParams({
      ...searchParams,
      page: value,
    });
    getMoviesList(searchParams);
  };

  const handleSortChange = (value: string | null) => {
    setSearchParams({
      ...searchParams,
      sort_by: value
    });
  };

  return (
    <Fragment>
      <Header>
        <Title order={1}>Movies</Title>
      </Header>

      <Stack component='main' gap='lg'>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2, pos: 'fixed'}}
          loaderProps={{ color: 'appColors.6', pos: 'fixed' }}
          />

        <FiltersList
          genres={genres}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          getMoviesList={getMoviesList}
        />

        <Flex justify='end'>
          <Select
            size='md'
            label='Sort by'
            data={SORT_OPTIONS}
            defaultValue='popularity.asc'
            withCheckIcon={false}
            rightSection={<IconChevronDown />}
            onChange={handleSortChange}
            w={284}
          />
        </Flex>
        
        {moviesList.length > 0
         ? <MoviesList
            moviesList={moviesList}
            genres={genres}
          />
         : <EmptyList />}

        {totalPages && totalPages > 1 &&
          <Group pt='lg' justify='flex-end' pb={82}>
            <CustomPagination
              totalPages={totalPages}
              currentPage={searchParams.page ? +searchParams.page : 1}
              handlePageChange={handlePageChange}
            />
          </Group>}
      </Stack>
    </Fragment>
  );
}
