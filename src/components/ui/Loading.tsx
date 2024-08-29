import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useAppearance } from '../appearance';

interface LoadingProps {
  size?: number;
  strokeWidth?: number;
}

export const Loading = ({ size = 44, strokeWidth = 4 }: LoadingProps) => {
  const {
    theme: { dark, colors },
  } = useAppearance();
  const spinValue = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    anim.start();
    return () => {
      anim.reset();
    };
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg
          width={size}
          height={size}
          style={{ transform: [{ rotate: '-90deg' }] }}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.muted}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.primary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference * 0.3} ${circumference}`}
            strokeDashoffset={circumference * 0.7}
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
  },
});
