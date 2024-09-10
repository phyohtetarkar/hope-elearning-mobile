import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { Course } from '@/lib/models';
import { formatAbbreviate, uppercaseFirstChar } from '@/lib/utils';
import { RootStackParamList } from '@/navigations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { DefaultStyles } from '../styles';
import { Divider } from '../ui/Divider';
import { Rating } from '../ui/Rating';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';
import { DotIcon } from 'lucide-react-native';
import { CustomImage } from '../ui/CustomImage';

interface CourseGridItemProps {
  value: Course;
}

export const CourseGridItem = ({ value }: CourseGridItemProps) => {
  const { colors } = useAppSelector(selectTheme);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableHighlight
      style={{ borderRadius: styles.container.borderRadius }}
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
        <View style={styles.cover}>
          <CustomImage
            source={
              value.cover
                ? { uri: value.cover }
                : require('@/assets/images/placeholder.jpg')
            }
            style={styles.cover}
            resizeMode="cover"
          />

          {/* <View
            style={[
              {
                ...styles.priceContainer,
                position: 'absolute',
                backgroundColor: colors.primary,
              },
            ]}>
            <Text style={{ ...styles.price, color: colors.primaryForeground }}>Free</Text>
          </View> */}
        </View>

        <Divider orientation="horizontal" stroke={0.7} />

        <View style={styles.infoContainer}>
          <Text numberOfLines={2} style={{ ...styles.title }}>
            {value.title}
          </Text>

          <Spacer orientation="vertical" spacing={8} />

          <View style={styles.subtitleContainer}>
            <Text style={{ ...styles.footerText }}>
              {formatAbbreviate(Number(value.meta?.enrolledCount ?? 0))}
              &nbsp;Enrolled
            </Text>
            <DotIcon color={colors.highlight} />
            <Text style={{ ...styles.level, color: colors.primary }}>
              {uppercaseFirstChar(value.level)}
            </Text>
          </View>
        </View>

        <Divider orientation="horizontal" stroke={0.5} />

        <View style={{ ...styles.footerContainer }}>
          <Rating rating={Number(value.meta?.rating ?? 0)} />

          <View style={{ flex: 1 }} />

          <Text style={{ ...styles.footerText, ...DefaultStyles.fonts.medium }}>
            {uppercaseFirstChar(value.access)}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: DefaultStyles.values.borderRadius,
    borderWidth: 0.7,
    overflow: 'hidden',
  },
  cover: {
    flex: 1,
    aspectRatio: 16 / 9,
  },
  infoContainer: {
    flex: 1,
    overflow: 'hidden',
    padding: 16,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    ...DefaultStyles.fonts.semiBold,
  },
  level: {
    fontSize: 14,
    ...DefaultStyles.fonts.regular,
  },
  footerContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 16,
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
