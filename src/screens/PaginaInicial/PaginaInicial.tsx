import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import UserService from '../../service/UserService/UserService';
import { StackTypes } from '../../routes/stack';

const PaginaInicial = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false); // Estado para controlar a visibilidade da barra de navegação

  const userService = new UserService();
  const navigation = useNavigation<StackTypes>();

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Image style={styles.background} source={require('../../../assets/images/Choco_GABI.svg')} />
        <View style={styles.header}>
          {/* Ícone de perfil */}
          <TouchableOpacity>
            <Image style={styles.profileImage} source={require('../../../assets/images/Icon.svg')} />
          </TouchableOpacity>
          {/* Logo */}
          <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />
          <TouchableOpacity onPress={toggleNavbar}> {/* Altera a visibilidade da barra de navegação */}
            <Text style={styles.headerText}>Menu</Text>
          </TouchableOpacity>
        </View>
        {navbarVisible && ( // Renderiza a barra de navegação somente se navbarVisible for verdadeiro
          <View style={styles.navbar}>
            <TouchableOpacity>
              <Text style={styles.navItem}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('PaginaInicial'); }}>
              <Text style={styles.navItem} >Meus Grupos</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.navItem}>Sobre</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
              <Text style={styles.navItem} >Sair</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Bem-vindo!</Text>
          <View style={styles.groupContainer}>
            <Text style={styles.groupText} onPress={() => { navigation.navigate('DetalhesGrupo'); }}>Grupo 1</Text>
            <Text style={styles.groupText}>Grupo 2</Text>
            <Text style={styles.groupText}>Grupo 3</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('CriarGrupo'); }}>
              <AntDesign name="pluscircleo" size={24} color="black" />
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
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '250%',
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
    width: 210, // Largura da logo
    height: 100, // Altura da logo
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 34,
    letterSpacing: 2,
    marginBottom: 20,
  },
  groupContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  groupText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
  },
  navbar: {
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute', // A barra de navegação ficará sobre os outros elementos
    top: 85, // Ajuste conforme necessário
    left: 0,
    right: 0,
  },
  navItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
});

export default PaginaInicial;
