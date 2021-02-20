import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [IP, setIP] = useState('');
  
  function enviarCodigo(codigo_de_barras){
    
    await fetch(('http://'+String(setIP)), {
      method: 'post',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: codigo_de_barras
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
    setScanned(true);
    alert(`Código de barras identificado: ${data}`);
    enviarCodigo(data);
    //scanned(false);
    setScanned(false);
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
      onChangeText={i => this.setIP(i)}
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