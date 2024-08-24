import { useNavigation, useTheme } from '@react-navigation/native';
import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const { dark } = useTheme();
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: dark ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: dark ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const HomeScreen = () => {
  const { dark } = useTheme();

  const navigation = useNavigation();

  const themeStyle = {
    backgroundColor: dark ? Colors.black : Colors.white,
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: {

  //     }
  //   })
  // }, [navigation]);

  return (
    <SafeAreaView style={[themeStyle, { flex: 1 }]}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={themeStyle}>
        <View style={[themeStyle, { padding: 16 }]}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
