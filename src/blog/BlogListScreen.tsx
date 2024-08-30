import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@src/MainNavigation';
import { useAppearance } from '@src/components/appearance';
import { BlogListItem } from '@src/components/blog/BlogListItem';
import { Chip } from '@src/components/ui/Chip';
import { Divider } from '@src/components/ui/Divider';
import { ListFilterIcon } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const BlogListScreen = () => {
  const {
    theme: { dark, colors },
  } = useAppearance();

  const navigation =
    useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  const scrollOffset = useRef(0);

  const themeStyle = {
    backgroundColor: dark ? Colors.black : Colors.white,
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: props => {
        return (
          <HeaderButtons>
            <Item
              title="Filter"
              iconName="filter"
              IconComponent={ListFilterIcon as any}
            />
          </HeaderButtons>
        );
      },
    });
  }, [navigation, dark]);

  const renderBlogItem = (item: ListRenderItemInfo<number>) => {
    return <BlogListItem />;
  };

  return (
    <SafeAreaView style={[themeStyle, { flex: 1 }]}>
      <View style={{ flex: 1 }}>
        {/* <View
          style={{
            ...styles.tagContainer,
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
        </View> */}
        <Divider orientation='horizontal' stroke={0.7} />
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={renderBlogItem}
          keyExtractor={item => item.toString()}
          refreshControl={
            <RefreshControl
              refreshing={false}
              colors={[colors.primary]}
              tintColor={'gray'}
              onRefresh={() => {}}
            />
          }
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <Divider orientation="horizontal" stroke={0.7} />;
          }}

          // onScroll={evt => {
          //   const ne = evt.nativeEvent;
          //   const offset = ne.contentOffset.y;
          //   const end = ne.contentSize.height - ne.layoutMeasurement.height;
          //   // console.log(scrollOffset.current > offset ? 'down' : 'up');
          //   if (offset > 0 && offset <= end) {
          //     scrollOffset.current = offset;
          //   }
          // }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 16,
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 10,
  },
  tagContainer: {
    height: 54,
    borderBottomWidth: 0.7,
  },
});

export default BlogListScreen;
