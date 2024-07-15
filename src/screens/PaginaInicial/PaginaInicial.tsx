import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackTypes } from '../../routes/stack';
import GrupoService from '../../service/GrupoService/GrupoService';

const MenuIcon = () => (
  <View style={styles.menuIcon}>
    <Image
      source={require('../../../assets/images/MenuIcon.png')}
      style={{ width: 30, height: 30 }}
    />
  </View>
);

const PaginaInicial = () => {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [grupos, setGrupos] = useState<any[]>([]);
  const [showNoGroupsMessage, setShowNoGroupsMessage] = useState(true);
  const navigation = useNavigation<StackTypes>();
  const navbarAnimation = useRef(new Animated.Value(-1000)).current;

  const fetchGrupos = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenJwt');
      if (token) {
        const grupoService = new GrupoService(token);
        const gruposUsuario = await grupoService.getGruposDoUsuario();
        console.log('Grupos do usuário:', gruposUsuario);

        if (Array.isArray(gruposUsuario)) {
          setGrupos(gruposUsuario);
          setShowNoGroupsMessage(gruposUsuario.length === 0);
        } else {
          console.error('Resposta inesperada ao buscar os grupos do usuário:', gruposUsuario);
          setGrupos([]);
          setShowNoGroupsMessage(true);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar os grupos do usuário:', error);
      setGrupos([]);
      setShowNoGroupsMessage(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGrupos();
    }, [])
  );

  useEffect(() => {
    if (grupos.length === 0) {
      const timer = setTimeout(() => {
        setShowNoGroupsMessage(false);
      }, 120000);

      return () => clearTimeout(timer);
    }
  }, [grupos]);


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
  

  const handleGrupoPress = (grupoId: number) => {
    navigation.navigate('DetalhesGrupo', { grupoId });
  };

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
          <Text style={styles.welcomeText}>Bem-vindo(a)!</Text>
          {grupos.length === 0 && showNoGroupsMessage && (
            <Text style={styles.textInicial}>Você ainda não participa de nenhum grupo.</Text>
          )}
          {grupos.length > 0 && (
            <>
              <Text style={styles.textInicial}>Abaixo a lista de grupos nos quais você participa:</Text>
              {grupos.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.groupContainer}
                  onPress={() => handleGrupoPress(item.id)}
                >
                  <Text style={styles.groupText}>{item.nome}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CriarGrupo')}>
            <Text style={styles.buttonText}>Criar Grupo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EntrarGrupo')}>
            <Text style={styles.buttonText}>Entrar em um grupo</Text>
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
  logo: {
    width: 210,
    height: 100,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  scrollViewContent: {
    gap: 8,
    alignItems: 'center',
    paddingVertical: 20,
  },
  textInicial: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  welcomeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 34,
    letterSpacing: 2,
    marginBottom: 20,
  },
  groupContainer: {
    backgroundColor: 'rgba(245, 245, 244, 0.9)',
    borderRadius: 10,
    borderWidth: 3, 
    borderColor: '#6D3415',
    padding: 20,
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  groupText: {
    color: '#6D3415',
    fontSize: 18,
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
    zIndex: 1,
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
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
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
  buttonText: {
    color: '#6D3415',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});

export default PaginaInicial;
