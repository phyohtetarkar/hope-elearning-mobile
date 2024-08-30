import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/MainNavigation';
import { formatRelativeTimestamp } from '@src/common/utils';
import { useAppearance } from '@src/components/appearance';
import { BaseStyles } from '@src/components/styles';
import { Avatar } from '@src/components/ui/Avatar';
import { CFText } from '@src/components/ui/CFText';
import { Chip } from '@src/components/ui/Chip';
import { Spacer } from '@src/components/ui/Spacer';
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

  const avatarSize = 48;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        stickyHeaderIndices={[1]}
        onScroll={evt => {
          const limit = 50;
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
          <CFText style={{ ...styles.title }}>NoSQL data modeling</CFText>

          <Spacer orientation="vertical" spacing={4} />

          <CFText style={{ ...styles.minRead, color: 'gray' }}>
            5 min read
          </CFText>

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

            <View style={{ paddingVertical: 8, gap: 2 }}>
              <CFText style={{}}>By Cartoon, Believe</CFText>
              <CFText style={{ color: 'gray' }}>
                {formatRelativeTimestamp('2024-08-26')}
              </CFText>
            </View>
          </View>

          <Spacer orientation="vertical" spacing={10} />

          <View style={styles.coverContainer}>
            <Image
              source={require('@src/common/nosql.png')}
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
    borderRadius: BaseStyles.values.borderRadius,
    borderWidth: 0.7,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  minRead: {
    textAlign: 'center',
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default BlogDetailScreen;
