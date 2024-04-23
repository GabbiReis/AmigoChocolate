import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import UserService from '../../service/UserService/UserService'
import { User } from '../../types/User';

const Cadastro = () => {
  const navigation = useNavigation<StackTypes>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Instanciando a classe UserService
  const userService = new UserService();

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão da câmera para continuar!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  const cadastrarUsuario = async () => {
    try {
      // Cria um objeto de usuário com os dados do formulário
      const user: User = { Nome: nome, Email: email, Senha: senha };

      // Chama o método para cadastrar o usuário
      const cadastradoComSucesso = await userService.cadastrarUser(user);

      if (cadastradoComSucesso) {
        // Usuário cadastrado com sucesso
        alert('Usuário cadastrado com sucesso!');
      } else {
        // Falha ao cadastrar usuário
        alert('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image style={styles.imageBackground} source={require('../../../assets/images/amigo-chocolate.png')} />
      
      {/* logo */}
      <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />
      
      {/* formulário de cadastro */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Cadastro</Text>

        {/* Adicionar foto de perfil */}
        <TouchableOpacity onPress={selectImage}>
          <Text style={styles.profileText}>Adicionar foto de perfil</Text>
        </TouchableOpacity>

        {/* Exibir Foto */}
        {profileImage && (
          <Image style={styles.profileImage} source={{ uri: profileImage }} />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nome"
            placeholderTextColor="gray"
            style={styles.textInput}
            onChangeText={setNome}
            value={nome}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            style={styles.textInput}
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor="gray"
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={setSenha}
            value={senha}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => cadastrarUsuario()}>
          <Text style={styles.loginText}>Cadastrar</Text>
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
  profileText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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

export default Cadastro;
