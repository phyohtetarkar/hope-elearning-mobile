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
import auth from '@react-native-firebase/auth';
import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
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

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const schema = z.object({
  username: z
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
    .min(1, {
      message: 'Please enter password',
    }),
});

type SignInForm = z.infer<typeof schema>;

const SignInScreen = ({ navigation }: Props) => {
  const { colors } = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignInForm>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user) {
      navigation.popToTop();
    }
  }, [navigation, user]);

  const onSubmit = async (values: SignInForm) => {
    try {
      await auth().signInWithEmailAndPassword(values.username, values.password);
      const loginUser = await getUser();
      dispatch(userLoggedIn(loginUser));
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: parseErrorResponse(e),
      });
    }
  };

  if (user || user === undefined) {
    return null;
  }

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={16}>
          <View
            style={{
              ...styles.container,
              marginBottom: headerHeight - insets.bottom,
            }}>
            <Controller
              control={control}
              name="username"
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
                    error={errors.username?.message}
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
                    placeholder="Enter your password"
                    returnKeyType="done"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                  />
                );
              }}
            />

            <Spacer orientation="vertical" spacing={8} />

            <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
              <Text
                style={{
                  ...fonts.medium,
                  color: colors.primary,
                  textDecorationLine: 'underline',
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            <Spacer orientation="vertical" spacing={24} />

            <TextButton
              title="Sign In"
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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View
        style={{
          ...styles.footerContainer,
          marginBottom: insets.bottom + 16,
        }}>
        <Text style={{ color: 'dimgray' }}>Don't have an account?</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text
            style={{
              ...fonts.medium,
              color: colors.primary,
            }}>
            Sign Up
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

export default SignInScreen;
