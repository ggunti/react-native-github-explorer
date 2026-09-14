import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

function Separator({ style }: { style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.separator, style]} />;
}

export default Separator;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
  },
});
