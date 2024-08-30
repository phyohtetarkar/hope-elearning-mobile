import { HeaderTitleProps } from '@react-navigation/elements';
import { StyleSheet, Text, View } from 'react-native';
import { useAppearance } from '../appearance';
import { BaseStyles } from '../styles';

export const HeaderLogo = (props: HeaderTitleProps) => {
  const {
    theme: { colors },
  } = useAppearance();
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.primary,
          width: 28,
          height: 28,
          borderRadius: BaseStyles.values.borderRadius,
        }}
      />
      <Text style={{ ...styles.title, color: colors.text }}>Logo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
});
