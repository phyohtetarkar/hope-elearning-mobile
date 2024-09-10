import { DefaultStyles } from '@/components/styles';
import { useAppSelector } from '@/lib/hooks';
import { getDefaultHeaderHeight, HeaderTitleProps } from '@react-navigation/elements';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { selectTheme } from '../themeSlice';

const screen = Dimensions.get('window');

function CourseListHeaderTitle(props: HeaderTitleProps) {
  const headerHeight = getDefaultHeaderHeight(screen, false, 0);
  const { colors } = useAppSelector(selectTheme);

  const searchInsets = Platform.select({
    ios: {
      height: 8,
      width: 100,
    },
    android: {
      height: 12,
      width: 128,
    },
    default: {
      height: 0,
      width: 0,
    },
  });

  const searchHeight = headerHeight - searchInsets.height;
  const searchWidth = screen.width - searchInsets.width;

  return (
    <View
      style={{
        ...styles.container,
        height: searchHeight,
        width: searchWidth,
        borderRadius: searchHeight / 2,
      }}>
      <TextInput
        style={{ ...styles.input, color: colors.text }}
        placeholderTextColor={'dimgray'}
        placeholder="Search courses..."
        selectionColor={colors.primary}
        cursorColor={colors.primary}
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: 'rgba(150, 150, 150, 0.15)',
  },
  input: {
    flex: 1,
    ...DefaultStyles.fonts.regular,
  },
});

export default CourseListHeaderTitle;
