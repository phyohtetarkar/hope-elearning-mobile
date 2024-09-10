import { Platform, TextStyle } from 'react-native';

type TextFontStyle = Pick<TextStyle, 'fontFamily' | 'fontWeight'>;

export const DefaultStyles = {
  values: {
    borderRadius: 3,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#777',
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
    regular: Platform.select<TextFontStyle>({
      ios: {
        fontWeight: '400',
        fontFamily: 'Roboto',
      },
      android: {
        fontFamily: 'Roboto-Regular',
      },
    }),
    medium: Platform.select<TextFontStyle>({
      ios: {
        fontWeight: '500',
        fontFamily: 'Roboto',
      },
      android: {
        fontFamily: 'Roboto-Medium',
      },
    }),
    semiBold: Platform.select<TextFontStyle>({
      ios: {
        fontWeight: '700',
        fontFamily: 'Roboto',
      },
      android: {
        fontFamily: 'Roboto-Bold',
      },
    }),
    bold: Platform.select<TextFontStyle>({
      ios: {
        fontWeight: '900',
        fontFamily: 'Roboto',
      },
      android: {
        fontFamily: 'Roboto-Black',
      },
    }),
  },
};
