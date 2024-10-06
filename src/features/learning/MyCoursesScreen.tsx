import { Divider } from '@/components/ui/Divider';
import { ScrollView, StyleSheet } from 'react-native';

const MyCoursesScreen = () => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"></ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default MyCoursesScreen;
