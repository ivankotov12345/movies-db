import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { GenreType } from '@app/types/types/response-types';

type PropsType = {
  genres: GenreType[],
}

const { Target, Dropdown, Option } = Combobox;
const { Placeholder } = Input;

export const GenreSelect: React.FC = () => {
  const combobox = useCombobox();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const onSelect = (value: string) => {
    setSelectedValues(prev => [...prev, value]);
  };

  const onRemove = (value: string) => {
    setSelectedValues(prev => prev.filter(item => item !== value));
  };

  const data = ['123', '456', '789'];

  return (
    <Combobox store={combobox}>
      <Target>
        <InputBase
          type='button'
          component='button'
          label='Genres'
          size='md'
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
        {data.map((item) => (
          <Option
            value={item}
            key={item}
            onClick={
              () => selectedValues.includes(item)
                ? onRemove(item)
                : onSelect(item)
            }
            active={selectedValues.includes(item)}
          >
              {item}
            </Option>
        ))}
      </Dropdown>
    </Combobox>
  );
};
