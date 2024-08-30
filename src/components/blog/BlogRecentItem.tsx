import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/MainNavigation';
import { formatRelativeTimestamp, wordPerMinute } from '@src/common/utils';
import { CalendarDaysIcon, EyeIcon } from 'lucide-react-native';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { useAppearance } from '../appearance';
import { BaseStyles } from '../styles';
import { CFText } from '../ui/CFText';
import { Divider } from '../ui/Divider';
import { Spacer } from '../ui/Spacer';

interface BlogRecentItemProps {}

export const BlogRecentItem = ({}: BlogRecentItemProps) => {
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
        navigation.navigate('BlogDetail');
      }}>
      <View
        style={{
          ...styles.container,
          borderColor: colors.border,
          backgroundColor: colors.card,
        }}>
        <View style={styles.cover}>
          <Image
            source={require('@src/common/course.jpg')}
            style={styles.cover}
            resizeMode="cover"
          />
        </View>

        <Divider orientation="horizontal" />

        <View style={styles.infoContainer}>
          <CFText
            numberOfLines={1}
            style={{ ...styles.title }}>
            NoSQL data modeling
          </CFText>

          <Spacer orientation="vertical" spacing={8} />

          <CFText numberOfLines={1} style={{ ...styles.wpmText }}>
            {wordPerMinute(150)} min read
          </CFText>

          <Spacer orientation="vertical" spacing={16} />

          <Divider orientation="horizontal" stroke={0.7} />

          <Spacer orientation="vertical" spacing={16} />

          <View style={{ ...styles.footerContainer }}>
            <View style={styles.footerItem}>
              <CalendarDaysIcon color="gray" size={14} />
              <CFText style={styles.footerText}>
                {formatRelativeTimestamp('2024-08-26')}
              </CFText>
            </View>

            <View style={{ flex: 1 }} />

            <View style={styles.footerItem}>
              <EyeIcon color="gray" size={14} />
              <CFText style={styles.footerText}>1k</CFText>
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
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  wpmText: {
    fontSize: 14,
    color: 'gray',
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
  },
});
