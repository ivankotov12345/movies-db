'use client';

import dynamic from 'next/dynamic';

const Movie = dynamic(() => import('./components/movie').then((mod) => mod.Movie), {
  ssr: false,
});


export default function MoviePage() {
   return (
    <Movie />
   );
}
