import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header, getHeaderTitle } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import {
  BookOpenTextIcon,
  BookmarkIcon,
  HomeIcon,
  UserIcon
} from 'lucide-react-native';
import HomeScreen from './home/HomeScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        header: ({ options, route }) => (
          <Header
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
          tabBarIcon: props => {
            return <HomeIcon {...props} />;
          },
          // headerRight: () => (
          //   <Item
          //     title="Browse"
          //     iconName="search"
          //     color="dimgray"
          //     IconComponent={SearchIcon as any}
          //     onPress={() => {}}
          //   />
          // ),
        }}
      />
      <Tab.Screen
        name="Learnings"
        component={HomeScreen}
        options={{
          headerTitle: 'My Courses',
          tabBarIcon: props => {
            return <BookOpenTextIcon {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={HomeScreen}
        options={{
          tabBarIcon: props => {
            return <BookmarkIcon {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: props => {
            return <UserIcon {...props} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
