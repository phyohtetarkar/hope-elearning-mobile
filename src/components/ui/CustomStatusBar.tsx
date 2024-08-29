import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAppearance } from '../appearance';

interface CustomStatusBarProps {
  style?: 'light' | 'dark';
}

export const CustomStatusBar = ({ style }: CustomStatusBarProps) => {
  const isFocused = useIsFocused();
  const {
    theme: { dark },
  } = useAppearance();

  const backgroundStyle = {
    backgroundColor: dark ? Colors.darker : Colors.lighter,
  };

  if (!isFocused) {
    return null;
  }

  if (style === 'light') {
    return (
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.darker}
        translucent={false}
      />
    );
  }

  if (style === 'dark') {
    return (
      <StatusBar
        barStyle={dark ? 'light-content' :'dark-content'}
        backgroundColor={Colors.lighter}
        translucent={true}
      />
    );
  }

  return (
    <StatusBar
      barStyle={'light-content'}
      backgroundColor={backgroundStyle.backgroundColor}
      translucent={dark}
    />
  );
};
