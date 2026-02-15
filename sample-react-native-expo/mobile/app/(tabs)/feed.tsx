import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui';
import { colors, spacing, fontSize } from '../../src/theme';

interface Post {
  id: string;
  username: string;
  avatar: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    username: 'Sarah Johnson',
    avatar: 'S',
    content: 'Just finished implementing the new feature! Clean architecture really makes testing so much easier.',
    likes: 42,
    comments: 8,
    timeAgo: '2h',
    isLiked: false,
  },
  {
    id: '2',
    username: 'Mike Chen',
    avatar: 'M',
    content: 'Beautiful sunset at the beach today. Sometimes you need to step away from the keyboard.',
    imageUrl: 'sunset',
    likes: 128,
    comments: 24,
    timeAgo: '4h',
    isLiked: true,
  },
  {
    id: '3',
    username: 'Emma Wilson',
    avatar: 'E',
    content: 'Excited to announce that I just passed my AWS Solutions Architect certification!',
    likes: 256,
    comments: 45,
    timeAgo: '6h',
    isLiked: false,
  },
];

export default function FeedScreen() {
  const [posts, setPosts] = useState(mockPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <Card style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View style={styles.postHeaderInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.timeAgo}>{item.timeAgo}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      {item.imageUrl && (
        <View style={styles.postImage}>
          <Ionicons name="image" size={64} color={colors.textTertiary} />
        </View>
      )}

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleLike(item.id)}
        >
          <Ionicons
            name={item.isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={item.isLiked ? colors.error : colors.textSecondary}
          />
          <Text
            style={[
              styles.actionText,
              item.isLiked && { color: colors.error },
            ]}
          >
            {item.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color={colors.textSecondary} />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color={colors.textSecondary} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  listContent: {
    padding: spacing.md,
  },
  postCard: {
    marginBottom: spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fontSize.md,
  },
  postHeaderInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  username: {
    fontWeight: '600',
    color: colors.text,
    fontSize: fontSize.md,
  },
  timeAgo: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
  },
  postContent: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  postImage: {
    height: 200,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
    paddingVertical: spacing.xs,
  },
  actionText: {
    marginLeft: spacing.xs,
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
});
