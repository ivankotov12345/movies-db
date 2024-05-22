import { ActionIcon, Text, useMantineTheme } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import { FONT_WEIGHT_LOGO } from '@app/constants/constants';

type RatingButtonProps = {
  rating: number,
  open: () => void
}

export const RatingButton: React.FC<RatingButtonProps> = ({ rating, open }) => {
  const theme = useMantineTheme();

  const onRatingClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    open();
  };

  return (
    <ActionIcon
      variant='transparent'
      onClick={onRatingClick}
      w={43}
      h={28}
    > 
      <IconStarFilled
        color={
          rating > 0
            ? theme.colors.appColors[6]
            : theme.colors.appColors[2]
        }
        width={28}
        height={28}
      />
      {rating > 0 && <Text fw={FONT_WEIGHT_LOGO} c='black' pl={4}>{rating}</Text>}
    </ActionIcon>
  );
};
