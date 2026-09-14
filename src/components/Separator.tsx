import { StyleSheet, View } from 'react-native';

function Separator() {
  return <View style={styles.separator} />;
}

export default Separator;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
  },
});
