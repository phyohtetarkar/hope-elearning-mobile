import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { Course } from '@/lib/models';
import { uppercaseFirstChar } from '@/lib/utils';
import { RootStackParamList } from '@/navigations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChartNoAxesColumnIncreasingIcon, StarIcon } from 'lucide-react-native';
import { Dimensions, StyleSheet, TouchableHighlight, View } from 'react-native';
import { DefaultStyles } from '../styles';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';
import { CustomImage } from '../ui/CustomImage';

interface TopCourseItemProps {
  value: Course;
}

const screen = Dimensions.get('screen');

export const TopCourseItem = ({ value }: TopCourseItemProps) => {
  const { colors } = useAppSelector(selectTheme);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableHighlight
      style={{ borderRadius: styles.container.borderRadius, flex: 1 }}
      underlayColor={colors.highlight}
      onPress={() => {
        navigation.navigate('CourseDetail', { slug: value.slug });
      }}>
      <View
        style={{
          ...styles.container,
          borderColor: colors.border,
          backgroundColor: colors.card,
        }}>
        <CustomImage
          source={
            value.cover
              ? { uri: value.cover }
              : require('@/assets/images/placeholder.jpg')
          }
          style={styles.cover}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={{ ...styles.category, color: colors.primary }}>
            {value.category?.name}
          </Text>
          <Spacer orientation="vertical" spacing={4} />
          <Text numberOfLines={2} style={{ ...styles.title }}>
            {value.title}
          </Text>

          <Spacer orientation="vertical" spacing={16} />

          <View style={{ flex: 1 }} />

          <View style={styles.footerContainer}>
            <View style={styles.footerItem}>
              <StarIcon color="#ffb703" fill="#ffb703" size={16} />
              <Text style={styles.footerText}>
                {value.meta?.rating ?? '0.0'}
              </Text>
            </View>
            <View style={styles.footerItem}>
              <ChartNoAxesColumnIncreasingIcon color="gray" size={16} />
              <Text style={styles.footerText}>
                {uppercaseFirstChar(value.level)}
              </Text>
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
    padding: 10,
    gap: 12,
    borderRadius: DefaultStyles.values.borderRadius,
    borderWidth: 0.7,
    width: screen.width - 80,
  },
  cover: {
    aspectRatio: 4 / 3,
    borderRadius: DefaultStyles.values.borderRadius,
    width: 120,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    ...DefaultStyles.fonts.semiBold,
  },
  category: {
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
