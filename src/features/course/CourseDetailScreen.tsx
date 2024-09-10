import { DefaultStyles } from '@/components/styles';
import { TextButton } from '@/components/ui/Button';
import { CustomImage } from '@/components/ui/CustomImage';
import { CustomWebView } from '@/components/ui/CustomWebView';
import { Divider } from '@/components/ui/Divider';
import { ErrorView } from '@/components/ui/ErrorView';
import { Loading } from '@/components/ui/Loading';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { useAppSelector } from '@/lib/hooks';
import { getCourseBySlug } from '@/lib/services/CourseApi';
import { uppercaseFirstChar } from '@/lib/utils';
import { RootStackParamList } from '@/navigations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { ChartNoAxesColumnIncreasingIcon, StarIcon } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
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

type Props = NativeStackScreenProps<RootStackParamList, 'CourseDetail'>;

const avatarSize = 48;

const CourseDetailScreen = ({ navigation, route }: Props) => {
  const { colors } = useAppSelector(selectTheme);

  const insets = useSafeAreaInsets();

  const headerHidden = useRef(false);

  const { slug } = route.params;

  const { data, error, isPending, isFetching, isLoadingError, refetch } =
    useQuery({
      queryKey: ['/content/courses', slug],
      queryFn: ({ signal }) => getCourseBySlug(slug, signal),
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

  const content = () => {
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
      <>
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
          }
          onScroll={evt => {
            const limit = 300;
            const ne = evt.nativeEvent;
            const offset = ne.contentOffset.y;
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
                }}
                resizeMode="cover"
              />
            </View>

            <Spacer orientation="vertical" spacing={16} />

            <Text style={{ ...styles.title }}>{data.title}</Text>

            <Spacer orientation="vertical" spacing={12} />

            <View style={styles.propsContainer}>
              <View style={styles.propsItem}>
                <StarIcon color="#ffb703" fill="#ffb703" size={16} />
                <Text style={styles.propsText}>
                  {data.meta?.rating ?? '0.0'}
                </Text>
              </View>
              <View style={styles.propsItem}>
                <ChartNoAxesColumnIncreasingIcon color="gray" size={16} />
                <Text style={styles.propsText}>
                  {uppercaseFirstChar(data.level)}
                </Text>
              </View>

              <View style={{ flex: 1 }} />

              <View
                style={{ ...styles.accessView, borderColor: colors.success }}>
                <Text style={{ ...styles.accessText, color: colors.success }}>
                  {uppercaseFirstChar(data.access)}
                </Text>
              </View>
            </View>

            <Spacer orientation="vertical" spacing={28} />

            <Text style={styles.heading}>Description</Text>
            <Spacer orientation="vertical" spacing={10} />

            <CustomWebView html={data.description} basic />

            <Spacer orientation="vertical" spacing={24} />

            <Text style={styles.heading}>Syllabus</Text>
            <Spacer orientation="vertical" spacing={10} />

            <Spacer orientation="vertical" spacing={24} />

            <Text style={styles.heading}>Authors</Text>
            <Spacer orientation="vertical" spacing={10} />
          </View>
        </ScrollView>
        <Divider orientation="horizontal" stroke={0.25} />
        <View
          style={{
            ...styles.footerContainer,
            paddingBottom: insets.bottom + 16,
            backgroundColor: colors.card,
          }}>
          <View style={{ flex: 1 }}>
            <TextButton variant="default" title="Reviews" onPress={() => {}} />
          </View>
          <View style={{ flex: 1 }}>
            <TextButton title="Enroll" onPress={() => {}} />
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Divider orientation="horizontal" stroke={0.5} />
      {content()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  coverContainer: {
    aspectRatio: 16 / 9,
  },
  cover: {
    flex: 1,
    aspectRatio: 16 / 9,
    borderRadius: DefaultStyles.values.borderRadius,
    borderWidth: 0.7,
  },
  title: {
    fontSize: 20,
    ...DefaultStyles.fonts.semiBold,
  },
  heading: {
    fontSize: 18,
    ...DefaultStyles.fonts.semiBold,
  },
  accessView: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: DefaultStyles.values.borderRadius,
  },
  accessText: {
    ...DefaultStyles.fonts.medium,
  },
  propsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  propsItem: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  propsText: {
    fontSize: 16,
    color: 'gray',
    ...DefaultStyles.fonts.regular,
  },
  footerContainer: {
    flexDirection: 'row',
    alignContent: 'stretch',
    padding: 16,
    gap: 10,
  },
});

export default CourseDetailScreen;
