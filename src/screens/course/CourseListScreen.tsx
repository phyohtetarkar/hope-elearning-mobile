import { Header, getHeaderTitle } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppearance } from '@src/components/appearance';
import { CourseGridItem } from '@src/components/course/CourseGridItem';
import { Divider } from '@src/components/ui/Divider';
import { Spacer } from '@src/components/ui/Spacer';
import { RootStackParamList } from '@src/navigations';
import { Settings2Icon } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Item } from 'react-navigation-header-buttons';

const screen = Dimensions.get('window');

const CourseListScreen = () => {
  const {
    theme: { dark, colors },
  } = useAppearance();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const insets = useSafeAreaInsets();

  const scrollOffset = useRef(0);

  useEffect(() => {
    navigation.setOptions({
    //   header: props => {
    //     return <Header {...props} title={getHeaderTitle(props.options, '')} />;
    //   },
      
      headerRight: props => {
        return (
          <Item
            title="Filter"
            iconName="filter"
            IconComponent={Settings2Icon as any}
            color={props.tintColor}
          />
        );
      },
    });
  }, [navigation]);

  const renderItem = (item: ListRenderItemInfo<number>) => {
    return <CourseGridItem />;
  };

  return (
    <>
      <Divider orientation="horizontal" stroke={0.5} />
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={[colors.primary]}
            tintColor={'gray'}
            onRefresh={() => {}}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 16,
        }}
        ItemSeparatorComponent={() => {
          return <Spacer orientation="vertical" spacing={16} />;
        }}
        // onScroll={evt => {
        //   const ne = evt.nativeEvent;
        //   const offset = ne.contentOffset.y;
        //   const end = ne.contentSize.height - ne.layoutMeasurement.height;
        //   // console.log(scrollOffset.current > offset ? 'down' : 'up');
        //   if (offset > 0 && offset <= end) {
        //     scrollOffset.current = offset;
        //   }
        // }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 16,
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 10,
  },
  tagContainer: {
    height: 54,
    borderBottomWidth: 0.7,
  },
});

export default CourseListScreen;
