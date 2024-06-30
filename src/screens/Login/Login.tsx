import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';
import UserService from '../../service/UserService/UserService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const userService = new UserService();
  const navigation = useNavigation<StackTypes>();

  const handleLogin = async () => {
    try {
      const isSuccess = await userService.login(email, senha);
      if (isSuccess) {
        const token = userService.getToken();
        if (token) {
          await AsyncStorage.setItem('tokenJwt', token);
          configureAxios(token);
        }
        const userId = userService.getUserId();

        if (userId) {
          await AsyncStorage.setItem('userId', userId.toString());
        } else {
          throw new Error('ID do usuário não encontrado após o login.');
        }

        setErrorMessage(null);
        navigation.navigate('PaginaInicial');
      } else {
        setErrorMessage('Email ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro no handleLogin:', error);
      setErrorMessage('Não foi possível realizar o login. Verifique os dados e tente novamente.');
    }
  };
  const configureAxios = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.imageBackground} source={require('../../../assets/images/amigo-chocolate.png')} />
      <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            onChangeText={setEmail}
            value={email}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor="gray"
            onChangeText={setSenha}
            secureTextEntry={!showPassword}
            value={senha}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        {errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <Text>Esqueceu a senha? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenha')}>
            <Text style={styles.registerLink}>Recuperar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute',
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
  errorText: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorContainer: {
    marginBottom: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
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

export default Login;
