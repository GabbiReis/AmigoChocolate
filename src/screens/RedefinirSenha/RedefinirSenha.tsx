import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import UserService from '../../service/UserService/UserService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RedefinirSenha = () => {
  const navigation = useNavigation<StackTypes>();
  const [email, setEmail] = useState('');
  const [tokenRecuperacao, setTokenRecuperacao] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const userService = new UserService();
  
  const handleRedefinirSenha = async () => {
    try {
      const response = await userService.redefinirSenha(email, tokenRecuperacao, novaSenha);
      if (response) {
        setErrorMessage(null);
        setSuccessMessage('Senha redefinida com sucesso.');
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      } else {
        setErrorMessage('Falha ao redefinir a senha.');
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro ao redefinir a senha.');
      setSuccessMessage(null);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container}>
        <Image style={styles.imageBackground} source={require('../../../assets/images/amigo-chocolate.png')} />
        <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />

        <View style={styles.formContainer}>
          <Text style={styles.title}>Redefinir Senha</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Digite seu email"
              placeholderTextColor="gray"
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Digite o token de recuperação"
              placeholderTextColor="gray"
              style={styles.textInput}
              value={tokenRecuperacao}
              onChangeText={setTokenRecuperacao}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Digite a nova senha"
              placeholderTextColor="gray"
              style={styles.textInput}
              secureTextEntry={!showPassword}
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
            </TouchableOpacity>
            
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
          <TouchableOpacity style={styles.redefinirButton} onPress={handleRedefinirSenha}>
            <Text style={styles.redefinirText}>Redefinir Senha</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
          <Text>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Cadastro'); }}>
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <Text>Esqueceu a senha? </Text>
          <TouchableOpacity onPress={() => { navigation.navigate('EsqueciSenha'); }}>
            <Text style={styles.registerLink}>Recuperar senha</Text>
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
  redefinirButton: {
    backgroundColor: '#FFD100',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    marginBottom: 10,
  },
  redefinirText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  registerContainer: {
    color: 'white',
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
  eyeIcon: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
  },
});

export default RedefinirSenha;