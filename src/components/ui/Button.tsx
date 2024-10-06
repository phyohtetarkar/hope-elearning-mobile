import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { PropsWithChildren } from 'react';
import {
  Pressable,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { fonts, modifiers } from '../styles';
import { Loading } from './Loading';
import { Text } from './Text';

interface ButtonProps {
  variant?: 'default' | 'primary' | 'danger' | 'light';
  size?: 'small' | 'medium';
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface TextButtonProps extends ButtonProps {
  title: string;
}

const Button = ({
  variant = 'primary',
  size = 'medium',
  onPress,
  disabled,
  loading,
  children,
}: PropsWithChildren<ButtonProps>) => {
  const { dark, colors } = useAppSelector(selectTheme);

  const getColors = () => {
    if (variant === 'default') {
      return {
        color: colors.text,
        backgroundColor: colors.default,
      };
    }

    if (variant === 'danger') {
      return {
        color: colors.errorForeground,
        backgroundColor: colors.error,
      };
    }

    if (variant === 'light') {
      return {
        color: '#222222',
        backgroundColor: '#f2f2f2',
      };
    }

    return {
      color: colors.primaryForeground,
      backgroundColor: colors.primary,
    };
  };

  const getSize = (): Pick<ViewStyle, 'height' | 'paddingHorizontal'> => {
    if (size === 'small') {
      return {
        height: 36,
        paddingHorizontal: 10,
      };
    }

    return {
      height: 44,
      paddingHorizontal: 16,
    };
  };

  const { color, backgroundColor } = getColors();

  return (
    <View
      style={{
        backgroundColor: dark ? 'black' : '#121212',
        borderRadius: modifiers.borderRadius,
      }}>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: disabled || loading || pressed ? 0.85 : 1.0,
          },
        ]}
        disabled={disabled || loading}
        onPress={onPress}>
        <View
          style={{
            ...styles.container,
            ...getSize(),
            backgroundColor: backgroundColor,
          }}>
          {loading && (
            <Loading
              size={16}
              strokeWidth={2}
              color1={color}
              color2={backgroundColor}
            />
          )}
          {children}
        </View>
      </Pressable>
    </View>
  );
};

const TextButton = ({ title, ...props }: TextButtonProps) => {
  const { colors } = useAppSelector(selectTheme);

  const getColor = (): Pick<TextStyle, 'color'> => {
    const variant = props.variant;
    if (variant === 'default') {
      return {
        color: colors.text,
      };
    }

    if (variant === 'danger') {
      return {
        color: colors.errorForeground,
      };
    }

    if (variant === 'light') {
      return {
        color: '#222222',
      };
    }

    return { color: colors.primaryForeground };
  };

  return (
    <Button {...props}>
      <Text style={{ ...fonts.medium, ...getColor() }}>{title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: modifiers.borderRadius,
    gap: 10,
  },
});

export { Button, TextButton };
