import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import { DefaultStyles } from '../styles';
import { Text } from './Text';

interface AvatarProps {
  src?: ImageSourcePropType;
  name?: string;
  size?: number;
  borderWidth?: number;
  borderColor?: string;
}

export const Avatar = ({
  src,
  name,
  size = 54,
  borderWidth,
  borderColor,
}: AvatarProps) => {
  const { colors } = useAppSelector(selectTheme);

  const baseStyle = {
    width: size,
    aspectRatio: 1,
    borderRadius: size / 2,
  };

  return (
    <View
      style={{
        ...baseStyle,
        ...styles.container,
        borderWidth: borderWidth ?? 0,
        borderColor: borderColor ?? colors.border,
      }}>
      {src ? (
        <Image
          style={{ ...baseStyle, ...styles.image }}
          resizeMode="cover"
          source={src}
        />
      ) : (
        <>
          <View
            style={{
              ...baseStyle,
              ...styles.nameContainer,
              backgroundColor: colors.primary,
            }}>
            {name && (
              <Text
                style={{
                  ...styles.name,
                  color: colors.primaryForeground,
                }}>
                {name.substring(0, 2).toUpperCase()}
              </Text>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    flex: 1,
  },
  nameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    ...DefaultStyles.fonts.medium,
    position: 'absolute',
  },
});
