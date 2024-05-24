'use client';

import {
  Avatar,
  Box,
  Breadcrumbs,
  Burger,
  Card,
  Container,
  Divider,
  Group,
  Image,
  LoadingOverlay,
  Stack,
  Table,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { IconStarFilled } from '@tabler/icons-react';
import axios from 'axios';
import moment from 'moment';
import { default as NextImage } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '@app/(pages)/context/context';
import {
  CARD_IMAGE_HEIGHT,
  CARD_IMAGE_WIDTH,
  DESCRIPTION_MAX_WIDTH,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_LOGO,
  LAYOUT_MAX_WIDTH_MOBILE,
  LAYOUT_MAX_WIDTH_TABLET,
  MOVIE_CARD_HEIGHT,
  POSTER_IMAGE_HEIGHT,
  POSTER_IMAGE_WIDTH,
  RADIUS_LARGE,
  SPACING_MAX
} from '@app/constants/constants';
import { transformDuration, transformReleaseDate, transformVoteCount } from '@app/helpers/format';
import { getStorageItem } from '@app/helpers/storage';
import { ApiPaths } from '@app/types/enums/api-paths';
import { Paths } from '@app/types/enums/paths';
import { MovieResponseType, MovieType, VideoDataType } from '@app/types/types/response-types';
import { TableRowtype } from '@app/types/types/table-type';
import { ModalRating } from '../../components/modal-rating/modal-rating';
import { Poster } from '../../components/poster';
import { RatingButton } from '../../components/rating-button';

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
  const [isLoading, setIsLoading] = useState(false);
  const [breadcrumbsItems, setBreadcrumbsItems] = useState<Record<string, string>[]>();
  const [opened, { open, close }] = useDisclosure();
  const { isBurgerOpen, setIsBurgerOpen } = useContext(Context);
  const { width } = useViewportSize();

  const router = useRouter();

  const catalog = usePathname().split('/')[1];
  const id = usePathname().split('/')[2];

  const getMovieData = useCallback(async () => {
    const validPaths: Record<string, boolean> = {
      movies: true,
      rated: true,
    };

    if(!validPaths[catalog]) {
      router.push(Paths.NOT_FOUND);
    }
    setIsLoading(true);
   
    const { data } = await axios.get(`/api/${catalog}/${id}`);

    if(data) {
      setIsLoading(false);
      setMove(data);
    }
  }, [id, catalog, router]);

  useEffect(() => {
    const currentRatedList = getStorageItem();
    setRatedList(currentRatedList);
  }, []);

  useEffect(() => {
    getMovieData();
  }, [getMovieData]);

  useEffect(() => {
    if(catalog === 'movies' && movie) {
      setBreadcrumbsItems([
        { title: 'Movies', href: Paths.MOVIES },
        { title: movie.original_title, href: `/${catalog}/${id}` },
      ]);
    }
    if(catalog === 'rated' && movie) {
      setBreadcrumbsItems([
        { title: 'Rated Movies', href: Paths.RATED },
        { title: movie.original_title, href: `/${catalog}/${id}` },
      ]);
    }
  }, [catalog, movie, id]);

  const breadcrumbs = breadcrumbsItems && breadcrumbsItems.map((item) => (
    <Text
      component={Link}
      href={item.href}
      key={item.title}
      size={width <= LAYOUT_MAX_WIDTH_MOBILE ? 'xs' : 'sm'}
      c='appColors.6'
    >
      {item.title}
    </Text>
  ));

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

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <Container component='main' maw={DESCRIPTION_MAX_WIDTH} py={10}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2, opacity: '.3', pos: 'fixed'}}
        loaderProps={{ color: 'appColors.6', pos: 'fixed' }}
      />

      <Stack mt={40} gap={20}>
        <Group justify='space-between'>
          <Breadcrumbs>
            {breadcrumbs}
          </Breadcrumbs>
          {width <= LAYOUT_MAX_WIDTH_TABLET &&
            <Burger
              opened={isBurgerOpen}
              onClick={toggleBurgerMenu}
            />
          }
         
        </Group>
        {movie && 
          <Card
            radius={RADIUS_LARGE}
            p={width > LAYOUT_MAX_WIDTH_MOBILE ? 'lg' : 8}
            w={SPACING_MAX}
            h={width > LAYOUT_MAX_WIDTH_TABLET ? MOVIE_CARD_HEIGHT : SPACING_MAX}
            component='section'
          >
            <Group align='start' wrap='nowrap' justify='space-between'>
              <Group wrap={width > LAYOUT_MAX_WIDTH_TABLET ? 'nowrap' : 'wrap'} align='start' h={SPACING_MAX}>
                <Poster
                  src={`${ApiPaths.IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.original_title}
                  width={width <= LAYOUT_MAX_WIDTH_MOBILE ? POSTER_IMAGE_WIDTH : CARD_IMAGE_WIDTH}
                  height={width <= LAYOUT_MAX_WIDTH_MOBILE ? POSTER_IMAGE_HEIGHT: CARD_IMAGE_HEIGHT}
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

                  <Table
                    withRowBorders={false}
                    verticalSpacing={4}
                    horizontalSpacing={10}
                  >
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
              </Group>
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
                <Stack gap={12}>
                  <Title order={4} mb='md'>Production</Title>
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
                </Stack>}
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
