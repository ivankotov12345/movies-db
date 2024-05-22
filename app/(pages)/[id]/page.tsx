'use client';

import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Group,
  Image,
  Stack,
  Table,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconStarFilled } from '@tabler/icons-react';
import axios from 'axios';
import moment from 'moment';
import { default as NextImage } from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  DESCRIPTION_MAX_WIDTH,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_LOGO,
  MOVIE_CARD_HEIGHT,
  POSTER_IMAGE_HEIGHT,
  POSTER_IMAGE_WIDTH,
  RADIUS_LARGE,
  SPACING_MAX
} from '@app/constants/constants';
import { transformDuration, transformReleaseDate, transformVoteCount } from '@app/helpers/format';
import { getStorageItem } from '@app/helpers/storage';
import { ApiPaths } from '@app/types/enums/api-paths';
import { MovieResponseType, MovieType, VideoDataType } from '@app/types/types/response-types';
import { TableRowtype } from '@app/types/types/table-type';
import { ModalRating } from '../components/modal-rating/modal-rating';
import { Poster } from '../components/poster';

import { RatingButton } from '../components/rating-button';
import styles from './movie-page.module.scss';

const { Tbody, Tr, Td } = Table;

export default function Movie() {

  const theme = useMantineTheme();
  const [movie, setMove] = useState<MovieResponseType>();
  const [ratedList, setRatedList] = useState<MovieType[]>([]);
  const [rating, setRating] = useState(0);
  const [releaseYear, setReleseYear] = useState<string>();
  const [tableData, setTableData] = useState<TableRowtype[]>();
  const [video, setVideo] = useState<VideoDataType>();
  const [opened, { open, close }] = useDisclosure();


  const id = usePathname().split('/')[1];

  const getMovieData = useCallback(async () => {
    const { data } = await axios.get(`api/${id}`);

    if(data) {
      setMove(data);
    }
  }, [id]);

  useEffect(() => {
    const currentRatedList = getStorageItem();
    setRatedList(currentRatedList);
  }, []);

  useEffect(() => {
    getMovieData();
  }, [getMovieData]);

  useEffect(() => {
    if(movie) {
      const genres = movie.genres.map((genre) => genre.name).join(', ');
      const year = moment(movie.release_date).format('YYYY');

      const tableElements = [
        { category: 'Duration', value: transformDuration(movie.runtime) },
        { category: 'Premiere', value: transformReleaseDate(movie.release_date) },
        { category: 'Budget', value: `$${movie.budget.toLocaleString('en-US')}` },
        { category: 'Gross wordwide', value: `$${movie.revenue.toLocaleString()}` },
        { category: 'Genres', value: genres },
      ].filter(element => !!element.value);

      setTableData(tableElements);
      setReleseYear(year);
      setVideo(movie.videos.results[0]);
    }
  }, [movie]);

  useEffect(() => {
    const rated = ratedList.find(
      (ratedMovie: MovieType) => ratedMovie.original_title === movie?.original_title
    );

    if (rated?.my_rating) {
      setRating(rated.my_rating);
    }
  }, [movie, ratedList]);

  const onSaveRating = (rating: number) => {
    if(movie) {
      const index = ratedList.findIndex((ratedMovie: MovieType) => ratedMovie.id === +id);

      if(index !== -1) {
        ratedList[index].my_rating = rating;
      } else {
        ratedList.push({
          id: +id,
          poster_path: movie.poster_path,
          genre_ids: movie.genres.map((genre) => genre.id),
          original_title: movie.original_title,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          release_date: movie.release_date,
          my_rating: rating,
        });
      }
      localStorage.setItem('rated_movies', JSON.stringify(ratedList));
    }
  };

  return (
    <Container component='main' maw={DESCRIPTION_MAX_WIDTH} p={0}>
      <Stack>
        {movie && 
          <Card
            radius={RADIUS_LARGE}
            p='lg'
            w={SPACING_MAX}
            h={MOVIE_CARD_HEIGHT}
            component='section'
          >
            <Group wrap='nowrap' align='start' justify='space-between'>
              <Poster
                src={`${ApiPaths.IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.original_title}
                width={POSTER_IMAGE_WIDTH}
                height={POSTER_IMAGE_HEIGHT}
              />

              <Stack justify='space-between' h={SPACING_MAX}>
                <Stack gap='xxs'>
                  <Title order={4} c='appColors.6'>{movie.original_title}</Title>
                  <Text c='appColors.0'>{releaseYear}</Text>

                  {movie.vote_average &&
                    <Group gap='xxxs' align='center' h={SPACING_MAX}>
                    <IconStarFilled color={theme.colors.appColors[11]} />
                    <Group gap='xxs'>
                      <Text span fw={FONT_WEIGHT_LOGO}>{movie.vote_average.toFixed(1)}</Text>

                      <Text span c='appColors.0'>
                        {`(${transformVoteCount(movie.vote_count)})`}
                      </Text>
                    </Group>
                  </Group>}
                </Stack>

                <Table withRowBorders={false} verticalSpacing='xxs' horizontalSpacing='xxs'>
                    <Tbody>
                      {tableData && tableData.map((element) => (
                        <Tr key={element.category}>
                          <Td c='appColors.0'>{element.category}</Td>
                          <Td>{element.value}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
              </Stack>
              
              <RatingButton rating={rating} open={open} />
            </Group>
          </Card>}

          <Card component='section' p='lg' radius={RADIUS_LARGE}>
            <Box>
              {video &&
                <Box>
                  <Title order={4} mb='md'>Trailer</Title>

                  <iframe
                    src={`${ApiPaths.VIDEO_BASE_URL}/${video.key}`}
                    title={video.name}
                    loading='lazy'
                    className={styles.trailer}
                  />

                  <Divider my={20} />
                </Box>}

              {movie && movie.overview &&
                <Box>
                  <Title order={4} mb='md'>Description</Title>
                  <Text>{movie?.overview}</Text>

                  <Divider my={20} />
                </Box>}

              {movie && movie.production_companies &&
                <Box>
                  {movie.production_companies.map((company) => (
                    <Group key={company.id} gap='xxs'>
                      <Avatar>
                        <Image
                          component={NextImage}
                          src={`${ApiPaths.IMAGE_BASE_URL}${company.logo_path}`}
                          alt={company.name}
                          width={40}
                          height={40}
                          fit='contain'
                        />
                      </Avatar>
                      <Text fw={FONT_WEIGHT_BOLD}>{company.name}</Text>
                    </Group>
                  ))}
                </Box>}
            </Box>
          </Card>
      </Stack>

      { movie && 
        <ModalRating
          opened={opened}
          close={close}
          movie={movie}
          onSaveRating={onSaveRating}
          cardRating={rating}
          setCardRating={setRating}
        />}
    </Container>
  );
}
