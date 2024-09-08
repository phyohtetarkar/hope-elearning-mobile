import { CourseGridItem } from '@/components/course/CourseGridItem';
import { DefaultStyles } from '@/components/styles';
import { Divider } from '@/components/ui/Divider';
import { ErrorView } from '@/components/ui/ErrorView';
import { Loading } from '@/components/ui/Loading';
import { Spacer } from '@/components/ui/Spacer';
import { useAppSelector } from '@/lib/hooks';
import { Course, Page } from '@/lib/models';
import { getCourses } from '@/lib/services/CourseApi';
import { RootStackParamList } from '@/navigations';
import {
  getDefaultHeaderHeight,
  HeaderButtonProps,
} from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Settings2Icon } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  InteractionManager,
  ListRenderItemInfo,
  Platform,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Item } from 'react-navigation-header-buttons';
import { selectTheme } from '../themeSlice';

const screen = Dimensions.get('window');

const FilterButton = (props: HeaderButtonProps) => {
  return (
    <Item
      title="Filter"
      iconName="filter"
      IconComponent={Settings2Icon as any}
      color={props.tintColor}
    />
  );
};

const CourseListScreen = () => {
  const { colors } = useAppSelector(selectTheme);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const queryClient = useQueryClient();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isLoadingError,
    isFetchNextPageError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['/content/courses'],
    initialPageParam: 1,
    enabled: false,
    queryFn: ({ queryKey, pageParam, signal }) => {
      return getCourses({ page: pageParam, limit: 15 }, signal);
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.currentPage === lastPage.totalPage) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    },
  });

  const resetInfiniteQueryPagination = () => {
    const queryKey = ['/content/courses'];
    queryClient.setQueryData<InfiniteData<Page<Course>>>(queryKey, oldData => {
      if (!oldData) {
        return undefined;
      }

      return {
        pages: oldData.pages.slice(0, 1),
        pageParams: oldData.pageParams.slice(0, 1),
      };
    });
  };

  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(screen, false, 0);

  const searchInsets = Platform.select({
    ios: {
      height: 8,
      width: 100,
    },
    android: {
      height: 12,
      width: 128,
    },
    default: {
      height: 0,
      width: 0,
    },
  });

  const searchHeight = headerHeight - searchInsets.height;
  const searchWidth = screen.width - searchInsets.width;

  const scrollOffset = useRef(0);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => {
        return (
          <View
            style={{
              ...styles.searchContainer,
              height: searchHeight,
              width: searchWidth,
              borderRadius: searchHeight / 2,
            }}>
            <TextInput
              style={{ ...styles.searchInput, color: colors.text }}
              placeholderTextColor={'dimgray'}
              placeholder="Search courses..."
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              autoCorrect={false}
            />
          </View>
        );
      },
      headerRight: FilterButton,
    });
  }, [navigation, colors, searchWidth, searchHeight]);

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      isPending && refetch();
    });

    return () => {
      interactionPromise.cancel();
    };
  }, [refetch, isPending]);

  const renderItem = (info: ListRenderItemInfo<Course>) => {
    return <CourseGridItem value={info.item} />;
  };

  const itemSeparatorComponent = () => {
    return <Spacer orientation="vertical" spacing={16} />;
  };

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

    return (
      <FlatList
        data={data.pages.flatMap(d => d.contents)}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isFetchingNextPage}
            colors={[colors.primary]}
            tintColor={'gray'}
            onRefresh={() => {
              resetInfiniteQueryPagination();
              refetch();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 16,
        }}
        ItemSeparatorComponent={itemSeparatorComponent}
        ListFooterComponent={
          <>
            {isFetchingNextPage && <Loading size={36} />}
            {error && isFetchNextPageError && !isFetchingNextPage && (
              <ErrorView
                error={error}
                action={() => {
                  fetchNextPage();
                }}
              />
            )}
          </>
        }
        onEndReached={info => {
          if (isFetching || !hasNextPage || isFetchNextPageError) {
            return;
          }
          fetchNextPage();
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
    );
  };

  return (
    <>
      <Divider orientation="horizontal" stroke={0.5} />
      <View style={styles.container}>{content()}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'rgba(150, 150, 150, 0.15)',
  },
  searchInput: {
    flex: 1,
    ...DefaultStyles.fonts.regular,
  },
});

export default CourseListScreen;
