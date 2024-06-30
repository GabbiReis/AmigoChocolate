import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import UserService from '../../service/UserService/UserService';

const EsqueciSenha = () => {
  const navigation = useNavigation<StackTypes>();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const userService = new UserService();
  
  const handleEsqueciSenha = async () => {
    try {
      const response = await userService.esqueciSenha(email);
      if (response) {
        setErrorMessage(null); 
        setSuccessMessage('Email de recuperação enviado com sucesso.');
        setTimeout(() => {
          navigation.navigate('RedefinirSenha');
        }, 2000);
      } else {
        setErrorMessage('Falha ao enviar email de recuperação.');
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro ao enviar email de recuperação.');
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container}>
        <Image style={styles.imageBackground} source={require('../../../assets/images/amigo-chocolate.png')} />
        <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />

        <View style={styles.formContainer}>
          <Text style={styles.title}>Esqueci senha</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Digite seu email"
              placeholderTextColor="gray"
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}
          {successMessage ? (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          ) : null}
          <TouchableOpacity style={styles.loginButton} onPress={handleEsqueciSenha}>
            <Text style={styles.loginText}>Enviar email de recuperação</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Login'); }}>
              <Text style={styles.registerLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerContainer}>
            <Text>Já recebeu o Token?</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('RedefinirSenha'); }}>
              <Text style={styles.registerLink}>Redefinir Senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute'
  },
  logo: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 210,
    height: 100,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 34,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    backgroundColor: '#FFD100',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerContainer: {
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
  errorContainer: {
    marginBottom: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
  successContainer: {
    marginBottom: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
  },
  successText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EsqueciSenha;
