import { fonts, modifiers } from '@/components/styles';
import { TextButton } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { PasswordField, TextField } from '@/components/ui/TextField';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { getUser } from '@/lib/services/UserApi';
import { RootStackParamList } from '@/navigations';
import { zodResolver } from '@hookform/resolvers/zod';
import auth, {
  sendEmailVerification,
  updateProfile,
} from '@react-native-firebase/auth';
import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { z } from 'zod';
import { selectTheme } from '../themeSlice';
import { selectUser, userLoggedIn } from './authSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const schema = z
  .object({
    name: z
      .string({
        required_error: 'Please enter your name',
      })
      .min(1, {
        message: 'Please enter your name',
      }),
    email: z
      .string({
        required_error: 'Please enter email address',
      })
      .email({
        message: 'Please enter valid email address',
      }),
    password: z
      .string({
        required_error: 'Please enter password',
      })
      .min(6, {
        message: 'Password must be at least 6 characters',
      }),
    confirmPassword: z.string({
      required_error: 'Please enter confirm password',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpForm = z.infer<typeof schema>;

const SignUpScreen = ({ navigation }: Props) => {
  const { colors } = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignUpForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: SignUpForm) => {
    try {
      const credential = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      await sendEmailVerification(credential.user);
      await updateProfile(credential.user, {
        displayName: values.name,
      });

      const loginUser = await getUser();
      dispatch(userLoggedIn(loginUser));
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: parseErrorResponse(e),
      });
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{
            ...styles.container,
            marginBottom: headerHeight - insets.bottom,
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={16}>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <TextField
                    label="Name"
                    placeholder="Enter your name"
                    returnKeyType="done"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.name?.message}
                  />
                );
              }}
            />

            <Spacer orientation="vertical" spacing={16} />

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <TextField
                    label="Email"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    returnKeyType="done"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                  />
                );
              }}
            />

            <Spacer orientation="vertical" spacing={16} />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <PasswordField
                    label="Password"
                    placeholder="Minimum 6 characters"
                    returnKeyType="done"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                  />
                );
              }}
            />

            <Spacer orientation="vertical" spacing={16} />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <PasswordField
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    returnKeyType="done"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.confirmPassword?.message}
                  />
                );
              }}
            />

            <Spacer orientation="vertical" spacing={24} />
          </KeyboardAvoidingView>

          <TextButton
            title="Sign Up"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />

          <Spacer orientation="vertical" spacing={24} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Divider orientation="horizontal" style={{ flex: 1 }} />
            <Text style={{ color: 'gray' }}>OR</Text>
            <Divider orientation="horizontal" style={{ flex: 1 }} />
          </View>

          <Spacer orientation="vertical" spacing={24} />

          <TouchableHighlight
            style={{
              borderRadius: modifiers.borderRadius,
            }}
            disabled={isSubmitting}
            onPress={() => {}}>
            <View
              style={{
                ...styles.socialButton,
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}>
              <Image
                source={require('@/assets/images/icons8-google-48.png')}
                style={{
                  width: 32,
                  aspectRatio: 1,
                }}
              />
              <Text style={{ ...fonts.medium, color: 'dimgray' }}>
                Continue with Google
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          ...styles.footerContainer,
          marginBottom: insets.bottom + 16,
        }}>
        <Text style={{ color: 'dimgray' }}>Already have an account?</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Text
            style={{
              ...fonts.medium,
              color: colors.primary,
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  socialButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 46,
    borderRadius: modifiers.borderRadius,
    borderWidth: 0.7,
    gap: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});

export default SignUpScreen;
