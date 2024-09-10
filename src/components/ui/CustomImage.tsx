import { forwardRef } from 'react';
import { Image, ImageProps } from 'react-native';

export const CustomImage = forwardRef<Image, ImageProps>(
  ({ source, ...props }, ref) => {
    let src = source;

    // if (typeof src === 'object' && 'uri' in src && src.uri) {
    //   src = { uri: src.uri.replace('localhost', '10.0.2.2') };
    // }

    return <Image ref={ref} {...props} source={src} />;
  },
);
