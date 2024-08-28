import { View } from 'react-native';

interface SpacerProps {
  orientation: 'vertical' | 'horizontal';
  spacing: number;
}

const Spacer = ({ orientation: direction, spacing }: SpacerProps) => {
  if (direction === 'vertical') {
    return <View style={{ height: spacing }} />;
  }
  return <View style={{ width: spacing }} />;
};

export { Spacer };
