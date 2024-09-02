import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppearance } from '@src/components/appearance';
import { DefaultStyles } from '@src/components/styles';
import { TextButton } from '@src/components/ui/Button';
import { Divider } from '@src/components/ui/Divider';
import { Spacer } from '@src/components/ui/Spacer';
import { Text } from '@src/components/ui/Text';
import { RootStackParamList } from '@src/navigations';
import { ChartNoAxesColumnIncreasingIcon, StarIcon } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CourseDetailScreen = () => {
  const {
    theme: { colors },
  } = useAppearance();

  const insets = useSafeAreaInsets();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const headerHidden = useRef(false);

  const [coverRatio, setCoverRatio] = useState(1);

  const avatarSize = 48;

  return (
    <>
      <Divider orientation="horizontal" stroke={0.5} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        stickyHeaderIndices={[1]}
        onScroll={evt => {
          const limit = 280;
          const ne = evt.nativeEvent;
          const offset = ne.contentOffset.y;
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
          <View style={styles.coverContainer}>
            <Image
              source={require('@src/assets/images/nestjs.png')}
              style={{
                ...styles.cover,
                borderColor: colors.border,
              }}
              resizeMode="cover"
            />
          </View>

          <Spacer orientation="vertical" spacing={16} />

          <Text style={{ ...styles.title }}>NoSQL data modeling</Text>

          <Spacer orientation="vertical" spacing={10} />

          <View style={styles.propsContainer}>
            <View style={styles.propsItem}>
              <StarIcon color="#ffb703" fill="#ffb703" size={16} />
              <Text style={styles.propsText}>4.5</Text>
            </View>
            <View style={styles.propsItem}>
              <ChartNoAxesColumnIncreasingIcon color="gray" size={16} />
              <Text style={styles.propsText}>Beginner</Text>
            </View>
          </View>

          <View style={{ height: 1000 }} />
        </View>
      </ScrollView>
      <Divider orientation="horizontal" stroke={0.25} />
      <View
        style={{
          ...styles.footerContainer,
          paddingBottom: insets.bottom + 16,
          backgroundColor: colors.card,
        }}>
        {/* <View style={{ flex: 1 }}>
          <TextButton variant="default" title="Bookmark" onPress={() => {}} />
        </View> */}
        <View style={{ flex: 1 }}>
          <TextButton title="Enroll" onPress={() => {}} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    ...DefaultStyles.fonts.semiBold
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
    ...DefaultStyles.fonts.regular
  },
  footerContainer: {
    flexDirection: 'row',
    alignContent: 'stretch',
    padding: 16,
    gap: 10,
  },
});

export default CourseDetailScreen;
