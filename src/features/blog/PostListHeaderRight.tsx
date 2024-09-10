import { useResetInfiniteQuery } from '@/lib/hooks';
import { Page, Post } from '@/lib/models';
import { HeaderButtonProps } from '@react-navigation/elements';
import { useQueryClient } from '@tanstack/react-query';
import { Settings2Icon } from 'lucide-react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

function PostListHeaderRight(props: HeaderButtonProps) {
  const queryClient = useQueryClient();
  const queryKey = ['/content/posts'];

  const { resetQuery } = useResetInfiniteQuery<Page<Post>>(queryKey);

  return (
    <HeaderButtons>
      <Item
        title="Filter"
        iconName="filter"
        IconComponent={Settings2Icon as any}
        color={props.tintColor}
        onPress={() => {
          resetQuery();
          // setTimeout(() => {
          //   queryClient.fetchQuery({
          //     queryKey: queryKey,
          //   });
          // }, 250);
        }}
      />
    </HeaderButtons>
  );
}

export default PostListHeaderRight;
