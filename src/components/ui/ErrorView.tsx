import { StyleSheet, View } from 'react-native';
import { DefaultStyles } from '../styles';
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
      <Text style={{ ...styles.errorText }}>{error.message}</Text>
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
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    ...DefaultStyles.fonts.regular,
  },
});
