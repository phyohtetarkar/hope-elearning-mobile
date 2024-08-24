import { Platform, StyleSheet } from 'react-native';

export const BaseStyles = StyleSheet.create({
  values: {
    borderRadius: 5,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#444',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 7,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
