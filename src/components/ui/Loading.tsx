import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

interface LoadingProps {
  size?: number;
  strokeWidth?: number;
  color1?: string;
  color2?: string;
}

const Loading = ({
  size = 44,
  strokeWidth = 4,
  color1,
  color2,
}: LoadingProps) => {
  const { colors } = useAppSelector(selectTheme);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const rotation = useSharedValue(0);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
    );
  }, [rotation]);

  return (
    <View style={styles.container}>
      <Animated.View style={rotateStyle}>
        <Svg
          width={size}
          height={size}
          style={{ transform: [{ rotate: '-90deg' }] }}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color1 ?? colors.default}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color2 ?? colors.primary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference * 0.4} ${circumference}`}
            strokeDashoffset={circumference}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
});

export { Loading };
