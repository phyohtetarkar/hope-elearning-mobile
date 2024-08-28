import { formatRelativeTimestamp, wordPerMinute } from '@src/common/utils';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useAppearance } from '../appearance';
import { BaseStyles } from '../styles';
import { Divider } from '../ui/Divider';
import { Spacer } from '../ui/Spacer';
import { CalendarDaysIcon, EyeIcon } from 'lucide-react-native';

interface BlogRecentItemProps {}

export const BlogRecentItem = ({}: BlogRecentItemProps) => {
  const {
    theme: { colors },
  } = useAppearance();

  return (
    <View
      style={{
        ...styles.container,
        borderColor: colors.border,
        backgroundColor: colors.card,
      }}>
      <View style={styles.cover}>
        <Image
          source={require('../course/course.jpg')}
          style={styles.cover}
          resizeMode="cover"
        />
      </View>

      <Divider orientation="horizontal" />

      <View style={styles.infoContainer}>
        <Text
          numberOfLines={1}
          style={{ ...styles.blogTitle, color: colors.text }}>
          NoSQL data modeling
        </Text>

        <Spacer orientation="vertical" spacing={8} />

        <Text numberOfLines={1} style={{ ...styles.wpmText }}>
          {wordPerMinute(150)} min read
        </Text>

        <Spacer orientation="vertical" spacing={16} />

        <Divider orientation="horizontal" stroke={0.7} />

        <Spacer orientation="vertical" spacing={16} />

        <View style={{ ...styles.footerContainer }}>
          <View style={styles.footerItem}>
            <CalendarDaysIcon color="dimgray" size={14} />
            <Text style={styles.footerText}>
              {formatRelativeTimestamp('2024-08-26')}
            </Text>
          </View>

          <View style={{ flex: 1 }} />

          <View style={styles.footerItem}>
            <EyeIcon color="dimgray" size={14} />
            <Text style={styles.footerText}>1k</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: BaseStyles.values.borderRadius,
    borderWidth: 0.7,
    overflow: 'hidden',
  },
  cover: {
    flex: 1,
    aspectRatio: 16 / 9,
    width: 300,
  },
  infoContainer: {
    flex: 1,
    overflow: 'hidden',
    padding: 16,
  },
  blogTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  wpmText: {
    fontSize: 14,
    color: 'dimgray',
  },
  footerContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  footerItem: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'dimgray',
  },
});
