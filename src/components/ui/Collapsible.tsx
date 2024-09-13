import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { ChevronDownIcon } from 'lucide-react-native';
import React, { ReactElement, useMemo, useState } from 'react';
import { StyleSheet, TouchableHighlight, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { DefaultStyles } from '../styles';
import { Divider } from './Divider';
import { Text } from './Text';

interface CollapsibleProps<T> {
  data: T[];
  headerTitle: string | ((toggle: () => void) => ReactElement);
  renderItem: (item: T, index: number) => ReactElement;
  kexExtractor: (item: T, index: number) => string;
  defaultCollapsed?: boolean;
  containerStyle?: ViewStyle;
  headerContainerStyle?: ViewStyle;
}

function Collapsible<T>({
  data,
  headerTitle,
  renderItem,
  kexExtractor,
  defaultCollapsed = true,
  containerStyle,
  headerContainerStyle,
}: CollapsibleProps<T>) {
  const { colors } = useAppSelector(selectTheme);

  const [isCollapsed, setCollapsed] = useState(defaultCollapsed);

  const len = useMemo(() => data.length, [data]);

  const height = useSharedValue(100);
  const degree = useSharedValue(180);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(!isCollapsed), {
      duration: 150,
    }),
  );

  const drivedDegree = useDerivedValue(() =>
    withTiming(degree.value * Number(!isCollapsed), {
      duration: 150,
    }),
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${drivedDegree.value}deg`,
      },
    ],
  }));

  const renderHeader = () => {
    if (typeof headerTitle === 'string') {
      return (
        <TouchableHighlight
          underlayColor={colors.highlight}
          onPress={() => {
            setCollapsed(!isCollapsed);
          }}>
          <View
            style={[
              {
                ...styles.headerContainer,
                borderColor: colors.border,
                backgroundColor: colors.background,
              },
              headerContainerStyle,
            ]}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            <View style={{ flex: 1 }} />
            <View>
              {/* {isCollapsed ? (
                <ChevronDownIcon color="gray" size={20} />
              ) : (
                <ChevronUpIcon color="gray" size={20} />
              )} */}
              <Animated.View style={iconStyle}>
                <ChevronDownIcon color="gray" size={20} />
              </Animated.View>
            </View>
          </View>
        </TouchableHighlight>
      );
    }

    return headerTitle(() => {
      setCollapsed(!isCollapsed);
    });
  };

  return (
    <View
      style={[
        { ...styles.container, borderColor: colors.border },
        containerStyle,
      ]}>
      {renderHeader()}
      {!isCollapsed && <Divider orientation="horizontal" stroke={0.7} />}
      <Animated.View style={bodyStyle}>
        <View
          style={styles.contentContainer}
          onLayout={e => {
            height.value = e.nativeEvent.layout.height;
          }}>
          {data.map((v, i) => {
            const lastIndex = len - 1;
            const renderSeparator = i < lastIndex;
            return (
              <React.Fragment key={kexExtractor(v, i)}>
                {renderItem(v, i)}
                {renderSeparator && (
                  <Divider orientation="horizontal" stroke={0.7} />
                )}
              </React.Fragment>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: DefaultStyles.values.borderRadius,
    borderWidth: 0.7,
    overflow: 'hidden',
  },
  headerContainer: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    flexShrink: 1,
    ...DefaultStyles.fonts.semiBold,
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
  },
});

export { Collapsible };
