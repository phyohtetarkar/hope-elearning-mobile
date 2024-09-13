import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { PropsWithChildren } from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import { DefaultStyles } from '../styles';
import { Text } from './Text';

interface ButtonProps {
  variant?: 'default' | 'primary' | 'danger' | 'light';
  size?: 'small' | 'medium';
  onPress?: () => void;
}

interface TextButtonProps extends ButtonProps {
  title: string;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  onPress,
  children,
}: PropsWithChildren<ButtonProps>) => {
  const { colors } = useAppSelector(selectTheme);

  const getBackgroundColor = (): Pick<ViewStyle, 'backgroundColor'> => {
    if (variant === 'default') {
      return {
        backgroundColor: colors.default,
      };
    }

    if (variant === 'danger') {
      return {
        backgroundColor: colors.error,
      };
    }

    if (variant === 'light') {
      return {
        backgroundColor: '#f2f2f2',
      };
    }

    return { backgroundColor: colors.primary };
  };

  const getSize = (): Pick<ViewStyle, 'height' | 'paddingHorizontal'> => {
    if (size === 'small') {
      return {
        height: 36,
        paddingHorizontal: 10,
      };
    }

    return {
      height: 46,
      paddingHorizontal: 16,
    };
  };

  return (
    <TouchableHighlight
      style={{
        borderRadius: styles.container.borderRadius,
      }}
      onPress={onPress}>
      <View
        style={{
          ...styles.container,
          ...getSize(),
          ...getBackgroundColor(),
        }}>
        {children}
      </View>
    </TouchableHighlight>
  );
};

export const TextButton = ({ title, ...props }: TextButtonProps) => {
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
      <Text style={{ ...styles.title, ...getColor() }}>{title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: DefaultStyles.values.borderRadius,
  },
  title: {
    ...DefaultStyles.fonts.medium,
  },
});
