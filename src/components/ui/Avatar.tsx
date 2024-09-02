import { Image, StyleSheet, View } from 'react-native';
import { useAppearance } from '../appearance';

interface AvatarProps {
  src?: string;
  size?: number;
  borderWidth?: number;
  borderColor?: string;
}

export const Avatar = ({
  src,
  size = 54,
  borderWidth,
  borderColor,
}: AvatarProps) => {
  const {
    theme: { colors },
  } = useAppearance();

  const baseStyle = {
    width: size,
    aspectRatio: 1,
    borderRadius: size / 2,
  };

  return (
    <View
      style={{
        ...baseStyle,
        borderWidth: borderWidth ? borderWidth : 0,
        borderColor: borderColor ?? colors.border,
      }}>
      <Image
        source={src ?? require('@src/assets/images/profile.png')}
        style={{ ...baseStyle, flex: 1 }}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
