import React from 'react';
import { View, Text, Image } from 'react-native';

export default function Login() {
  return (
    <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
      <Image style={{ height: '100%', width: '100%' }} source={require('../../../assets/images/background.png')} />
      <Text>Login</Text>
    </View>
  );
}
