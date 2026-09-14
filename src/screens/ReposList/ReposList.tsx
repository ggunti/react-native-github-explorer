import { RouteProp, useRoute } from '@react-navigation/native';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../types/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Separator } from '../../components';
import type { GithubRepoItem, GithubReposResponse } from '../../types/github';

const PER_PAGE = 100;

function ReposList() {
  const route = useRoute<RouteProp<RootStackParamList, 'ReposList'>>();
  const insets = useSafeAreaInsets();
  const {
    isPending,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['githubRepos', route.params.keyword],
    queryFn: ({ pageParam }): Promise<GithubReposResponse> =>
      fetch(
        `https://api.github.com/search/repositories?q=${route.params.keyword}&per_page=${PER_PAGE}&page=${pageParam}`,
      ).then(res => res.json()),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.length * PER_PAGE;
      return fetched < lastPage.total_count ? allPages.length + 1 : undefined;
    },
  });

  const repos = data?.pages.flatMap(page => page.items) ?? [];

  const renderItem = ({ item }: { item: GithubRepoItem }) => {
    return (
      <View style={styles.item}>
        <View style={styles.header}>
          <Image
            source={{ uri: item.owner.avatar_url }}
            style={styles.avatar}
          />
          <View style={styles.headerContent}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
        <View style={styles.topics}>
          {!!item.stargazers_count && (
            <Text style={styles.topic}>{item.stargazers_count} Stars</Text>
          )}
          {!!item.language && <Text style={styles.topic}>{item.language}</Text>}
          {!!item.updated_at && (
            <Text style={styles.topic}>
              Updated at {new Date(item.updated_at).toLocaleDateString()}{' '}
              {new Date(item.updated_at).toLocaleTimeString()}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const onEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={{ paddingBottom: insets.bottom }}>
      {isPending && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {repos.length > 0 && (
        <FlatList
          data={repos}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={Separator}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          ListFooterComponent={
            isFetchingNextPage ? (
              <Text style={styles.footer}>Loading more...</Text>
            ) : undefined
          }
        />
      )}
    </View>
  );
}

export default ReposList;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerContent: {
    flex: 1,
  },
  description: {
    width: '100%',
    fontSize: 14,
    color: 'gray',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  topic: {
    backgroundColor: 'lightgray',
    padding: 4,
    borderRadius: 4,
  },
  footer: {
    textAlign: 'center',
    padding: 16,
    color: 'gray',
  },
});
