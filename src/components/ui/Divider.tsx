import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { View, ViewStyle } from 'react-native';

interface DividerProps {
  orientation: 'vertical' | 'horizontal';
  stroke?: number;
  style?: ViewStyle;
}

const Divider = ({ orientation, stroke = 1, style }: DividerProps) => {
  const { colors } = useAppSelector(selectTheme);

  if (orientation === 'vertical') {
    return (
      <View
        style={[
          {
            width: stroke,
            backgroundColor: colors.border,
          },
          style,
        ]}
      />
    );
  }
  return (
    <View
      style={[
        {
          height: stroke,
          backgroundColor: colors.border,
        },
        style,
      ]}
    />
  );
};

const ListDivider = () => {
  return <Divider orientation="horizontal" stroke={0.8} />;
};

export { Divider, ListDivider };
