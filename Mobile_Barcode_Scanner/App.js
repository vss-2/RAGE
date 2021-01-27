import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import TcpSocket from 'react-native-tcp-socket';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  let [endereco_IP, onChangeText] = '';

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Código de barras identificado: ${data} e ${endereco_IP}`);
    console.log(endereco_IP);
    const client = TcpSocket.createConnection((port: 3721, host: endereco_IP.text, data) => {
      client.write(data);
      client.destroy();
    });
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão de uso da câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a câmera!</Text>;
  }

  return (
    <View style={{top:'10%', justifyContent: 'center', flexDirection: 'column', flex: 1}}>
    <TextInput
      style={{alignSelf: 'center', fontSize: 24}}
      placeholder="Coloque o código aqui"
      onChangeText={value => endereco_IP = value}
      endereco_IP={endereco_IP}
    />
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button style={{size: 50}} title={'Pressione aqui para \n escanear outro código'} onPress={() => setScanned(false)} />}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: 14
  },
});