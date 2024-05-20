import { Image, Skeleton } from '@mantine/core';
import { default as NextImage } from 'next/image';
import { Fragment, useState } from 'react';
import { NoImagePlaceholder } from '../no-image-placeholder';

type PosterProps = {
  src: string,
  alt: string
  width: number,
  height: number,
}

export const Poster: React.FC<PosterProps> = ({ src, alt, width, height }) => {
  const [isLoadFail, setIsLoadFail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => setIsLoadFail(true);
  const handleImageOnLoad = () => setIsLoading(false);

  return (
    <Fragment>
      {isLoadFail
        ? <NoImagePlaceholder width={width} height={height} />
        : <Skeleton visible={isLoading} w={width}>
            <Image
              component={NextImage}
              src={src}
              alt={alt}
              width={width}
              height={height}
              loading='lazy'
              onLoad={handleImageOnLoad}
              onError={handleImageError}
              w={width}
            />
          </Skeleton>}
    </Fragment>
    
  );
};