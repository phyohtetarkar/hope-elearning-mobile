import { StarIcon } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { useAppearance } from '../appearance';

interface RatingProps {
  rating: number;
}

const stars = [1, 2, 3, 4, 5];

export const Rating = ({ rating }: RatingProps) => {
  const {
    theme: { dark, colors },
  } = useAppearance();

  let iconSize = 16;

  const defaultColor = dark ? '#7a7a7a' : '#cbcbcb';
  const activeColor = '#ffb703';

  return (
    <View style={styles.container}>
      {stars.map((e, i) => {
        if (rating >= e) {
          return (
            <StarIcon
              key={i}
              size={iconSize}
              fill={activeColor}
              color={activeColor}
            />
          );
        }

        const scale = e - rating;

        if (scale < 1) {
          let width = 1 - scale;
          if (width < 0.4) {
            width += 0.05;
          } else if (width > 0.5) {
            width -= 0.05;
          }
          return (
            <View key={i} style={{ width: iconSize, position: 'relative' }}>
              <View style={{ position: 'absolute', left: 0 }}>
                <StarIcon
                  size={iconSize}
                  fill={defaultColor}
                  color={defaultColor}
                />
              </View>
              <View
                style={{
                  width: iconSize * width,
                  overflow: 'hidden',
                  zIndex: 10,
                }}>
                <StarIcon
                  size={iconSize}
                  fill={activeColor}
                  color={activeColor}
                />
              </View>
            </View>
          );
        }

        return (
          <StarIcon
            key={i}
            size={iconSize}
            fill={defaultColor}
            color={defaultColor}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1.5,
  },
});
