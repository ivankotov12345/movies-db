import { Burger, Flex } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useContext } from 'react';
import { Context } from '@app/(pages)/context/context';
import { LAYOUT_MAX_WIDTH_TABLET } from '@app/constants/constants';

type HeaderProps = {
  children: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const { isBurgerOpen, setIsBurgerOpen } = useContext(Context);
  const { width } = useViewportSize();


  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <Flex component='header' justify='space-between' py={42} px='xs'>
      { children }

      {width <= LAYOUT_MAX_WIDTH_TABLET
      && (
        <Flex>
          <Burger
            opened={isBurgerOpen}
            onClick={toggleBurgerMenu}
          />
        </Flex>
      )}
    </Flex>
  );
};
