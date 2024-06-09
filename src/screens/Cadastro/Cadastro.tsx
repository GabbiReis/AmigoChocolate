import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import CadastroService from '../../service/CadastroService/CadastroService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { User } from '../../types/User';
import { ImageSourcePropType } from 'react-native';

const Cadastro = () => {
  const navigation = useNavigation<StackTypes>();
  const [profileImage, setProfileImage] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const cadastroService = new CadastroService();

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

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (senha !== confirmarSenha) {
      setErrorMessage('As senhas não coincidem.');
      setSuccessMessage(null);
      return;
    }

    try {
      const user: User = {
        Nome: nome,
        Email: email,
        Senha: senha,
        Foto: profileImage as ImageSourcePropType
      };

      const userAdded = await cadastroService.addUser(user);
      console.log('Resposta do cadastro:', userAdded);
      if (userAdded) {
        setErrorMessage(null);
        setSuccessMessage('Usuário cadastrado com sucesso.');
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000); // Aguarda 2 segundos antes de redirecionar
      } else {
        setErrorMessage('Houve um problema ao cadastrar o usuário.');
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setErrorMessage('Houve um problema ao cadastrar o usuário.');
      setSuccessMessage(null);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image style={styles.imageBackground} source={require('../../../assets/images/amigo-chocolate.png')} />

      <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Cadastro</Text>

        <TouchableOpacity onPress={selectImage}>
          <Text style={styles.profileText}>Adicionar foto de perfil</Text>
        </TouchableOpacity>

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
            secureTextEntry={!showPassword}
            style={styles.textInput}
            onChangeText={setSenha}
            value={senha}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirmar Senha"
            placeholderTextColor="gray"
            secureTextEntry={!showConfirmPassword}
            style={styles.textInput}
            onChangeText={setConfirmarSenha}
            value={confirmarSenha}
          />
          <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.eyeIcon}>
            <MaterialCommunityIcons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="black" />
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
        <TouchableOpacity style={styles.loginButton} onPress={handleUpload}>
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
    flexDirection: 'row',
    justifyContent: 'center',
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

export default Cadastro;
