import { useNavigation } from '@react-navigation/native';
import { useAppearance } from '@src/components/appearance';
import { BlogRecentItem } from '@src/components/blog/BlogRecentItem';
import { CourseListItem } from '@src/components/course/CourseListItem';
import { BaseStyles } from '@src/components/styles';
import { Chip } from '@src/components/ui/Chip';
import { Spacer } from '@src/components/ui/Spacer';
import { SearchIcon } from 'lucide-react-native';
import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type HeadingProps = PropsWithChildren<{
  title: string;
  seeAll?: () => void;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const {
    theme: { dark },
  } = useAppearance();
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: dark ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: dark ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

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
              fontWeight: '500',
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

  const navigation = useNavigation();

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
    <SafeAreaView style={[themeStyle, { flex: 1 }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        <View style={[themeStyle, styles.container]}>
          {/* <View
            style={{
              ...styles.bannerContainer,
              backgroundColor: colors.primary,
            }}></View> */}

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

          {/* <FlatList
            data={[1, 2, 3, 4]}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.toString()}
            horizontal={true}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            showsHorizontalScrollIndicator={false}
          /> */}

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

          <Heading title="Recent posts" seeAll={() => {}} />

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 16,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  bannerContainer: {
    flex: 1,
    aspectRatio: 6 / 3,
    borderRadius: BaseStyles.values.borderRadius,
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
  postContainer: {
    flex: 1,
    gap: 16,
    alignItems: 'stretch',
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default HomeScreen;
