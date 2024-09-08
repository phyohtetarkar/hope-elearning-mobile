import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import {
  ErrorToast,
  InfoToast,
  ToastConfigParams,
} from 'react-native-toast-message';
import { DefaultStyles } from '../styles';

const ToastInfoLayout = (props: ToastConfigParams<any>) => {
  const { colors } = useAppSelector(selectTheme);
  return (
    <InfoToast
      {...props}
      text1NumberOfLines={3}
      text2NumberOfLines={3}
      text1Style={{
        fontSize: 16,
        color: colors.background,
        ...DefaultStyles.fonts.regular,
      }}
      text2Style={{
        fontSize: 16,
        color: colors.background,
        ...DefaultStyles.fonts.regular,
      }}
      style={{
        backgroundColor: colors.text,
        borderRadius: DefaultStyles.values.borderRadius,
        borderLeftWidth: 0,
        height: 'auto',
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    />
  );
};

const ToastErrorLayout = (props: ToastConfigParams<any>) => {
  const { colors } = useAppSelector(selectTheme);
  return (
    <ErrorToast
      {...props}
      text1NumberOfLines={3}
      text2NumberOfLines={3}
      text1Style={{
        fontSize: 16,
        color: colors.errorForeground,
        ...DefaultStyles.fonts.regular,
      }}
      text2Style={{
        fontSize: 16,
        color: colors.errorForeground,
        ...DefaultStyles.fonts.regular,
      }}
      style={{
        backgroundColor: colors.error,
        borderRadius: DefaultStyles.values.borderRadius,
        borderLeftWidth: 0,
        height: 'auto',
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    />
  );
};

export { ToastErrorLayout, ToastInfoLayout };
