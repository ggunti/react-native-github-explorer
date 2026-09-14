import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

function Tags({
  items,
  containerStyle,
  itemStyle,
}: {
  items: string[];
  containerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<TextStyle>;
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {items.map(item => (
        <Text key={item} style={[styles.item, itemStyle]}>
          {item}
        </Text>
      ))}
    </View>
  );
}

export default Tags;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 4,
    borderRadius: 4,
  },
});
