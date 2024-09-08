import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { View } from 'react-native';

interface DividerProps {
  orientation: 'vertical' | 'horizontal';
  stroke?: number;
}

const Divider = ({ orientation, stroke = 1 }: DividerProps) => {
  const { colors } = useAppSelector(selectTheme);

  if (orientation === 'vertical') {
    return (
      <View
        style={{
          width: stroke,
          backgroundColor: colors.border,
        }}
      />
    );
  }
  return (
    <View
      style={{
        height: stroke,
        backgroundColor: colors.border,
      }}
    />
  );
};

const ListDivider = () => {
  return <Divider orientation="horizontal" stroke={0.8} />;
};

export { Divider, ListDivider };
