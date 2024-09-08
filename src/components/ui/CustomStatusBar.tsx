import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface CustomStatusBarProps {
  style?: 'light' | 'dark';
}

export const CustomStatusBar = ({ style }: CustomStatusBarProps) => {
  const isFocused = useIsFocused();
  const { dark } = useAppSelector(selectTheme);

  const backgroundStyle = {
    backgroundColor: dark ? 'transparent' : Colors.lighter,
  };

  if (!isFocused) {
    return null;
  }

  if (style === 'light') {
    return (
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.darker}
        translucent={true}
      />
    );
  }

  if (style === 'dark') {
    return (
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.lighter}
        translucent={true}
      />
    );
  }

  return (
    <StatusBar
      barStyle={dark ? 'light-content' : 'dark-content'}
      backgroundColor={backgroundStyle.backgroundColor}
      translucent={true}
    />
  );
};
