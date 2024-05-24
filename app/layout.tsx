import { MantineProvider, ColorSchemeScript } from '@mantine/core';

import { theme } from '@theme';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@app/global.scss';

export const metadata = {
  title: 'Arrow Flicks',
  description: 'Movies database',
};

type PagesLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: PagesLayoutProps) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
        <link rel='shortcut icon' href='/favicon.svg' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <body style={{
        background: '#f5f5f6'
      }}>
        <MantineProvider theme={theme}>
          { children }
        </MantineProvider>
      </body>
    </html>
  );
}
