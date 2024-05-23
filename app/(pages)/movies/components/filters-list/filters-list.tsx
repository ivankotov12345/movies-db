import { Box, Button, Group, Input, NumberInput, SimpleGrid } from '@mantine/core';
import { DateValue, YearPickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconChevronDown } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import { FONT_WEIGHT_RESET } from '@app/constants/constants';
import { FormValues } from '@app/types/types/form-types';
import { SearchParamsType } from '@app/types/types/request-types';
import { GenreType } from '@app/types/types/response-types';
import { GenreSelect } from '../genre-select';

type FiltersListProps = {
  genres: GenreType[],
  searchParams: SearchParamsType,
  setSearchParams: (searchParams: SearchParamsType) => void,
  getMoviesList: (searchParams: SearchParamsType) => Promise<void>
}

export const FiltersList: React.FC<FiltersListProps> = ({
  genres,
  searchParams,
  setSearchParams,
  getMoviesList
}) => {
  const initialValues =  {
    with_genres: searchParams.with_genres,
    primary_release_year: searchParams.primary_release_year,
    vote_average_lte: searchParams['vote_average.lte'],
    vote_average_gte: searchParams['vote_average.gte'],
  };
  const [reset, setReset] = useState(false);

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues,
    validate: {
      vote_average_lte(value, values) {
        if(value && (+value > 10 || +value < 0)) {
          return 'Invalid range';
        }
        
        return (
          value
            && values.vote_average_gte
            && +value < +values.vote_average_gte
              ? 'Max should be more or equal then max value'
              : null
        );
      },
      vote_average_gte(value, values) {
        if(value && (+value > 10 || +value < 0)) {
          return 'Invalid range';
        }
        
        return (
          value
            && values.vote_average_lte
            && +value > +values.vote_average_lte
              ? 'Min should be less or then equal max value'
              : null
        );
      },
    }
  });

  const handleChangeGenres = (selectedGenres: string | undefined) => {
    setSearchParams({
      ...searchParams,
      with_genres: selectedGenres,
    });
    getMoviesList(searchParams);
  };

  const handleChangeYear = (selectedYear: DateValue) => {
    const year = moment(selectedYear).format('YYYY');

    setSearchParams({
      ...searchParams,
      primary_release_year: year,
    });
  };

  const handlMinValueChange = (value: string | number) => {
    form.setFieldValue('vote_average_gte', value);
  };

  const handleMinValueBlur = () => {
    form.validate();
    if(form.isValid()) {
      const minValue = form.getValues().vote_average_gte;
      
      setSearchParams({
        ...searchParams,
        'vote_average.gte': minValue
      });
      getMoviesList(searchParams);
    }
  };

  const handlMaxValueChange = (value: string | number) => form.setFieldValue('vote_average_lte', value);

  const handleMaxValueBlur = () => {
    form.validate();
    const maxValue = form.getValues().vote_average_lte;
    if(form.isValid()) {
      setSearchParams({
        ...searchParams,
        'vote_average.lte': maxValue
      });
      getMoviesList(searchParams);
    }
  };

  const onResetForm =() => {
    form.reset();
    form.setFieldValue('vote_average_gte', '');
    form.setFieldValue('vote_average_lte', '');
    setSearchParams({
      language: 'en-US',
      sort_by: 'popularity.desc',
      page: 1,
    });
    setReset(true);
    getMoviesList(searchParams);
  };

  return (
    <form>
      <Group gap='md' wrap='nowrap' align='end'>
        <SimpleGrid cols={3}>
        <GenreSelect
          genres={genres}
          form={form}
          handleChangeGenres={handleChangeGenres}
          reset={reset}
          setReset={setReset}
        />

        <YearPickerInput
          size='md'
          label='Release year'
          placeholder='Select release year'
          rightSection={<IconChevronDown />}
          key={form.key('primary_release_year')}
          {...form.getInputProps('primary_release_year')}
          onChange={handleChangeYear}
        />
        <Input.Wrapper label='Ratings' error={form.errors.vote_average_lte || form.errors.vote_average_lte}>
          <Group gap='xxs' wrap='nowrap'>
            <NumberInput
              size='md'
              placeholder='From'
              min={1}
              max={10}
              value={form.getValues().vote_average_gte}
              key='vote_average_gte'
              {...form.getInputProps('vote_average_gte')}
              onChange={(value) => handlMinValueChange(value)}
              onBlur={handleMinValueBlur}
              error={''}
            />

            <NumberInput
              size='md'
              placeholder='To'
              min={1}
              max={10}
              value={form.getValues().vote_average_lte}
              key='vote_average_lte'
              {...form.getInputProps('vote_average_lte')}
              onChange={(value) => handlMaxValueChange(value)}
              onBlur={handleMaxValueBlur}
              error={''}
            />
          </Group>
        </Input.Wrapper>
        </SimpleGrid>

        <Box w='81px'>
          <Button
            variant='transparent'
            p={0}
            fw={FONT_WEIGHT_RESET}
            color='appColors.0'
            onClick={onResetForm}
          >
            Reset filters
          </Button>
        </Box>
      </Group>
    </form>
  );
};