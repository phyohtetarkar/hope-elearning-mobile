import { Platform, StyleSheet } from 'react-native';

export const BaseStyles = StyleSheet.create({
  values: {
    borderRadius: 5,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#999',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 7,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
