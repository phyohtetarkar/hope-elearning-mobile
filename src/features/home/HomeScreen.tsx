import { PostRecentItem } from '@/components/blog/PostRecentItem';
import { TopCourseItem } from '@/components/course/TopCourseItem';
import { fonts, typography } from '@/components/styles';
import { Chip } from '@/components/ui/Chip';
import { ErrorView } from '@/components/ui/ErrorView';
import { Loading } from '@/components/ui/Loading';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { useAppSelector } from '@/lib/hooks';
import { Course, Post } from '@/lib/models';
import { getPosts } from '@/lib/services/BlogApi';
import { getCategories } from '@/lib/services/CategoryApi';
import { getCourses } from '@/lib/services/CourseApi';
import { BottomTabParamList, RootStackParamList } from '@/navigations';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react-native';
import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import {
  FlatList,
  InteractionManager,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { selectTheme } from '../themeSlice';

const fetchHomeData = async (signal?: AbortSignal) => {
  const categoriesPromise = getCategories(
    {
      limit: 5,
    },
    signal,
  );

  const topCoursesPromise = getCourses(
    { orderBy: 'enrollment', limit: 5 },
    signal,
  );

  const recentPostsPromise = getPosts(
    {
      orderBy: 'publishedAt',
      limit: 5,
    },
    signal,
  );

  return await Promise.all([
    categoriesPromise,
    topCoursesPromise,
    recentPostsPromise,
  ]);
};

type HeadingProps = PropsWithChildren<{
  title: string;
  seeAll?: () => void;
}>;

const Heading = ({ title, seeAll }: HeadingProps) => {
  const { colors } = useAppSelector(selectTheme);

  return (
    <View style={styles.headingContainer}>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={typography.h4}>
          {title}
        </Text>
      </View>
      {seeAll && (
        <TouchableOpacity activeOpacity={0.5} onPress={seeAll}>
          <Text
            style={{
              ...fonts.medium,
              color: colors.primary,
            }}>
            See all
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const HomeScreen = () => {
  const { colors } = useAppSelector(selectTheme);

  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const tabNavigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const themeStyle = {
    backgroundColor: colors.background,
  };

  const { data, error, isPending, isFetching, isLoadingError, refetch } =
    useQuery({
      queryKey: ['/content/home'],
      queryFn: ({ signal }) => fetchHomeData(signal),
      enabled: false,
    });

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      isPending && refetch();
    });

    return () => {
      interactionPromise.cancel();
    };
  }, [refetch, isPending]);

  const renderCourseItem = (info: ListRenderItemInfo<Course>) => {
    return <TopCourseItem value={info.item} />;
  };

  const renderPostItem = (info: ListRenderItemInfo<Post>) => {
    return <PostRecentItem value={info.item} />;
  };

  const listItemSeparator = () => <View style={{ width: 10 }} />;

  const content = () => {
    if (isPending) {
      return <Loading />;
    }

    if (error && isLoadingError) {
      return (
        <ErrorView
          error={error}
          action={() => {
            refetch();
          }}
        />
      );
    }

    const [categories, courses, posts] = data;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            colors={[colors.primary]}
            tintColor={'gray'}
            onRefresh={() => {
              refetch();
            }}
          />
        }>
        <View style={[themeStyle, styles.container]}>
          <Text style={typography.h2}>What do you want to learn?</Text>

          <Spacer orientation="vertical" spacing={10} />

          <TouchableWithoutFeedback
            onPress={() => {
              rootNavigation.navigate('CourseList');
            }}>
            <View
              style={{
                ...styles.searchContainer,
              }}>
              <SearchIcon color={'dimgray'} />
              <TextInput
                style={{ ...styles.searchInput }}
                placeholderTextColor={'dimgray'}
                placeholder="Browse courses..."
                readOnly
                pointerEvents="none"
              />
            </View>
          </TouchableWithoutFeedback>

          <Spacer orientation="vertical" spacing={24} />

          <Heading title="Categories" seeAll={() => {}} />

          <Spacer orientation="vertical" spacing={12} />

          <View style={styles.categoryContainer}>
            {categories.contents.map((c, i) => {
              return <Chip key={i} title={c.name} onPress={() => {}} />;
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
            data={courses.contents}
            renderItem={renderCourseItem}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            ItemSeparatorComponent={listItemSeparator}
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
            data={posts.contents}
            renderItem={renderPostItem}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            ItemSeparatorComponent={listItemSeparator}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    );
  };

  return <View style={styles.root}>{content()}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 16,
    paddingBottom: 32,
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 23,
    paddingHorizontal: 16,
    height: 46,
    backgroundColor: 'rgba(150, 150, 150, 0.15)',
  },
  searchInput: {
    flex: 1,
    ...fonts.regular,
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default HomeScreen;
