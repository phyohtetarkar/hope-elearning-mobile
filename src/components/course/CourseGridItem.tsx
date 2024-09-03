import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigations';
import { StarIcon } from 'lucide-react-native';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { useAppearance } from '../appearance';
import { DefaultStyles } from '../styles';
import { Divider } from '../ui/Divider';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';
import { Rating } from '../ui/Rating';

interface CourseGridItemProps {}

export const CourseGridItem = ({}: CourseGridItemProps) => {
  const {
    theme: { dark, colors },
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
        <View style={styles.cover}>
          <Image
            source={require('@src/assets/images/nestjs.png')}
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
            Intorducton to NestJS
          </Text>

          <Spacer orientation="vertical" spacing={8} />

          <Text style={{ ...styles.level, color: colors.primary }}>
            Beginner
          </Text>
        </View>

        <Divider orientation="horizontal" stroke={0.5} />

        <View style={{ ...styles.footerContainer }}>
          <Rating rating={4.5} />

          <View style={{ flex: 1 }} />

          <Text style={{ ...styles.footerText, ...DefaultStyles.fonts.medium }}>
            Free
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
