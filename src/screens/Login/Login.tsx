import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from '@expo-google-fonts/poppins';


export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar  style='light'/>
      <Image style={styles.ImageBackgraund} source={require('../../../assets/images/amigo-chocolate.png')} />

      {/* <View style={{ flex: 1, justifyContent: 'space-around', width: '100%' }}>
      <Image style={{ height: '25%', width: '2%' }} source={require('../../../assets/images/logo_icone.png')} /> 
      </View> */}

    <View style={styles.title}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>
            Login
          </Text>
        </View>  

        <View style={{alignItems: 'center'}}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor="gray"
          secureTextEntry={true}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text>Não tem uma conta? </Text>
        <TouchableOpacity>
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
    
    </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    color: 'white',
    fontWeight: 'bold', 
    fontSize: 34, 
    letterSpacing: 2, 
    textAlign: 'center', 
    paddingTop: 49
  },
  ImageBackgraund:{
    flex: 1, 
    resizeMode: 'cover',
    height: '85%',
    width: '100%',
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 20,
    width: '80%',
    marginBottom: 10,
  },
  textInput: {
    color: 'gray',
  },
  loginButton: {
    backgroundColor: '#fad75b', 
    padding: 15,
    borderRadius: 20,
    width: '80%',
    marginBottom: 10, 
  },
  loginText: {
    color: 'white',
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    color: '#fad75b',
    fontSize: 14, 
  },
  registerLink: {
    textDecorationLine: 'underline', 
    color: '##fad75b', 
  },
});

