import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header, getHeaderTitle } from '@react-navigation/elements';
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
import { HeaderLogo } from './components/HeaderLogo';
import { useAppearance } from './components/appearance';
import HomeScreen from './home/HomeScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const {
    theme: { dark },
    update,
  } = useAppearance();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        header: ({ options, route }) => (
          <Header
            {...options}
            title={getHeaderTitle(options, route.name)}
            headerStyle={{
              elevation: 0,
              borderBottomWidth: 0.25,
            }}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'left',
          headerTitle: props => <HeaderLogo {...props} />,
          tabBarIcon: props => {
            if (props.focused) {
              return <HomeSolidIcon {...props} />;
            }
            return <HomeIcon {...props} />;
          },
          headerRight: () => (
            <HeaderButtons>
              <Item
                title="Browse"
                iconName="notification"
                IconComponent={BellIcon as any}
                color="gray"
              />
              <Item
                title="Theme"
                iconName="mode"
                IconComponent={(dark ? MoonIcon : SunIcon) as any}
                color="gray"
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
        component={HomeScreen}
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
