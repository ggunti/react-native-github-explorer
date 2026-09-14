import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../types/navigation';

function SearchRepos() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [keyword, setKeyword] = useState('');

  const onPressSearch = () => {
    navigation.navigate('ReposList', { keyword });
  };

  return (
    <View style={{ ...styles.container, paddingBottom: insets.bottom }}>
      <Text style={styles.infoText}>
        Demo mobile app which uses the GitHub API to search for repositories.
        Think about a keyword, enter it in the input field below and press the
        search button to see magic happen.
      </Text>
      <TextInput
        placeholder="Enter a keyword (e.g. react-native)"
        value={keyword}
        onChangeText={setKeyword}
        style={styles.input}
      />
      <Button title="Search" onPress={onPressSearch} disabled={!keyword} />
    </View>
  );
}

export default SearchRepos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  infoText: {
    color: 'gray',
    marginTop: 8,
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 16,
  },
});
