import { useMemo, type ReactNode } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { useAppearance } from '../appearance';
import { Text } from './Text';
import { DefaultStyles } from '../styles';

interface ChipProps {
  title: string;
  variant?: 'default' | 'primary';
  leading?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
}

const Chip = ({
  title,
  variant = 'default',
  leading,
  trailing,
  onPress,
}: ChipProps) => {
  const {
    theme: { colors },
  } = useAppearance();

  const { color, backgroundColor } = useMemo(() => {
    if (variant === 'primary') {
      return {
        color: colors.primaryForeground,
        backgroundColor: colors.primary,
      };
    }

    return { color: colors.text, backgroundColor: colors.default };
  }, [variant, colors]);

  return (
    <TouchableHighlight
      style={{
        borderRadius: styles.container.borderRadius,
      }}
      underlayColor={colors.highlight}
      onPress={onPress}>
      <View
        style={{
          ...styles.container,
          backgroundColor: backgroundColor,
        }}>
        {leading}
        <Text
          style={{
            ...styles.title,
            color: color,
          }}>
          {title}
        </Text>
        {trailing}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
    gap: 8,
  },
  title: {
    ...DefaultStyles.fonts.medium,
  },
});

export { Chip };
