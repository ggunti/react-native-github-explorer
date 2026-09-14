import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';

function ExternalLink({ url, text }: { url: string; text?: string }) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <Text style={styles.link}>{text || url}</Text>
    </TouchableOpacity>
  );
}

export default ExternalLink;

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
