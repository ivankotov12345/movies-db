import { Box } from '@mantine/core';

type HeaderProps = {
  children: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  
  return (
    <Box component='header' py={42}>
      { children }
    </Box>
  );
};
