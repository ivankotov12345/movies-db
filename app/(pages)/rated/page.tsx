'use client';

import { Box, Button, Group, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { ITEMS_PER_PAGE, RADIUS_SMALL } from '@app/constants/constants';
import { getStorageItem } from '@app/helpers/storage';
import { ProxyApiPaths } from '@app/types/enums/api-paths';
import { GenreType, MovieType } from '@app/types/types/response-types';
import { CustomPagination } from '../components/custom-pagination';
import { EmptyList } from '../components/empty-list';
import { Header } from '../components/header';
import { MoviesList } from '../components/movies-list';

import styles from './page.module.scss';

export default function RatedPage() {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [moviesList, setMoviesList] = useState<MovieType[]>([]);
  const [totalItems, setTotalItems] = useState<number>();
  const [page, setPage] = useState<number>(1);

  const ratedMoviesArr = useMemo<MovieType[]>(() => {
    const ratedMovies = localStorage.getItem('rated_movies');
    return ratedMovies !== null ? JSON.parse(ratedMovies) : [];
  }, []);

  useEffect(() => {
    setMoviesList(ratedMoviesArr);
    setTotalItems(ratedMoviesArr.length);
  }, [ratedMoviesArr]);

  const [items, setItems] = useState<MovieType[]>(moviesList.slice(0, ITEMS_PER_PAGE));

  const totalPages = totalItems ? Math.ceil(totalItems/ITEMS_PER_PAGE) : 1;

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
  };

  const onButtonSearchClick = (value: string) => {
    if(value.trim() === '') {
      const ratedMovies = getStorageItem();
      return setMoviesList(ratedMovies);
    }
    const filteredRatedMovies = moviesList.filter((movie) => movie.original_title.toLowerCase().includes(value));

    setMoviesList(filteredRatedMovies);
  };

  const getGenresList = async () => {
    const { data } = await axios.get(ProxyApiPaths.GENRES_LIST);
    if(data) {
      setGenres(data.genres);
    }
  };
  
  useEffect(() => {
    getGenresList();
  }, []);

  useEffect(() => {
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE;
    setItems(moviesList.slice(from, to));
  }, [page, moviesList]);

  return (
    <Fragment>
      <Header>
        <Group justify='space-between' align='center'>
          <Title order={1}>Rated movies</Title>

          <TextInput
            placeholder='Search movie title'
            leftSection={<IconSearch width={15} height={15} />}
            rightSection={
              <Button
                color='appColors.6'
                radius={RADIUS_SMALL}
                onClick={() => onButtonSearchClick(searchValue)}
              >
                Search
              </Button>
            }
            size='md'
            rightSectionWidth={100}
            onChange={onSearchChange}
            radius={RADIUS_SMALL}
            classNames={{
              root: styles.inputRoot,
              input: styles.input,
            }}
          />
        </Group>
      </Header>
      {moviesList.length > 0 && searchValue !== ''
        ? (
          <Fragment>
            <Box component='main' mih={450}>
              {items && <MoviesList moviesList={items} genres={genres} />}
            </Box>
            {totalItems && totalItems > 4
              && <Group justify='center' py='lg'>
                  <CustomPagination
                    totalPages={totalPages}
                    handlePageChange={setPage}
                    currentPage={page}
                  />
                 </Group>}
          </Fragment>
        ) 
        : (
          <EmptyList />
        )       
      }

    </Fragment>
  );
}
