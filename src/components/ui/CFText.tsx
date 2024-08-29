import { forwardRef } from 'react';
import { Text, TextProps } from 'react-native';
import { useAppearance } from '../appearance';

interface CFTextProps extends TextProps {}

/**
 * Custom Font Text
 */
export const CFText = forwardRef<Text, CFTextProps>(
  ({ style, ...props }, ref) => {
    const {
      theme: { colors },
    } = useAppearance();
    return (
      <Text
        ref={ref}
        style={[
          {
            fontFamily: '',
            color: colors.text,
          },
          style,
        ]}
        {...props}
      />
    );
  },
);
