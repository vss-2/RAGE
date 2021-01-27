import React, {useState, useEffect} from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
// import  node-fetch from 'node-fetch';
import IP from './IP.js';

export default function ScanIP() {
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
    if(IP.length == 0){
      IP.push(data);
      if(IP[0].startsWith('http://')){
        IP[0] = IP[0].slice(7)
        data = IP[0]
      }
      alert(`Código IP identificado: ${data}`);
    } else {
      h = IP[0]
      const f1 = require('node-fetch')
      f1('http://127.0.1.1:3721', {
        method: 'POST',
        body: JSON.stringify({
          title: h,
          body: h,
          userId: 0
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      }).then(function (data) {
        console.log(data);
      }).catch(function (error) {
        console.warn('Something went wrong.', error);
      });

      alert(`Código de barras identificado: ${data}`);
    }
  };

  ScanIP.navigationOptions = {
    title: 'Scannear código do computador',
  }

  return(
    <View style={{ flexDirection: 'column', flex: 1}}>
      <View>
        {IP.length == 0 && <Text style={{ top: '100%', justifyContent: 'center', textAlign: 'center', fontSize: 20, flex: 0}}> Abra o programa no computador e escaneie o código mostrado </Text>}
        {IP.length != 0 && <Text style={{ top: '200%', justifyContent: 'center', textAlign: 'center', fontSize: 20, flex: 0}}> Scanneie o código de barras </Text>}
      </View> 
      <View style={{ flex: 2, top:'0%' }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={{ flex: 0, top: '-9%' }}>
        {IP.length != 0 && <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 20}}>{IP[0]}</Text>}
      </View>
      <View style={{ flex: 0, top: '-5%', width: '30%', alignSelf: 'center' }}>
        {scanned && <Button styles={{ borderWidth: 3 }} title={'Prosseguir'} onPress={() => setScanned(false)} />}
      </View>
    </View>
  );

}

/*
const f1 = require('node-fetch')
f1('http://127.0.1.1:3721', {
	method: 'POST',
	body: JSON.stringify({
		title: h,
		body: h,
		userId: 0
	}),
	headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn('Something went wrong.', error);
});

*/