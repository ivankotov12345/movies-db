import { Box, Button, Flex, Group, Input, NumberInput, Select, SimpleGrid } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { IconChevronDown } from '@tabler/icons-react';
import { Fragment, useState } from 'react';
import { FONT_WEIGHT_RESET } from '@app/constants/constants';
import { SORT_OPTIONS } from '@app/constants/sort-options';
import { GenreType } from '@app/types/types/response-types';
import { GenreSelect } from '../genre-select';

type FiltersListProps = {
  genres: GenreType[],
}

export const FiltersList: React.FC<FiltersListProps> = ({ genres }) => {
  const [minInputRating, setMinInputRating] = useState<string | number>();

  return (
    <Fragment>
      <Group gap='md' wrap='nowrap' align='end'>
        <SimpleGrid cols={3}>
        <GenreSelect genres={genres} />

        <YearPickerInput
          size='md'
          label='Release year'
          placeholder='Select release year'
          rightSection={<IconChevronDown />}
        />

        <Input.Wrapper label='Ratings'>
          <Group gap='xxs' wrap='nowrap'>
            <NumberInput
              size='md'
              placeholder='From'
              min={1}
              max={10}
              value={minInputRating}
              onChange={value => setMinInputRating(value)}
            />
            <NumberInput
              size='md'
              placeholder='To'
              min={minInputRating ? +minInputRating : undefined}
              max={10}
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
        >
          Reset filters
        </Button>
        </Box>
      </Group>

      <Flex justify='end'>
        <Select
          size='md'
          label='Sort by'
          data={SORT_OPTIONS}
          defaultValue='popularity.asc'
          withCheckIcon={false}
        />
      </Flex>
    </Fragment>
  );
};

