React Native 0.87.1 CLI + typescript cross-platform mobile app which allows to explore Github Repos using the public Github API.

## Running the app locally

1. Clone the repo
2. Make sure your computer has all the tools needed to run a React Native app (node, watchman, cocoapods, Xcode, Android Studio etc) - [check here](https://reactnative.dev/docs/set-up-your-environment?platform=ios)
3. Go to the main directory and run `npm install`
4. For iOS, navigate to `ios/` directory and run `bundle exec pod install`
5. In the main directory run `npm run android` or `npm run ios`

## Key decisions

- the app has 3 screens: `SearchRepos`, `ReposList`, `RepoDetails`
- used `@react-navigation` library for navigation (most popular and actively maintained)
- instead of built-in FlatList, used FlashList `@shopify/flash-list` for a very performant infinite scroll list
- used `@tanstack/react-query` for fetching data from the Github endpoint
- `src/common/` contains React components that are reused in multiple screens
- `src/screens/` contains the screen components
- `src/screens/[screen_name]/components/` contains components that are used just for that specific screen

## Metrics

- thanks to FlashList, the app is running at constant 60 FPS even when scrolling the list fast
- memory usage can be further improved by implementing below suggestion with `maxPages: 5`

| iOS FPS                                                                                                                                  | android FPS                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [Video](https://github.com/ggunti/react-native-github-explorer/blob/main/readme_assets/ios%20-%20fps.mov)                                | [Video](https://github.com/ggunti/react-native-github-explorer/blob/main/readme_assets/android%20-%20fps.mov)                                |
| <img src="https://github.com/ggunti/react-native-github-explorer/blob/main/readme_assets/ios%20-%20perf.png" alt="ios-perf" width="800"> | <img src="https://github.com/ggunti/react-native-github-explorer/blob/main/readme_assets/android%20-%20perf.png" alt="ios-perf" width="800"> |

<img src="https://github.com/ggunti/react-native-github-explorer/blob/main/readme_assets/performance%20profiling.png" alt="perf-profiling" width="800">

## Possible improvements

- enable React Compiler to auto-memoize some functions (deliberately didn't use `useMemo` and `useCallback` for optimizations)
- if the codebase grows we could split the code a bit more. Ex. `ReposList` -> `renderItem` could be extracted into a separate component and reused
- the list of repos can grow quite fast since we keep adding 100 items "infinitely". Thus, we could enable `maxPages: 5` with `getPreviousPageParam` in `useQuery` to make sure that we always load a maximum of 500 items in memory. This way we drop page 1 items when we are rendering page 6 and so on. Then, if we scroll back to top, we re-fetch page 1 and load it back into memory if needed
- add some icons, a well defined color palette and animations for better UI/UX
- use a global state management tool (ex. redux or zustand) to store all the fetched items
- add unit + e2e tests
- enforce eslint + typescript rules at git commit / push via husky or hooks
