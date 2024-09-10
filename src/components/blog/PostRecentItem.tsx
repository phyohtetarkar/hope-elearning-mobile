import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { Post } from '@/lib/models';
import {
  formatAbbreviate,
  formatRelativeTimestamp,
  wordPerMinute,
} from '@/lib/utils';
import { RootStackParamList } from '@/navigations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarDaysIcon, EyeIcon } from 'lucide-react-native';
import { Dimensions, StyleSheet, TouchableHighlight, View } from 'react-native';
import { DefaultStyles } from '../styles';
import { CustomImage } from '../ui/CustomImage';
import { Divider } from '../ui/Divider';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';

interface PostRecentItemProps {
  value: Post;
}
const screen = Dimensions.get('screen');

export const PostRecentItem = ({ value }: PostRecentItemProps) => {
  const { colors } = useAppSelector(selectTheme);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableHighlight
      style={{ flex: 1, borderRadius: styles.container.borderRadius }}
      underlayColor={colors.highlight}
      onPress={() => {
        navigation.navigate('BlogDetail', { slug: value.slug });
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
        </View>

        <Divider orientation="horizontal" stroke={0.7} />

        <View style={styles.infoContainer}>
          <Text numberOfLines={2} style={{ ...styles.title }}>
            {value.title}
          </Text>

          <Spacer orientation="vertical" spacing={8} />

          <Text numberOfLines={1} style={{ ...styles.wpmText }}>
            {wordPerMinute(value.wordCount)} min read
          </Text>

          <Spacer orientation="vertical" spacing={16} />

          <View style={{ flex: 1, flexGrow: 1 }} />

          <Divider orientation="horizontal" stroke={0.7} />

          <Spacer orientation="vertical" spacing={16} />

          <View style={{ ...styles.footerContainer }}>
            <View style={styles.footerItem}>
              <CalendarDaysIcon color="gray" size={14} />
              <Text style={styles.footerText}>
                {formatRelativeTimestamp(value.publishedAt)}
              </Text>
            </View>

            <View style={{ flex: 1 }} />

            <View style={styles.footerItem}>
              <EyeIcon color="gray" size={14} />
              <Text style={styles.footerText}>
                {formatAbbreviate(Number(value.meta?.viewCount ?? 0))}
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
    borderRadius: DefaultStyles.values.borderRadius,
    borderWidth: 0.7,
    overflow: 'hidden',
    width: screen.width - 80,
  },
  cover: {
    aspectRatio: 16 / 9,
  },
  infoContainer: {
    flex: 1,
    overflow: 'hidden',
    padding: 16,
  },
  title: {
    fontSize: 16,
    ...DefaultStyles.fonts.semiBold,
  },
  wpmText: {
    fontSize: 14,
    color: 'gray',
    ...DefaultStyles.fonts.regular,
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
    fontSize: 14,
    color: 'gray',
    ...DefaultStyles.fonts.regular,
  },
});
