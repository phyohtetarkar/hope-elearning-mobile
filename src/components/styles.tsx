import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TextFontStyle = Pick<TextStyle, 'fontFamily' | 'fontWeight'>;

export const modifiers = {
  borderRadius: 5,
  shadow: Platform.select<ViewStyle>({
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
};

export const fonts = {
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
};

export const typography = StyleSheet.create({
  h1: {
    fontSize: 28,
    ...fonts.semiBold,
  },
  h2: {
    fontSize: 24,
    ...fonts.semiBold,
  },
  h3: {
    fontSize: 20,
    ...fonts.semiBold,
  },
  h4: {
    fontSize: 18,
    ...fonts.semiBold,
  },
  h5: {
    fontSize: 16,
    ...fonts.semiBold,
  },
  h6: {
    fontSize: 14,
    ...fonts.semiBold,
  },
  sm: {
    fontSize: 12,
    ...fonts.regular,
  },
  normal: {
    fontSize: 14,
    ...fonts.regular,
  },
  md: {
    fontSize: 16,
    ...fonts.regular,
  },
  lg: {
    fontSize: 18,
    ...fonts.regular,
  },
  headerTitle: {
    fontSize: 18,
    ...fonts.medium,
  },
});
