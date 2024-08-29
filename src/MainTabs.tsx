import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BellIcon, MoonIcon, SunIcon } from 'lucide-react-native';
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
import BlogListScreen from './blog/BlogListScreen';
import { useAppearance } from './components/appearance';
import { HeaderLogo } from './components/ui/HeaderLogo';
import HomeScreen from './home/HomeScreen';

export type BottomTabParamList = {
  Home: undefined;
  Blogs: undefined;
  Learnings: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const MainTabs = () => {
  const {
    theme: { dark, colors },
    update,
  } = useAppearance();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: !dark ? colors.primary : undefined,
        },
        headerTintColor: dark ? colors.text : colors.primaryForeground,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'left',
          headerTitle: props => <HeaderLogo {...props} />,
          headerStyle: !dark
            ? {
                backgroundColor: 'white',
              }
            : undefined,
          tabBarIcon: props => {
            if (props.focused) {
              return <HomeSolidIcon {...props} />;
            }
            return <HomeIcon {...props} />;
          },
          headerRight: props => (
            <HeaderButtons>
              <Item
                title="Notification"
                iconName="notification"
                IconComponent={BellIcon as any}
                color={'gray'}
              />
              <Item
                title="Theme"
                iconName="mode"
                IconComponent={(dark ? MoonIcon : SunIcon) as any}
                color={'gray'}
                onPress={() => {
                  update?.(dark ? 'light' : 'dark');
                }}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Tab.Screen
        name="Blogs"
        component={BlogListScreen}
        options={{
          tabBarIcon: props => {
            if (props.focused) {
              return <NewspaperSolidIcon {...props} />;
            }
            return <NewspaperIcon {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Learnings"
        component={HomeScreen}
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
        component={HomeScreen}
        options={{
          tabBarIcon: props => {
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
