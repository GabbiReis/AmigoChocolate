import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';

const EsqueciSenha = () => {
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image style={styles.imageBackground} source={require('../../../assets/images/amigo-chocolate.png')} />

      <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />
      
      {/* View para o formulário de recuperação de senha */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Esqueci senha</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite seu email"
            placeholderTextColor="gray"
            style={styles.textInput}
          />
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Enviar email de recuperação</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text>Já tem uma conta? </Text>
          <TouchableOpacity>
            <Text style={styles.registerLink} onPress={() => { navigation.navigate('Login'); }}>
              Entrar
            </Text>
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
    position: 'absolute'
  },
  logo: {
    position: 'absolute', // Adiciona a posição absoluta
    top: 20, // Distância do topo
    left: 20, // Distância da esquerda
    width: 210, // Largura da logo (ajuste conforme necessário)
    height: 100, // Altura da logo (ajuste conforme necessário)
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Cor de fundo do formulário
    width: '80%', // Largura do formulário
    borderRadius: 20, // Borda do formulário
    padding: 20, // Espaçamento interno do formulário
    alignItems: 'center', // Centralizar elementos no formulário
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Cor de fundo do campo de entrada
    justifyContent: 'center',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    width: '100%', // Preencher a largura do formulário
  },
  textInput: {
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#FFD100',
    padding: 15,
    borderRadius: 20,
    width: '100%', // Preencher a largura do formulário
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
});

export default EsqueciSenha;
