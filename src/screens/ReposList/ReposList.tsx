import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../types/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Separator, Tags } from '../../common';
import type { GithubRepoItem, GithubReposResponse } from '../../types/github';
import { formatDate } from '../../utils';

const PER_PAGE = 100;

function ReposList() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
    const stars = item.stargazers_count ? `${item.stargazers_count} Stars` : '';
    const language = item.language ? item.language : '';
    const updatedAt = item.updated_at
      ? `Updated at ${formatDate(item.updated_at)}`
      : '';

    const tags = [stars, language, updatedAt].filter(Boolean);

    return (
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate('RepoDetails', { repo: item })}
      >
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
        {tags.length > 0 && (
          <Tags items={[stars, language, updatedAt].filter(Boolean)} />
        )}
      </Pressable>
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
  footer: {
    textAlign: 'center',
    padding: 16,
    color: 'gray',
  },
});
