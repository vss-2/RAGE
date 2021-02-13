import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import IP from './IP';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  var enderecoIP = '';
  
  async function enviarCodigo(enderecoIP){
    // console.log('Olá'+enderecoIP)
    await fetch('http://'+enderecoIP+':8080/', {
      method: 'post',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: enderecoIP
      })
    })
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    alert(`Código de barras identificado: ${enderecoIP}`);
    enviarCodigo(enderecoIP);
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
      onChangeText={(value) => enderecoIP = value}
      style={{alignSelf: 'center', fontSize: 24}}
      placeholder="Coloque o código aqui"
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
