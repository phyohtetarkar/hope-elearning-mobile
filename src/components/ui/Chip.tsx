import { useMemo, type ReactNode } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useAppearance } from '../appearance';

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

    return { color: colors.text, backgroundColor: colors.muted };
  }, [variant, colors]);

  return (
    <TouchableHighlight
      style={{
        borderRadius: styles.container.borderRadius,
      }}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
    gap: 8,
  },
  title: {
    fontWeight: '500',
  },
});

export { Chip };
