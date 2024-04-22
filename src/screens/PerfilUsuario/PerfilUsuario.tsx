import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const PerfilUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, preciso de permissão pra acessa a imagem.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  const salvarPerfil = () => {
    // Implementar lógica para salvar dados do perfil do usuário (ex: chamada de API, atualização de armazenamento local)
    console.log('Perfil salvo!');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('../../../assets/images/Choco_GABI.svg')} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>Voltar</Text>
        </TouchableOpacity>
        <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.profileImage} />
          ) : (
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
        <TouchableOpacity style={styles.saveButton} onPress={salvarPerfil}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
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
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImageContainer: {
      marginBottom: 20,
      position: 'relative',
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    cameraIcon: {
      position: 'absolute',
      bottom: 5,
      right: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'white',
    },
    formField: {
      marginBottom: 15,
    },
    fieldLabel: {
      fontSize: 16,
      color: 'white',
      marginBottom: 5,
    },
    textInput: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: '#FFD100',
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  

export default PerfilUsuario;