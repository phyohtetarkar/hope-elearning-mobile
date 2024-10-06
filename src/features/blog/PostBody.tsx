import { TextButton } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { CustomWebView } from '@/components/ui/CustomWebView';
import { Spacer } from '@/components/ui/Spacer';
import { useAppSelector } from '@/lib/hooks';
import { Post } from '@/lib/models';
import { LockKeyholeIcon } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { selectUser } from '../auth/authSlice';
import { selectTheme } from '../themeSlice';
import { modifiers } from '@/components/styles';

const PostBody = ({ post }: { post: Post }) => {
  const { colors } = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);

  if (!user && post.visibility === 'member') {
    return (
      <View
        style={{
          ...styles.restrictContainer,
          backgroundColor: colors.primary,
        }}>
        <LockKeyholeIcon color={colors.primaryForeground} />
        <Text style={{ color: colors.primaryForeground }}>
          You need to sign in to view this content.
        </Text>
        <Spacer orientation="vertical" spacing={6} />
        <TextButton variant="light" title="Sign In" onPress={() => {}} />
      </View>
    );
  }

  const isExpired = (user?.expiredAt ?? 0) < new Date().getTime();

  if (isExpired && post.visibility === 'paid_member') {
    return (
      <View
        style={{
          ...styles.restrictContainer,
          backgroundColor: colors.primary,
        }}>
        <LockKeyholeIcon color={colors.primaryForeground} />
        <Text style={{ color: colors.primaryForeground }}>
          You need to subscribe to view this content.
        </Text>
        <Spacer orientation="vertical" spacing={6} />
        <TextButton variant="light" title="Subscribe" onPress={() => {}} />
      </View>
    );
  }

  return (
    <>
      <CustomWebView html={post.html} />

      <Spacer orientation="vertical" spacing={16} />

      <View style={styles.tagContainer}>
        {post.tags?.map((tag, i) => {
          return <Chip key={i} title={tag.name} onPress={() => {}} />;
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  restrictContainer: {
    borderRadius: modifiers.borderRadius,
    padding: 16,
    gap: 10,
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default PostBody;
