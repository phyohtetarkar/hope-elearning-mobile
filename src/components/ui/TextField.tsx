import { selectTheme } from '@/features/themeSlice';
import { useAppSelector } from '@/lib/hooks';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { forwardRef, PropsWithChildren, ReactNode, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { fonts, modifiers, typography } from '../styles';
import { Text } from './Text';

type TextFieldProps = PropsWithChildren<{
  label?: string;
  error?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  contentContainerStyle?: ViewStyle;
}>;

const TextFieldContainer = ({
  label,
  error,
  contentContainerStyle,
  leading,
  trailing,
  children,
}: TextFieldProps) => {
  const { dark, colors } = useAppSelector(selectTheme);

  return (
    <View style={[styles.container, contentContainerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? colors.error : colors.default,
            backgroundColor: dark ? '#141414' : '#f3f3f3',
          },
        ]}>
        <>
          {leading}
          {children}
          {trailing}
        </>
      </View>
      {error && (
        <Text style={{ ...styles.errorText, color: colors.error }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const TextFieldBase = forwardRef<TextInput, TextInputProps>(
  ({ style, ...props }, ref) => {
    const { dark, colors } = useAppSelector(selectTheme);

    return (
      <TextInput
        ref={ref}
        style={[
          {
            ...styles.input,
            color: colors.text,
          },
          style,
        ]}
        selectionColor={colors.primary}
        cursorColor={colors.primary}
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor="dimgray"
        keyboardAppearance={dark ? 'dark' : 'light'}
        {...props}
      />
    );
  },
);

const TextField = forwardRef<TextInput, TextFieldProps & TextInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <TextFieldContainer label={label} error={error}>
        <TextFieldBase ref={ref} {...props} />
      </TextFieldContainer>
    );
  },
);

const PasswordField = forwardRef<TextInput, TextFieldProps & TextInputProps>(
  ({ label, error, ...props }, ref) => {
    const [secureText, setSecureText] = useState(true);

    return (
      <TextFieldContainer
        label={label}
        error={error}
        trailing={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setSecureText(!secureText);
            }}>
            {secureText ? (
              <EyeOffIcon color="gray" size={20} />
            ) : (
              <EyeIcon color="gray" size={20} />
            )}
          </TouchableOpacity>
        }>
        <TextFieldBase ref={ref} secureTextEntry={secureText} {...props} />
      </TextFieldContainer>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    ...fonts.medium,
  },
  input: {
    flex: 1,
    height: '100%',
    ...typography.normal,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: modifiers.borderRadius,
    height: 46,
    paddingHorizontal: 16,
    borderWidth: 1,
    gap: 10,
  },
  errorText: {
    marginTop: 2,
    marginLeft: 2,
    ...typography.sm,
  },
});

export { PasswordField, TextField };
