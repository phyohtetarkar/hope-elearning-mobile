import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppearance } from '@src/components/appearance';
import { DefaultStyles } from '@src/components/styles';
import { Avatar } from '@src/components/ui/Avatar';
import { Chip } from '@src/components/ui/Chip';
import { Divider } from '@src/components/ui/Divider';
import { Spacer } from '@src/components/ui/Spacer';
import { Text } from '@src/components/ui/Text';
import { formatRelativeTimestamp } from '@src/lib/utils';
import { RootStackParamList } from '@src/navigations';
import { useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const BlogDetailScreen = () => {
  const {
    theme: { colors },
  } = useAppearance();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const headerHidden = useRef(false);

  const [coverRatio, setCoverRatio] = useState(1);

  const avatarSize = 50;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider orientation="horizontal" stroke={0.5} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        stickyHeaderIndices={[1]}
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
              title: 'NoSQL data modeling',
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
          <Text style={{ ...styles.title }}>NoSQL data modeling</Text>

          <Spacer orientation="vertical" spacing={4} />

          <Text style={{ ...styles.minRead, color: 'gray' }}>5 min read</Text>

          <Spacer orientation="vertical" spacing={24} />

          <View style={styles.headingContainer}>
            <View
              style={{
                flexDirection: 'row',
                height: avatarSize,
              }}>
              {[1, 2].map((v, i, ary) => {
                const len = ary.length;
                return (
                  <View
                    key={i}
                    style={{
                      marginLeft: i > 0 ? -avatarSize / 2 : 0,
                      zIndex: len - i,
                    }}>
                    <Avatar
                      size={avatarSize}
                      borderWidth={3}
                      borderColor={colors.background}
                    />
                  </View>
                );
              })}
            </View>

            <View style={{ paddingVertical: 4, gap: 2 }}>
              <Text style={{ ...DefaultStyles.fonts.medium }}>
                By Cartoon, Believe
              </Text>
              <Text style={{ ...DefaultStyles.fonts.regular, color: 'gray' }}>
                {formatRelativeTimestamp('2024-08-26')}
              </Text>
            </View>
          </View>

          <Spacer orientation="vertical" spacing={16} />

          <View style={styles.coverContainer}>
            <Image
              source={require('@src/assets/images/nosql.png')}
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

          <Spacer orientation="vertical" spacing={16} />

          <View style={styles.tagContainer}>
            {[1, 2].map((v, i) => {
              return <Chip key={i} title="Database" onPress={() => {}} />;
            })}
          </View>

          <View style={{ height: 1000 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  coverContainer: {
    flexDirection: 'row',
  },
  cover: {
    flex: 1,
    borderRadius: DefaultStyles.values.borderRadius,
    borderWidth: 0.7,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    ...DefaultStyles.fonts.semiBold,
  },
  minRead: {
    textAlign: 'center',
    ...DefaultStyles.fonts.regular,
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: "center",
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default BlogDetailScreen;
