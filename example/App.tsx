import { StyleSheet, Text, View } from 'react-native';

import * as SSLPinning from 'config-plugin-ssl-pinning';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{SSLPinning.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
