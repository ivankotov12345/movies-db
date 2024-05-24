import { Button, Divider, Group, Modal, Rating, Stack, Text, Title } from '@mantine/core';
import { RADIUS_SMALL, SPACING_MAX } from '@app/constants/constants';

import styles from './modal-rating.module.scss';

type ModalProps = {
  opened: boolean,
  close: () => void,
  title: string,
  onSaveRating: (rating: number) => void,
  cardRating: number,
  setCardRating: (cardRating: number) => void,
  onButtonRemoveClick: () => void
}

export const ModalRating: React.FC<ModalProps> = ({
  opened,
  close,
  title,
  onSaveRating,
  cardRating,
  setCardRating,
  onButtonRemoveClick
}) => {

  const onButtonSaveClick = () => {
    onSaveRating(cardRating),
    close();
  };

  const onRemoveClick = () => {
    onButtonRemoveClick();
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      title={<Text>Your rating</Text>}
      p={0}
      radius={RADIUS_SMALL}
      size='sm'
      classNames={{
        overlay: styles.overlay,
      }}
    >
      <Divider />
      <Stack p='md'>
        <Title order={4}>{title}</Title>

        <Rating
          defaultValue={cardRating}
          value={cardRating}
          count={10}
          onChange={setCardRating}
          size='lg'
          w={SPACING_MAX}
          classNames={{
            root: styles.ratingWrapper
          }}
        />

        <Group gap={0}>
          <Button
            color='appColors.6'
            onClick={onButtonSaveClick}
            size='md'
          >
            Save
          </Button>
          <Button
            color='appColors.6'
            size='md'
            variant='transparent'
            onClick={onRemoveClick}
            >
              Remove rating
            </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
