import { View } from 'react-native';
import { useAppearance } from '../appearance';

interface DividerProps {
  orientation: 'vertical' | 'horizontal';
  stroke?: number;
}

const Divider = ({ orientation, stroke = 1 }: DividerProps) => {
  const {
    theme: { colors },
  } = useAppearance();

  if (orientation === 'vertical') {
    return (
      <View
        style={{
          flex: 1,
          width: stroke,
          backgroundColor: colors.border,
        }}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        height: stroke,
        backgroundColor: colors.border,
      }}
    />
  );
};

export { Divider };