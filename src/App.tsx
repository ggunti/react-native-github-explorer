import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchRepos from './screens/SearchRepos/SearchRepos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReposList from './screens/ReposList/ReposList';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="SearchRepos">
      <Stack.Screen
        name="SearchRepos"
        component={SearchRepos}
        options={{ title: 'Search Github Repos' }}
      />
      <Stack.Screen
        name="ReposList"
        component={ReposList}
        initialParams={{ keyword: '' }}
        options={{ title: 'Repository Results' }}
      />
    </Stack.Navigator>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
