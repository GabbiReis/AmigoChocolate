import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackTypes } from '../../routes/stack';
import ConviteService from '../../service/ConviteService/ConviteService';

const MenuIcon = () => (
  <View style={styles.menuIcon}>
    <Image
      source={require('../../../assets/images/MenuIcon.png')}
      style={{ width: 30, height: 30 }}
    />
  </View>
);


const EntrarGrupo = () => {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [tokenConvite, setTokenConvite] = useState('');
  const navigation = useNavigation<StackTypes>();
  const navbarAnimation = useRef(new Animated.Value(-1000)).current;

  const handleEntrarGrupo = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenJwt');
      if (token) {
        const conviteService = new ConviteService(token);
        const sucesso = await conviteService.aceitarConvite(tokenConvite);
        if (sucesso) {
          navigation.navigate('PaginaInicial');
        } else {
          console.error('Não foi possível aceitar o convite.');
        }
      }
    } catch (error) {
      console.error('Erro ao tentar entrar no grupo:', error);
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

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.background} source={require('../../../assets/images/Choco_GABI.svg')} />
        <View style={styles.header}>
          <TouchableOpacity>
            <Image style={styles.profileImage} source={require('../../../assets/images/Icon.svg')} />
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.welcomeText}>Entrar em um Grupo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o token do grupo"
            value={tokenConvite}
            onChangeText={setTokenConvite}
          />
          <TouchableOpacity style={styles.button} onPress={handleEntrarGrupo}>
            <Text style={styles.buttonText}>Entrar no Grupo</Text>
          </TouchableOpacity>
        </ScrollView>
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
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  logo: {
    width: 210,
    height: 100,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  welcomeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5, // Sombra para Android
  },
  buttonText: {
    color: '#6D3415',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
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
    zIndex: 10,
  },
  navItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
    textAlign: 'center',
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
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
});

export default EntrarGrupo;
