import { CourseGridItem } from '@/components/course/CourseGridItem';
import { ErrorView } from '@/components/ui/ErrorView';
import { Loading } from '@/components/ui/Loading';
import { Spacer } from '@/components/ui/Spacer';
import { useAppSelector, useResetInfiniteQuery } from '@/lib/hooks';
import { Course, Page } from '@/lib/models';
import { getCourses } from '@/lib/services/CourseApi';
import { RootStackParamList } from '@/navigations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import {
  FlatList,
  InteractionManager,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { selectTheme } from '../themeSlice';

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

  const { resetQuery } = useResetInfiniteQuery<Page<Course>>([
    '/content/courses',
  ]);

  const insets = useSafeAreaInsets();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: CourseListHeaderTitle,
  //     headerRight: CourseListHeaderRight,
  //   });
  // }, [navigation]);

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
              resetQuery();
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

  return <View style={styles.container}>{content()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CourseListScreen;
