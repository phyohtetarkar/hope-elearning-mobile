import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigations';
import { ChartNoAxesColumnIncreasingIcon, StarIcon } from 'lucide-react-native';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { useAppearance } from '../appearance';
import { DefaultStyles } from '../styles';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';

interface CourseListItemProps {}

export const CourseListItem = ({}: CourseListItemProps) => {
  const {
    theme: { colors },
  } = useAppearance();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableHighlight
      style={{ borderRadius: styles.container.borderRadius }}
      underlayColor={colors.highlight}
      onPress={() => {
        navigation.navigate('CourseDetail');
      }}>
      <View
        style={{
          ...styles.container,
          borderColor: colors.border,
          backgroundColor: colors.card,
        }}>
        <Image
          source={require('@src/assets/images/course.jpg')}
          style={styles.cover}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={{ ...styles.categoryText, color: colors.primary }}>
            Programming
          </Text>
          <Spacer orientation="vertical" spacing={4} />
          <Text numberOfLines={1} style={{ ...styles.courseTitle }}>
            Introduction to NestJS
          </Text>

          <View style={{ flex: 1, flexDirection: 'column' }} />

          <View style={styles.footerContainer}>
            <View style={styles.footerItem}>
              <StarIcon color="#ffb703" fill="#ffb703" size={16} />
              <Text style={styles.footerText}>4.5</Text>
            </View>
            <View style={styles.footerItem}>
              <ChartNoAxesColumnIncreasingIcon color="gray" size={16} />
              <Text style={styles.footerText}>Beginner</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    gap: 10,
    borderRadius: DefaultStyles.values.borderRadius,
    borderWidth: 0.7,
  },
  cover: {
    aspectRatio: 4 / 3,
    borderRadius: DefaultStyles.values.borderRadius,
    width: 120,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  courseTitle: {
    fontSize: 16,
    ...DefaultStyles.fonts.semiBold,
  },
  categoryText: {
    fontSize: 12,
    ...DefaultStyles.fonts.medium,
  },
  footerContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
    ...DefaultStyles.fonts.regular,
  },
});
