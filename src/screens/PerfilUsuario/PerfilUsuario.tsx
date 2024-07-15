import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackTypes } from '../../routes/stack';

const BASE_URL = 'https://localhost:7147/api/Usuarios/';

const MenuIcon = () => (
  <View style={styles.menuIcon}>
    <Image
      source={require('../../../assets/images/MenuIcon.png')}
      style={{ width: 30, height: 30 }}
    />
  </View>
);
const PerfilUsuario = () => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userFoto, setUserFoto] = useState<string | null>(null);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const navigation = useNavigation<StackTypes>();
  const navbarAnimation = useRef(new Animated.Value(-1000)).current;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const getUsuarioAutenticado = async () => {
      try {
        const token = await getAuthToken();
        if (!token) {
          throw new Error('Token JWT não encontrado.');
        }

        const response = await axios.get(`${BASE_URL}Me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { id, nome, email, Foto } = response.data;
        setId(id);
        setNome(nome);
        setEmail(email);
        setUserFoto(Foto);
      } catch (error) {
        console.error('Erro ao obter usuário autenticado:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    };

    getUsuarioAutenticado();
  }, []);

  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenJwt');
      return token;
    } catch (error) {
      console.error('Erro ao obter o token JWT:', error);
      return null;
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, preciso de permissão para acessar a imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const salvarPerfil = async () => {
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Token JWT não encontrado.');
      }
  
      const formData = new FormData();
      formData.append('Id', id);
      formData.append('Nome', nome);
      formData.append('Email', email);
  
      if (novaSenha) {
        formData.append('NovaSenha', novaSenha);
        formData.append('ConfirmacaoSenha', confirmacaoSenha);
      }
  
      if (selectedImage) {
        const localUri = selectedImage;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image`;
  
        const responsePhoto = await fetch(localUri);
        const blob = await responsePhoto.blob();
        formData.append('Foto', blob, filename || 'photo.jpg');
      } else if (userFoto) {
        const responsePhoto = await fetch(userFoto);
        const blob = await responsePhoto.blob();
        formData.append('Foto', blob, 'photo.jpg');
      }
  
      const response = await axios.put(`${BASE_URL}Atualizar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200 || response.status === 204) {
        console.log('Perfil atualizado com sucesso.');
        setSuccessMessage('Perfil atualizado com sucesso.');
        setErrorMessage(null);
      } else {
        console.error('Erro ao atualizar perfil:', response.data);
        setErrorMessage('Não foi possível atualizar o perfil.');
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setErrorMessage('Não foi possível atualizar o perfil.');
      setSuccessMessage(null);
    }
  };

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  const closeNavbar = () => {
    setNavbarVisible(false);
  };

  useEffect(() => {
    Animated.timing(navbarAnimation, {
      toValue: navbarVisible ? 0 : -1000,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [navbarVisible]);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('../../../assets/images/Choco_GABI.svg')} />
      <View style={styles.header}>
        <TouchableOpacity>
          <Image style={styles.profileImageIcon} source={require('../../../assets/images/Icon.svg')} />
        </TouchableOpacity>
        <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />
        <TouchableOpacity onPress={toggleNavbar}>
            <MenuIcon />
          </TouchableOpacity>
      </View>
     {navbarVisible && (
          <TouchableOpacity style={styles.overlay} onPress={() => setNavbarVisible(false)} />
        )}
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarAnimation }] }]}>
        <TouchableOpacity style={styles.navCloseBtn} onPress={closeNavbar}>
            <Text style={styles.navCloseText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PerfilUsuario')}>
            <Text style={styles.navItem}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PaginaInicial')}>
            <Text style={styles.navItem}>Meus Grupos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Sobre')}>
            <Text style={styles.navItem}>Sobre</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.popToTop()}>
            <Text style={styles.navItem}>Sair</Text>
          </TouchableOpacity>
        </Animated.View>
      <View style={styles.content}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          {(selectedImage || userFoto) && (
            <Image source={{ uri: selectedImage || userFoto! }} style={styles.profileImageContainer} />
          )}
          {!selectedImage && !userFoto && (
            <Image style={styles.profileImage} source={require('../../../assets/images/Icon.svg')} />
          )}
          <AntDesign name="camera" size={24} color="black" style={styles.cameraIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>Nome:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Digite seu nome"
            onChangeText={setNome}
            value={nome}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>Email:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Digite seu email"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>Nova Senha:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua nova senha"
            secureTextEntry
            onChangeText={setNovaSenha}
            value={novaSenha}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>Confirmar Senha:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Confirme sua nova senha"
            secureTextEntry
            onChangeText={setConfirmacaoSenha}
            value={confirmacaoSenha}
          />
          <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.eyeIcon}>
            <MaterialCommunityIcons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        {successMessage && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>{successMessage}</Text>
          </View>
        )}
        {errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.saveButton} onPress={salvarPerfil}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      resizeMode: 'cover',
      width: '100%',
      position: 'absolute',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 20,
      alignItems: 'center',
    },
    logo: {
      width: 210,
      height: 100,
    },
    headerText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    eyeIcon: {
      position: 'absolute',
      right: 15,
      zIndex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImageContainer: {
      borderRadius: 60,
      marginBottom: 20,
      position: 'relative',
      shadowColor: '#000',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 10,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    profileImageIcon: {
      width: 90,
      height: 90,
      borderRadius: 40,
    },
    navbar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      paddingVertical: 20,
      paddingHorizontal: 20,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      zIndex: 1,
    },
    navItem: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
      marginVertical: 10,
      textAlign: 'center',
    },
    navCloseBtn: {
      position: 'absolute',
      top: 20,
      right: 20,
    },
    navCloseText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
    },
    menuIcon: {
      width: 24,
      height: 24,
      tintColor: 'white',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'transparent',
    },
    scrollViewContent: {
      gap: 8,
      alignItems: 'center',
      paddingVertical: 20,
    },

    cameraIcon: {
      position: 'absolute',
      bottom: 5,
      right: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'white',
    },
    formField: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    fieldLabel: {
      width: 100,
      marginRight: 10,
      fontSize: 16,
      color: 'white',
    },
    textInput: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: 'white',
      color: 'black',
      minWidth: 250,
    },
    saveButton: {
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginTop: 20,
    },
    buttonText: {
      textAlign: 'center',
      color: '#FFD30E',
      fontSize: 16,
      fontWeight: 'bold',
      width: 200,
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
});

export default PerfilUsuario;
