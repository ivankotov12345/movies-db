import { MantineProvider, ColorSchemeScript } from '@mantine/core';

import { theme } from '@app/theme';
import { AppLayout } from './components/app-layout';

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.css';
import '@app/global.scss';

export const metadata = {
  title: 'Arrow Flicks',
  description: 'Movies database',
};

type PagesLayoutProps = {
  children: React.ReactNode
}

export function generateStaticParams() {
  const categories = ['movies', 'rated'];

  return categories.map((item) =>({
    category: item
  }));
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
      <body>
        <MantineProvider theme={theme}>
          <AppLayout>
            { children }
          </AppLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
