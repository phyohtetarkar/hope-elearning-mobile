import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Header, getDefaultHeaderHeight } from '@react-navigation/elements';
import { useAppearance } from '@src/components/appearance';
import { Chip } from '@src/components/ui/Chip';
import { useEffect, useRef } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BlogListScreenHeaderProps {
  headerProps: BottomTabHeaderProps;
}

const BlogListScreenHeader = ({ headerProps }: BlogListScreenHeaderProps) => {
  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(
    headerProps.layout,
    false,
    insets.top,
  );

  const {
    theme: { dark, colors },
  } = useAppearance();

  const marginTop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const collapseHeader = () => {
      Animated.timing(marginTop, {
        toValue: insets.top - headerHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };

    const expandHeader = () => {
      Animated.timing(marginTop, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };
  }, []);

  return (
    <>
      <Header
        {...headerProps.options}
        title="Blogs"
        headerShadowVisible={false}
        headerStyle={{
          backgroundColor: dark ? colors.card : colors.primary,
        }}
      />
      <View
        style={{
          ...styles.tagContainer,
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        }}>
        <FlatList
          data={[1, 2, 3]}
          renderItem={item => {
            return <Chip title="DevOps" onPress={() => {}} />;
          }}
          keyExtractor={item => item.toString()}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            alignItems: 'center',
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    height: 54,
    borderBottomWidth: 0.7,
  },
});

export default BlogListScreenHeader;
