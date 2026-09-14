import { useEffect, useMemo } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Separator, Tags } from '../../common';
import { formatDate } from '../../utils';
import type { RootStackParamList } from '../../types/navigation';
import type { GithubRepoItem, GithubReposResponse } from '../../types/github';

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
    refetch,
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

  const repos = useMemo(
    () => data?.pages.flatMap(page => page.items) ?? [],
    [data],
  );

  const onEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderLoadingIndicator = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  };

  const renderError = () => {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Oups! Something went wrong: {error?.message}
        </Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  };

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
        {tags.length > 0 && <Tags items={tags} />}
      </Pressable>
    );
  };

  useEffect(() => {
    const totalCount = data?.pages?.[0]?.total_count;
    if (totalCount) {
      navigation.setOptions({
        title: `Results for: ${route.params.keyword} (${repos.length}/${totalCount})`,
      });
    }
  }, [navigation, route.params.keyword, repos.length, data?.pages]);

  return (
    <View style={{ ...styles.container, paddingBottom: insets.bottom }}>
      {isPending && renderLoadingIndicator()}
      {error && renderError()}
      <FlashList
        data={repos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={Separator}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="gray" />
          ) : undefined
        }
        ListEmptyComponent={
          !isPending && !error ? (
            <Text style={styles.emptyText}>No results found</Text>
          ) : undefined
        }
      />
    </View>
  );
}

export default ReposList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    paddingVertical: 8,
  },
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
