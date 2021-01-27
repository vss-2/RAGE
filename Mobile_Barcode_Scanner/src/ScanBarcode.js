import React from 'react';
import { View, Button, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import TcpSocket from 'react-native-tcp-socket';
import IP from './IP.js';

const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);

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


const ScanBarcode = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text> Scanneie o código de barras </Text>
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
    
  </View>
);

ScanBarcode.navigationOptions = {
  title: 'Scannear de barras',
}

export default ScanBarcode;

/*
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Código IP identificado: ${data}`);
    IP = data;
    console.log(`O IP é: ${IP}`);
  };

  return(
    <View style={{ flexDirection: 'column', flex: 1}}>
      <View>
        <Text style={{ top: '100%', justifyContent: 'center', textAlign: 'center', fontSize: 20, flex: 0}}> Abra o programa no computador e escaneie o código mostrado </Text>
      </View> 
      <View style={{ flex: 2, top:'5%' }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={{ flex: 0, top: '-5%' }}>
        {scanned && <Button style={{size: 50}} title={'Pressione aqui para \n escanear outro código'} onPress={() => setScanned(false)} />}
      </View>
    </View>
  );
}
*/