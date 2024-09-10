import { HeaderButtonProps } from '@react-navigation/elements';
import { Settings2Icon } from 'lucide-react-native';
import { Item } from 'react-navigation-header-buttons';

function CourseListHeaderRight(props: HeaderButtonProps) {
  return (
    <Item
      title="Filter"
      iconName="filter"
      IconComponent={Settings2Icon as any}
      color={props.tintColor}
      onPress={() => {}}
    />
  );
}

export default CourseListHeaderRight;
