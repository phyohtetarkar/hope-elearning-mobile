import { HeaderTitleProps } from '@react-navigation/elements';
import { StyleSheet, Text, View } from 'react-native';
import { useAppearance } from '../appearance';

export const HeaderLogo = (props: HeaderTitleProps) => {
  const {
    theme: { dark, colors },
  } = useAppearance();
  return (
    <View style={styles.container}>
      {/* <View
        style={{
          backgroundColor: colors.primary,
          width: 28,
          height: 28,
          borderRadius: BaseStyles.values.borderRadius,
        }}
      /> */}
      <Text style={{ ...styles.title, color: colors.text }}>
        <Text style={{ ...styles.title, fontSize: 30, color: colors.primary }}>
          H
        </Text>
        ope
      </Text>

      {/* <Image
        source={src}
        style={{
          height: 28,
          aspectRatio: 474 / 218,
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontFamily: 'Lexend-Bold',
    fontSize: 24,
    letterSpacing: 1.5,
  },
});
