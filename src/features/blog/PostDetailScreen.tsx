import { fonts, modifiers, typography } from '@/components/styles';
import { Avatar } from '@/components/ui/Avatar';
import { CustomImage } from '@/components/ui/CustomImage';
import { ErrorView } from '@/components/ui/ErrorView';
import { Loading } from '@/components/ui/Loading';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { useAppSelector } from '@/lib/hooks';
import { getPostBySlug } from '@/lib/services/BlogApi';
import { formatRelativeTimestamp, wordPerMinute } from '@/lib/utils';
import { RootStackParamList } from '@/navigations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import {
  InteractionManager,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { selectTheme } from '../themeSlice';
import PostBody from './PostBody';

type Props = NativeStackScreenProps<RootStackParamList, 'BlogDetail'>;

const avatarSize = 50;

const PostDetailScreen = ({ navigation, route }: Props) => {
  const { colors } = useAppSelector(selectTheme);

  const { slug } = route.params;

  const headerHidden = useRef(false);

  const insets = useSafeAreaInsets();

  const [coverRatio, setCoverRatio] = useState(1);

  const { data, error, isPending, isFetching, isLoadingError, refetch } =
    useQuery({
      queryKey: ['/content/posts', slug],
      queryFn: ({ signal }) => getPostBySlug(slug, signal),
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

  if (isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <Loading />
      </SafeAreaView>
    );
  }

  if (error && isLoadingError) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorView
          error={error}
          action={() => {
            refetch();
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      stickyHeaderIndices={[1]}
      contentContainerStyle={{
        paddingBottom: insets.bottom + 16,
      }}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          colors={[colors.primary]}
          tintColor={'gray'}
          onRefresh={() => {
            refetch();
          }}
        />
      }
      onScroll={evt => {
        const limit = 100;
        const ne = evt.nativeEvent;
        const offset = ne.contentOffset.y;
        const end = ne.contentSize.height - ne.layoutMeasurement.height;
        // console.log(scrollOffset.current > offset ? 'down' : 'up');
        // if (offset > 0 && offset <= end) {
        //   scrollOffset.current = offset;
        // }

        if (offset > limit && !headerHidden.current) {
          navigation.setOptions({
            title: data.title ?? '',
          });
          headerHidden.current = true;
        } else if (offset < limit && headerHidden.current) {
          navigation.setOptions({
            title: '',
          });
          headerHidden.current = false;
        }
      }}>
      <View style={styles.container}>
        <Text style={{ ...styles.title }}>{data.title}</Text>

        <Spacer orientation="vertical" spacing={4} />

        <Text style={{ ...styles.minRead, color: 'gray' }}>
          {wordPerMinute(data.wordCount)} min read
        </Text>

        <Spacer orientation="vertical" spacing={24} />

        <View style={styles.headingContainer}>
          <View
            style={{
              flexDirection: 'row',
              height: avatarSize,
            }}>
            {data.authors?.map((a, i, ary) => {
              const len = ary.length;
              return (
                <View
                  key={i}
                  style={{
                    marginLeft: i > 0 ? -avatarSize / 2 : 0,
                    zIndex: len - i,
                  }}>
                  <Avatar
                    src={a.image ? { uri: a.image } : undefined}
                    name={a.nickname}
                    size={avatarSize}
                    borderWidth={3}
                    borderColor={colors.background}
                  />
                </View>
              );
            })}
          </View>

          <View style={{ paddingVertical: 4, gap: 2 }}>
            <Text style={fonts.medium}>
              By {data.authors?.map(a => a.nickname).join(', ')}
            </Text>
            <Text style={{ color: 'gray' }}>
              {formatRelativeTimestamp(data.publishedAt)}
            </Text>
          </View>
        </View>

        <Spacer orientation="vertical" spacing={16} />

        <View style={styles.coverContainer}>
          <CustomImage
            source={
              data.cover
                ? { uri: data.cover }
                : require('@/assets/images/placeholder.jpg')
            }
            style={{
              ...styles.cover,
              borderColor: colors.border,
              aspectRatio: coverRatio,
            }}
            onLoad={evt => {
              const { width, height } = evt.nativeEvent.source;

              setCoverRatio(width / height);
            }}
          />
        </View>

        <Spacer orientation="vertical" spacing={24} />
        <PostBody post={data} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  coverContainer: {
    flexDirection: 'row',
  },
  cover: {
    flex: 1,
    borderRadius: modifiers.borderRadius,
    borderWidth: 0.7,
  },
  title: {
    textAlign: 'center',
    ...typography.h3,
  },
  minRead: {
    textAlign: 'center',
    ...typography.md,
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});

export default PostDetailScreen;
