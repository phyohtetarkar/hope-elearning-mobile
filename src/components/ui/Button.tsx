import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { PropsWithChildren, useMemo } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { DefaultStyles } from '../styles';
import { Text } from './Text';

interface ButtonProps {
  variant?: 'default' | 'primary';
  onPress?: () => void;
}

interface TextButtonProps extends ButtonProps {
  title: string;
}

export const Button = ({
  variant = 'primary',
  onPress,
  children,
}: PropsWithChildren<ButtonProps>) => {
  const { colors } = useAppSelector(selectTheme);

  const { backgroundColor } = useMemo(() => {
    if (variant === 'primary') {
      return {
        backgroundColor: colors.primary,
      };
    }

    return { backgroundColor: colors.default };
  }, [variant, colors]);

  return (
    <TouchableHighlight
      style={{
        borderRadius: styles.container.borderRadius,
      }}
      //   underlayColor={colors.highlight}
      onPress={onPress}>
      <View
        style={{
          ...styles.container,
          backgroundColor: backgroundColor,
        }}>
        {children}
      </View>
    </TouchableHighlight>
  );
};

export const TextButton = ({
  title,
  onPress,
  variant = 'primary',
}: TextButtonProps) => {
  const { colors } = useAppSelector(selectTheme);

  const { color } = useMemo(() => {
    if (variant === 'primary') {
      return {
        color: colors.primaryForeground,
      };
    }

    return { color: colors.text };
  }, [variant, colors]);

  return (
    <Button variant={variant} onPress={onPress}>
      <Text style={{ ...styles.title, color: color }}>{title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    height: 46,
    borderRadius: DefaultStyles.values.borderRadius,
  },
  title: {
    ...DefaultStyles.fonts.medium,
  },
});
