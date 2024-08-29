import { useAppearance } from '@src/components/appearance';
import { CFText } from '@src/components/ui/CFText';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const BlogDetailScreen = () => {
  const {
    theme: { colors },
  } = useAppearance();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        stickyHeaderIndices={[1]}>
        <View style={styles.cover}>
          <Image
            source={require('@src/components/course/course.jpg')}
            style={styles.cover}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            ...styles.headingContainer,
            borderColor: colors.border,
          }}>
          <CFText style={{ ...styles.title }}>NoSQL data modeling</CFText>
        </View>
        <View style={{ height: 1000 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    flex: 1,
    aspectRatio: 16 / 9,
  },
  headingContainer: {
    flex: 1,
    padding: 16,
    borderBottomWidth: 0.7,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default BlogDetailScreen;
