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
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { DefaultStyles } from '../styles';
import { CustomImage } from '../ui/CustomImage';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';

interface PostListItemProps {
  value: Post;
}

export const PostListItem = ({ value }: PostListItemProps) => {
  const { colors } = useAppSelector(selectTheme);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableHighlight
      underlayColor={colors.highlight}
      onPress={() => {
        navigation.navigate('BlogDetail', { slug: value.slug });
      }}>
      <View
        style={{
          ...styles.container,
          backgroundColor: colors.background,
        }}>
        <View style={styles.infoContainer}>
          <Text numberOfLines={2} style={{ ...styles.title }}>
            {value.title ?? ''}
          </Text>

          <Spacer orientation="vertical" spacing={6} />

          <Text numberOfLines={1} style={{ ...styles.wpmText }}>
            {wordPerMinute(value.wordCount)} min read
          </Text>

          <Spacer orientation="vertical" spacing={20} />

          <View style={styles.footerContainer}>
            <View style={styles.footerItem}>
              <CalendarDaysIcon color="gray" size={14} />
              <Text style={styles.footerText}>
                {formatRelativeTimestamp(value.publishedAt)}
              </Text>
            </View>

            <View style={styles.footerItem}>
              <EyeIcon color="gray" size={14} />
              <Text style={styles.footerText}>
                {formatAbbreviate(Number(value.meta?.viewCount ?? 0))}
              </Text>
            </View>
          </View>
        </View>

        <CustomImage
          source={
            value.cover
              ? { uri: value.cover }
              : require('@/assets/images/placeholder.jpg')
          }
          style={{ ...styles.cover, backgroundColor: colors.default }}
          resizeMode="cover"
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  cover: {
    aspectRatio: 3 / 2,
    overflow: 'hidden',
    width: 90,
    borderRadius: DefaultStyles.values.borderRadius,
  },
  infoContainer: {
    flex: 1,
    overflow: 'hidden',
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
    flex: 1,
    flexDirection: 'row',
    gap: 14,
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
