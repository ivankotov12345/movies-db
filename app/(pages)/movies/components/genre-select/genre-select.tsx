import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { GenreType } from '@app/types/types/response-types';

type GenreSelectProps = {
  genres: GenreType[],
}

const { Target, Dropdown, Option } = Combobox;
const { Placeholder } = Input;

export const GenreSelect: React.FC<GenreSelectProps> = ({ genres }) => {
  const combobox = useCombobox();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const onSelect = (value: string) => {
    setSelectedValues(prev => [...prev, value]);
  };

  const onRemove = (value: string) => {
    setSelectedValues(prev => prev.filter(item => item !== value));
  };

  return (
    <Combobox store={combobox}>
      <Target>
        <InputBase
          size='md'
          type='button'
          component='button'
          label='Genres'
          rightSection={<IconChevronDown />}
          onClick={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
          pointer
        >
          {selectedValues.length > 0
            ? selectedValues.join(', ')
            : <Placeholder>Select genre</Placeholder>
          }
        </InputBase>
      </Target>

      <Dropdown>
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
      </Dropdown>
    </Combobox>
  );
};
