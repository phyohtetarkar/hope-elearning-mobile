import { forwardRef } from 'react';
import { Text as NativeText, TextProps } from 'react-native';
import { useAppearance } from '../appearance';

export const Text = forwardRef<NativeText, TextProps>(
  ({ style, ...props }, ref) => {
    const {
      theme: { colors },
    } = useAppearance();
    return (
      <NativeText
        ref={ref}
        style={[
          {
            color: colors.text,
          },
          style,
        ]}
        {...props}
      />
    );
  },
);
