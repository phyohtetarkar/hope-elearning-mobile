import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { forwardRef } from 'react';
import { Text as NativeText, TextProps } from 'react-native';

export const Text = forwardRef<NativeText, TextProps>(
  ({ style, ...props }, ref) => {
    const { colors } = useAppSelector(selectTheme);

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
