import { PostListItem } from '@/components/blog/PostListItem';
import { Divider, ListDivider } from '@/components/ui/Divider';
import { ErrorView } from '@/components/ui/ErrorView';
import { Loading } from '@/components/ui/Loading';
import { useAppSelector } from '@/lib/hooks';
import { Page, Post } from '@/lib/models';
import { getPosts } from '@/lib/services/BlogApi';
import { RootStackParamList } from '@/navigations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Settings2Icon } from 'lucide-react-native';
import React, { useEffect } from 'react';
import {
  FlatList,
  InteractionManager,
  ListRenderItemInfo,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { selectTheme } from '../themeSlice';

const PostListScreen = () => {
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
    isFetchNextPageError,
    isLoadingError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['/content/posts'],
    initialPageParam: 1,
    enabled: false,
    queryFn: ({ queryKey, pageParam, signal }) => {
      return getPosts({ page: pageParam, limit: 15 }, signal);
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.currentPage === lastPage.totalPage) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: props => {
        return (
          <HeaderButtons>
            <Item
              title="Filter"
              iconName="filter"
              IconComponent={Settings2Icon as any}
              color={props.tintColor}
              onPress={() => {}}
            />
          </HeaderButtons>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      refetch();
    });

    return () => {
      interactionPromise.cancel();
    };
  }, [refetch]);

  const resetInfiniteQueryPagination = () => {
    const queryKey = ['/content/posts'];
    queryClient.setQueryData<InfiniteData<Page<Post>>>(queryKey, oldData => {
      if (!oldData) {
        return undefined;
      }

      return {
        pages: oldData.pages.slice(0, 1),
        pageParams: oldData.pageParams.slice(0, 1),
      };
    });
  };

  const renderItem = (info: ListRenderItemInfo<Post>) => {
    return <PostListItem value={info.item} />;
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
        ItemSeparatorComponent={ListDivider}
        ListFooterComponent={
          <>
            {data.pages.length > 0 && (
              <Divider orientation="horizontal" stroke={0.8} />
            )}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Divider orientation="horizontal" stroke={0.5} />
      <View style={styles.container}>{content()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default PostListScreen;
