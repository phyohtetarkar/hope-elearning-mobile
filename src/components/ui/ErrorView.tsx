import { StyleSheet, View } from 'react-native';
import { typography } from '../styles';
import { TextButton } from './Button';
import { Text } from './Text';

interface ErrorViewProps {
  error: Error;
  action?: () => Promise<void> | void;
  actionText?: string;
}
export const ErrorView = ({ error, action, actionText }: ErrorViewProps) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          typography.md,
          {
            textAlign: 'center',
          },
        ]}>
        {error.message}
      </Text>
      {action && <TextButton title={actionText ?? 'Retry'} onPress={action} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    flexDirection: 'column',
    gap: 14,
  },
});
