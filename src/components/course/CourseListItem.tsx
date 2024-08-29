import { ChartNoAxesColumnIncreasingIcon, StarIcon } from 'lucide-react-native';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { useAppearance } from '../appearance';
import { BaseStyles } from '../styles';
import { Spacer } from '../ui/Spacer';
import { CFText } from '../ui/CFText';

interface CourseListItemProps {}

export const CourseListItem = ({}: CourseListItemProps) => {
  const {
    theme: { colors },
  } = useAppearance();

  return (
    <TouchableHighlight
      style={{ borderRadius: styles.container.borderRadius }}
      underlayColor={colors.highlight}
      onPress={() => {}}>
      <View
        style={{
          ...styles.container,
          borderColor: colors.border,
          backgroundColor: colors.card,
        }}>
        <Image
          source={require('./course.jpg')}
          style={styles.cover}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <CFText style={{ ...styles.categoryText, color: colors.primary }}>
            Programming
          </CFText>
          <Spacer orientation="vertical" spacing={4} />
          <CFText
            numberOfLines={1}
            style={{ ...styles.courseTitle }}>
            Introduction to Java
          </CFText>

          <View style={{ flex: 1, flexDirection: 'column' }} />

          <View style={styles.footerContainer}>
            <View style={styles.footerItem}>
              <StarIcon color="#ffb703" fill="#ffb703" size={16} />
              <CFText style={styles.footerText}>4.5</CFText>
            </View>
            <View style={styles.footerItem}>
              <ChartNoAxesColumnIncreasingIcon color="dimgray" size={16} />
              <CFText style={styles.footerText}>Beginner</CFText>
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
    borderRadius: BaseStyles.values.borderRadius,
    borderWidth: 0.7,
  },
  cover: {
    aspectRatio: 4 / 3,
    borderRadius: BaseStyles.values.borderRadius,
    width: 120,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  courseTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  categoryText: {
    fontWeight: '500',
    fontSize: 12,
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
    color: 'dimgray',
  },
});
