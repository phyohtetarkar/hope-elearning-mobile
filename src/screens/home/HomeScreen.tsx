import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppearance } from '@src/components/appearance';
import { BlogRecentItem } from '@src/components/blog/BlogRecentItem';
import { CourseListItem } from '@src/components/course/CourseListItem';
import { DefaultStyles } from '@src/components/styles';
import { Chip } from '@src/components/ui/Chip';
import { Spacer } from '@src/components/ui/Spacer';
import { Text } from '@src/components/ui/Text';
import { BottomTabParamList, RootStackParamList } from '@src/navigations';
import { SearchIcon } from 'lucide-react-native';
import type { PropsWithChildren } from 'react';
import React from 'react';
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
        <Text
          numberOfLines={1}
          style={{
            ...styles.headingTitle,
            color: colors.text,
          }}>
          {title}
        </Text>
      </View>
      {seeAll && (
        <TouchableOpacity activeOpacity={0.5} onPress={seeAll}>
          <Text
            style={{
              color: colors.primary,
              ...DefaultStyles.fonts.medium,
            }}>
            See all
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const HomeScreen = () => {
  const {
    theme: { dark, colors },
  } = useAppearance();

  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const tabNavigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const themeStyle = {
    backgroundColor: dark ? Colors.black : Colors.white,
  };

  const width = Dimensions.get('window').width;
  const categoryItemWidth = (width - 42) / 2;

  // useEffect(() => {
  //   tabNavigation.setOptions({});
  // }, [tabNavigation]);

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
      <View style={[themeStyle, styles.container]}>
        <Text
          style={{
            ...styles.searchTitle,
            color: colors.text,
          }}>
          What do you want to learn?
        </Text>

        <Spacer orientation="vertical" spacing={10} />

        <View
          style={{
            ...styles.searchContainer,
            backgroundColor: colors.default,
          }}>
          <SearchIcon color={'dimgray'} />
          <TextInput
            style={{ ...styles.searchInput }}
            placeholderTextColor={'dimgray'}
            placeholder="Browse courses..."
            readOnly
            onPress={() => {
              rootNavigation.navigate('CourseList');
            }}
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

        <Heading
          title="Top courses"
          seeAll={() => {
            rootNavigation.navigate('CourseList');
          }}
        />

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
            tabNavigation.navigate('Blogs');
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
    ...DefaultStyles.fonts.semiBold,
  },
  searchTitle: {
    fontSize: 24,
    ...DefaultStyles.fonts.semiBold,
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
