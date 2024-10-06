import { Divider } from '@/components/ui/Divider';
import { ScrollView, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          padding: 16,
        }}></ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
