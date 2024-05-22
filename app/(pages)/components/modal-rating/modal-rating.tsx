import { Box, Button, Divider, Modal, Rating, Stack, Text, Title } from '@mantine/core';
import { RADIUS_SMALL } from '@app/constants/constants';
import { MovieResponseType, MovieType } from '@app/types/types/response-types';

type ModalProps = {
  opened: boolean,
  close: () => void,
  movie: MovieType | MovieResponseType,
  onSaveRating: (rating: number) => void,
  cardRating: number,
  setCardRating: (cardRating: number) => void,
}

export const ModalRating: React.FC<ModalProps> = ({
  opened,
  close,
  movie,
  onSaveRating,
  cardRating,
  setCardRating
}) => {

  const onButtonSaveClick = () => {
    onSaveRating(cardRating),
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
    >
      <Divider />
      <Stack p='md'>
        <Title order={4}>{movie.original_title}</Title>

        <Rating
          defaultValue={cardRating}
          value={cardRating}
          count={10}
          onChange={setCardRating}
          size='lg'
        />

        <Box>
          <Button onClick={onButtonSaveClick}>Save</Button>
          <Button>Remove rating</Button>
        </Box>
      </Stack>
    </Modal>
  );
};
