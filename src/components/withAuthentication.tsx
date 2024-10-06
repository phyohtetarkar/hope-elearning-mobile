import { selectUser } from '@/features/auth/authSlice';
import { useAppSelector } from '@/lib/hooks';
import { RootStackParamList } from '@/navigations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';

export function withAuthentication<P extends React.JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
) {
  return function AuthenticatedComponent(props: P) {
    const user = useAppSelector(selectUser);

    const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
      if (user === null) {
        navigation.navigate('SignIn');
      }
    }, [navigation, user]);

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
}
