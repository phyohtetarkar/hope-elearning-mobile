import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { formatRelativeTimestamp, wordPerMinute } from '@src/lib/utils';
import { CalendarDaysIcon, EyeIcon } from 'lucide-react-native';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { useAppearance } from '../appearance';
import { DefaultStyles } from '../styles';
import { Text } from '../ui/Text';
import { Spacer } from '../ui/Spacer';
import { RootStackParamList } from '@src/navigations';

interface BlogListItemProps {}

export const BlogListItem = ({}: BlogListItemProps) => {
  const {
    theme: { colors },
  } = useAppearance();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableHighlight
      underlayColor={colors.highlight}
      onPress={() => {
        navigation.navigate('BlogDetail');
      }}>
      <View
        style={{
          ...styles.container,
          backgroundColor: colors.background,
        }}>
        <View style={styles.infoContainer}>
          <Text
            numberOfLines={1}
            style={{ ...styles.title }}>
            NoSQL data modeling
          </Text>

          <Spacer orientation="vertical" spacing={4} />

          <Text numberOfLines={1} style={{ ...styles.wpmText }}>
            {wordPerMinute(150)} min read
          </Text>

          <Spacer orientation="vertical" spacing={16} />

          <View style={styles.footerContainer}>
            <View style={styles.footerItem}>
              <CalendarDaysIcon color="gray" size={14} />
              <Text style={styles.footerText}>
                {formatRelativeTimestamp('2024-07-26')}
              </Text>
            </View>

            <View style={styles.footerItem}>
              <EyeIcon color="gray" size={14} />
              <Text style={styles.footerText}>1k</Text>
            </View>
          </View>
        </View>

        <Image
          source={require('@src/assets/images/course.jpg')}
          style={styles.cover}
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
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  cover: {
    aspectRatio: 16 / 9,
    overflow: 'hidden',
    width: 100,
    borderRadius: DefaultStyles.values.borderRadius,
  },
  infoContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    ...DefaultStyles.fonts.semiBold
  },
  wpmText: {
    fontSize: 14,
    color: 'gray',
    ...DefaultStyles.fonts.regular
  },
  footerContainer: {
    flex: 1,
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
    ...DefaultStyles.fonts.regular
  },
});
