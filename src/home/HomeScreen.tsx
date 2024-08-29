import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { BottomTabParamList } from '@src/MainTabs';
import { useAppearance } from '@src/components/appearance';
import { BlogRecentItem } from '@src/components/blog/BlogRecentItem';
import { CourseListItem } from '@src/components/course/CourseListItem';
import { CFText } from '@src/components/ui/CFText';
import { Chip } from '@src/components/ui/Chip';
import { CustomStatusBar } from '@src/components/ui/CustomStatusBar';
import { Spacer } from '@src/components/ui/Spacer';
import { SearchIcon } from 'lucide-react-native';
import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type HeadingProps = PropsWithChildren<{
  title: string;
  seeAll?: () => void;
}>;

const Heading = ({ title, seeAll }: HeadingProps) => {
  const {
    theme: { colors },
  } = useAppearance();
  return (
    <View style={styles.headingContainer}>
      <View style={{ flex: 1 }}>
        <CFText
          numberOfLines={1}
          style={{
            ...styles.headingTitle,
            color: colors.text,
          }}>
          {title}
        </CFText>
      </View>
      {seeAll && (
        <TouchableOpacity activeOpacity={0.5} onPress={seeAll}>
          <CFText
            style={{
              color: colors.primary,
              fontWeight: '500',
            }}>
            See all
          </CFText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const HomeScreen = () => {
  const {
    theme: { dark, colors },
  } = useAppearance();

  const navigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const themeStyle = {
    backgroundColor: dark ? Colors.black : Colors.white,
  };

  const width = Dimensions.get('window').width;
  const categoryItemWidth = (width - 42) / 2;

  useEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  const renderCategoryItem = (item: ListRenderItemInfo<number>) => {
    return <Chip title="Programming" onPress={() => {}} />;
  };

  const renderCourseItem = (item: ListRenderItemInfo<number>) => {
    return (
      <View
        style={{
          flex: 1,
          width: 320,
        }}>
        <CourseListItem />
      </View>
    );
  };

  const renderBlogItem = (item: ListRenderItemInfo<number>) => {
    return (
      <View
        style={{
          flex: 1,
          width: 300,
        }}>
        <BlogRecentItem />
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl
          refreshing={false}
          colors={[colors.primary]}
          tintColor={'gray'}
          onRefresh={() => {}}
        />
      }>
      <CustomStatusBar style="dark" />
      <View style={[themeStyle, styles.container]}>
        <CFText
          style={{
            ...styles.searchTitle,
            color: colors.text,
          }}>
          What do you want to learn?
        </CFText>

        <Spacer orientation="vertical" spacing={10} />

        <View
          style={{
            ...styles.searchContainer,
            backgroundColor: colors.muted,
          }}>
          <SearchIcon color={'gray'} />
          <TextInput
            style={{ ...styles.searchInput }}
            placeholderTextColor={'#aaa'}
            placeholder="Browse courses..."
            readOnly
          />
        </View>

        <Spacer orientation="vertical" spacing={24} />

        <Heading title="Categories" seeAll={() => {}} />

        <Spacer orientation="vertical" spacing={12} />

        <View style={styles.categoryContainer}>
          {[1, 2, 3, 4, 5].map(c => {
            return <Chip key={c} title="Programming" onPress={() => {}} />;
          })}
        </View>

        <Spacer orientation="vertical" spacing={24} />

        <Heading title="Top courses" seeAll={() => {}} />

        <Spacer orientation="vertical" spacing={12} />

        <FlatList
          data={[1, 2, 3]}
          renderItem={renderCourseItem}
          keyExtractor={item => item.toString()}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          showsHorizontalScrollIndicator={false}
        />

        <Spacer orientation="vertical" spacing={24} />

        <Heading
          title="Recent posts"
          seeAll={() => {
            navigation.navigate('Blogs');
          }}
        />

        <Spacer orientation="vertical" spacing={12} />

        <FlatList
          data={[1, 2, 3]}
          renderItem={renderBlogItem}
          keyExtractor={item => item.toString()}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
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
  headingTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 23,
    paddingHorizontal: 16,
    height: 46,
  },
  searchInput: {
    flex: 1,
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default HomeScreen;
