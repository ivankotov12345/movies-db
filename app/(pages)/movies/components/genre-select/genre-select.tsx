import { Combobox, Input, InputBase, ScrollArea, Text, useCombobox } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconChevronDown } from '@tabler/icons-react';
import {  useCallback, useEffect, useMemo, useState } from 'react';
import { FormValues } from '@app/types/types/form-types';
import { GenreType } from '@app/types/types/response-types';

type GenreSelectProps = {
  genres: GenreType[],
  reset: boolean,
  setReset: (reset: boolean) => void,
  form: UseFormReturnType<FormValues>,
  handleChangeGenres: (selectedGenres: string | undefined) => void
}

const { Target, Dropdown, Option } = Combobox;
const { Placeholder } = Input;

export const GenreSelect: React.FC<GenreSelectProps> = ({ genres, form, handleChangeGenres, reset, setReset}) => {
  const combobox = useCombobox();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedIdList, setSelectedIdList] = useState<string>();

  const selectedOptions = useMemo<string>(() => {
    const genresIdList = genres
    .filter(genre => selectedValues.includes(genre.name))
    .map(genre => genre.id).join(',');
    form.setFieldValue('with_genres', genresIdList);
    return genresIdList;
  }, [form, genres, selectedValues]);


  useEffect(() => {
    setSelectedIdList(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    if (reset) {
      setSelectedValues([]);
      setSelectedIdList(undefined);
      setReset(false);
    }
  }, [reset, setReset]);

  const onSelect = useCallback((value: string) => {
    setSelectedValues(prev => [...prev, value]);
  }, []);

  const onRemove = useCallback((value: string) => {
    setSelectedValues(prev => prev.filter(item => item !== value));
  }, []);

  return (
    <Combobox store={combobox} onOptionSubmit={() => handleChangeGenres(selectedIdList)}>
      <Target>
        <InputBase
          size='md'
          type='button'
          component='button'
          label='Genres'
          rightSection={
          <IconChevronDown
   
          />
        }
          onClick={() => combobox.toggleDropdown()}
          onBlur={() =>combobox.closeDropdown()}
          key={form.key('with_genres')}
          {...form.getInputProps('with_genres')}
          pointer
        >
          {selectedIdList
            ? <Text lineClamp={1}>{selectedValues.join(', ')}</Text>
            : <Placeholder>Select genre</Placeholder>
          }
        </InputBase>
      </Target>

      <Dropdown>
        <ScrollArea h={224}>
          {genres.map(({ name, id }) => (
            <Option
              value={name}
              key={id}
              onClick={
                () => selectedValues.includes(name)
                  ? onRemove(name)
                  : onSelect(name)
              }
              active={selectedValues.includes(name)}
            >
                {name}
              </Option>
          ))}
        </ScrollArea>
      </Dropdown>

    </Combobox>
  );
};

/* color={isOpen ? theme.colors.appColors[6] : theme.colors.appColors[1]} */

/* style={{
  transform: isOpen ? 'rotate(180deg)' : 'rotate(180deg)'
}} */