import { Button, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

function SearchRepos() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [keyword, setKeyword] = useState('');

  const onPressSearch = () => {
    navigation.navigate('ReposList', { keyword });
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TextInput
          placeholder="Search by keyword (ex. react-native)"
          value={keyword}
          onChangeText={setKeyword}
        />
        <Button title="Search" onPress={onPressSearch} />
      </View>
    </SafeAreaProvider>
  );
}

export default SearchRepos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});
