import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Separator, Tags } from '../../common';
import { ExternalLink } from './components';
import { formatDate } from '../../utils';
import type { RootStackParamList } from '../../types/navigation';

function RepoDetails() {
  const route = useRoute<RouteProp<RootStackParamList, 'RepoDetails'>>();
  const insets = useSafeAreaInsets();
  const { repo } = route.params;

  const renderOwnerDetails = () => {
    return (
      <View>
        <View style={styles.mainInfoContainer}>
          {repo.owner.avatar_url && (
            <Image
              source={{ uri: repo.owner.avatar_url }}
              style={styles.avatar}
            />
          )}
          <View>
            <Text style={styles.ownerName}>{repo.owner.login}</Text>
            <ExternalLink url={repo.owner.html_url} />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Repos URL: </Text>
          <ExternalLink url={repo.owner.repos_url} />
        </View>
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Followers URL: </Text>
          <ExternalLink url={repo.owner.followers_url} />
        </View>
      </View>
    );
  };

  const renderRepoDetails = () => {
    return (
      <View>
        {repo.topics?.length > 0 && (
          <Tags items={repo.topics} containerStyle={styles.tagsContainer} />
        )}
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Name: </Text>
          <Text style={styles.normalInfo}>{repo.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Full Name: </Text>
          <Text style={styles.normalInfo}>{repo.full_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.grayInfo}>URL: </Text>
          <ExternalLink url={repo.html_url} />
        </View>
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Clone URL: </Text>
          <ExternalLink url={repo.clone_url} />
        </View>
        {!!repo.description && (
          <View style={styles.row}>
            <Text style={styles.grayInfo}>Description: </Text>
            <Text style={styles.normalInfo}>{repo.description}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Language: </Text>
          <Text style={styles.normalInfo}>{repo.language}</Text>
        </View>
        {repo.license?.url && (
          <View style={styles.row}>
            <Text style={styles.grayInfo}>License: </Text>
            <ExternalLink url={repo.license?.url} text={repo.license?.name} />
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Created At: </Text>
          <Text style={styles.normalInfo}>{formatDate(repo.created_at)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Updated At: </Text>
          <Text style={styles.normalInfo}>{formatDate(repo.updated_at)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Stars: </Text>
          <Text style={styles.normalInfo}>{repo.stargazers_count}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Forks: </Text>
          <Text style={styles.normalInfo}>{repo.forks_count}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Open Issues: </Text>
          <Text style={styles.normalInfo}>{repo.open_issues_count}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.grayInfo}>Watchers: </Text>
          <Text style={styles.normalInfo}>{repo.watchers_count}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
        paddingBottom: insets.bottom,
      }}
    >
      <Text style={styles.sectionTitle}>Owner Details</Text>
      {renderOwnerDetails()}
      <Separator style={styles.separator} />
      <Text style={styles.sectionTitle}>Repo Details</Text>
      {renderRepoDetails()}
    </ScrollView>
  );
}

export default RepoDetails;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  separator: {
    marginVertical: 8,
    marginHorizontal: -8,
  },
  mainInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tagsContainer: {
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  normalInfo: {
    fontSize: 14,
  },
  grayInfo: {
    fontSize: 14,
    color: 'gray',
  },
});
