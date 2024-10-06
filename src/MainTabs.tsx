/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BellIcon, MoonIcon, SunIcon } from 'lucide-react-native';
import { View } from 'react-native';
import {
  BookOpenIcon,
  HomeIcon,
  NewspaperIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import {
  BookOpenIcon as BookOpenSolidIcon,
  HomeIcon as HomeSolidIcon,
  NewspaperIcon as NewspaperSolidIcon,
  UserIcon as UserSolidIcon,
} from 'react-native-heroicons/solid';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { typography } from './components/styles';
import { Avatar } from './components/ui/Avatar';
import { HeaderLogo } from './components/ui/HeaderLogo';
import { selectUser } from './features/auth/authSlice';
import PostListHeaderRight from './features/blog/PostListHeaderRight';
import PostListScreen from './features/blog/PostListScreen';
import HomeScreen from './features/home/HomeScreen';
import MyCoursesScreen from './features/learning/MyCoursesScreen';
import ProfileScreen from './features/profile/ProfileScreen';
import { selectTheme, setDarkMode, setLightMode } from './features/themeSlice';
import { useAppDispatch, useAppSelector } from './lib/hooks';
import { BottomTabParamList, RootStackParamList } from './navigations';

const Tab = createBottomTabNavigator<BottomTabParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

const MainTabs = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { dark, colors } = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerBackground: () => {
          return (
            <View
              style={{
                flex: 1,
                borderBottomWidth: 0.7,
                borderBottomColor: colors.border,
                backgroundColor: colors.card,
              }}
            />
          );
        },
        tabBarShowLabel: true,
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: typography.headerTitle,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'left',
          headerBackground: undefined,
          headerTitle: props => <HeaderLogo {...props} />,
          tabBarIcon: props => {
            if (props.focused) {
              return <HomeSolidIcon {...props} />;
            }
            return <HomeIcon {...props} />;
          },
          headerRight: ({ tintColor }) => (
            <HeaderButtons>
              <Item
                title="Notification"
                iconName="notification"
                IconComponent={BellIcon as any}
                color={tintColor}
                onPress={() => {
                  navigation.navigate('SignIn');
                }}
              />
              <Item
                title="Theme"
                iconName="mode"
                IconComponent={(dark ? MoonIcon : SunIcon) as any}
                color={tintColor}
                onPress={() => {
                  if (dark) {
                    dispatch(setLightMode());
                  } else {
                    dispatch(setDarkMode());
                  }
                }}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Tab.Screen
        name="Blogs"
        component={PostListScreen}
        options={{
          tabBarIcon: props => {
            if (props.focused) {
              return <NewspaperSolidIcon {...props} />;
            }
            return <NewspaperIcon {...props} />;
          },
          headerRight: PostListHeaderRight,
        }}
      />
      <Tab.Screen
        name="Learnings"
        component={MyCoursesScreen}
        options={{
          headerTitle: 'My Courses',
          tabBarIcon: props => {
            if (props.focused) {
              return <BookOpenSolidIcon {...props} />;
            }
            return <BookOpenIcon {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: props => {
            if (user) {
              const borderColor = props.focused
                ? colors.primary
                : colors.border;

              return (
                <Avatar
                  src={
                    user.image
                      ? { uri: user.image }
                      : require('@/assets/images/profile.png')
                  }
                  size={props.size}
                  borderWidth={1}
                  borderColor={borderColor}
                />
              );
            }

            if (props.focused) {
              return <UserSolidIcon {...props} />;
            }
            return <UserIcon {...props} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
