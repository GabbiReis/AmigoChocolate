import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import UserService   from '../../service/UserService/UserService';
import { User } from '../../types/User';
import { FlexContainer, FlexItem, FlexColumn, FlexGridColumn } from 'react-smart-flexbox';

const Inicio = () => {
    const navigation = useNavigation<StackTypes>();
    const userService = new UserService();

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image style={styles.imageBackground} source={require('../../../assets/images/ChocoMigosHome.svg')} />

      <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />
      
      
        <Text style={styles.title}>Bem vindo(a)</Text>

        {/* <View>
        <Text style={styles.registerContainer}>Prepare-se para uma experiência deliciosa de troca de presentes nesta temporada festiva. ChocoMigos é o seu destino para organizar e desfrutar de divertidos sorteios de Amigo Chocolate com amigos, familiares e colegas. Diga adeus ao estresse de organizar manualmente o sorteio e dar as boas-vindas à emoção e ao suspense!</Text>
        </View> */}
 
        <TouchableOpacity style={styles.loginButton} >
          <Text style={styles.loginText} onPress={()=>{navigation.navigate('Login')}}>Começar Agora</Text>
        </TouchableOpacity>

     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // flex: 1,
    // resizeMode: 'cover',
    width: '100%',
    // alignItems: 'center',
    height: '100%',
    position: 'absolute'
  },
  logo: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 210,
    height: 100,
  },
  title: {
    top: 175,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 34,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    width: '100%',
  },
  textInput: {
    color: 'black',
  },
  loginButton: {
    borderBlockEndColor: 'white',
    top: 170,
    backgroundColor: '#FFD100',
    padding: 15,
    borderRadius: 20,
    width: '60%',
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerContainer: {
    top: 150,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: 'white',
    fontSize: 14,
  },
  registerLink: {
    textDecorationLine: 'underline',
    color: '#fad75b',
    marginLeft: 5,
  },
});

export default Inicio;
