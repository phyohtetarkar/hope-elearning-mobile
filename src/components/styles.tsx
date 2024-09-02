import { Platform, TextStyle } from 'react-native';

export const DefaultStyles = {
  values: {
    borderRadius: 3,
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
  fonts: {
    regular: Platform.select<TextStyle>({
      ios: {
        fontWeight: '400',
        fontFamily: 'Roboto',
      },
      android: {
        fontFamily: 'Roboto-Regular',
      },
    }),
    medium: Platform.select<TextStyle>({
      ios: {
        fontWeight: '500',
        fontFamily: 'Roboto',
      },
      android: {
        fontFamily: 'Roboto-Medium',
      },
    }),
    semiBold: Platform.select<TextStyle>({
      ios: {
        fontWeight: '600',
        fontFamily: 'Roboto',
      },
      android: {
        fontFamily: 'Roboto-Bold',
      },
    }),
    bold: Platform.select<TextStyle>({
      ios: {
        fontWeight: '700',
        fontFamily: 'Roboto',
      },
      android: {
        fontFamily: 'Roboto-Black',
      },
    }),
  },
};
