import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StackTypes } from '../../routes/stack';

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
  const navigation = useNavigation<StackTypes>();

  useEffect(() => {
    fetchGrupos();
  }, []);

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  const closeNavbar = () => {
    if (navbarVisible) {
      setNavbarVisible(false);
    }
  };

  const fetchGrupos = async () => {
    try {
      const response = await axios.get('https://localhost:7147/api/Grupos');
      setGrupos(response.data);
    } catch (error) {
      console.error('Erro ao buscar os grupos:', error);
    }
  };

  return (
    <>
      <StatusBar hidden />
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
          <TouchableOpacity style={styles.overlay} onPress={closeNavbar} />
        )}
        {navbarVisible && (
          <View style={[styles.navbar, { zIndex: 1 }]}>
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
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Bem-vindo(a)!</Text>
          <FlatList
            data={grupos}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.groupContainer} onPress={() => navigation.navigate('DetalhesGrupo', { grupoId: item.ID })}>
                <Text style={styles.groupText}>{item.Nome}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => (item.ID ? item.ID.toString() : null)}
          />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CriarGrupo')}>
            <Text style={styles.buttonText}>Criar Grupo</Text>
          </TouchableOpacity>
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
    width: 210,
    height: 100,
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
    width: '80%',
    marginBottom: 20,
  },
  groupText: {
    color: 'white',
    fontSize: 18,
  },
  navbar: {
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 85,
    left: 0,
    right: 0,
  },
  navItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'Black',
    marginVertical: 10,
    textAlign: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
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
  buttonText: {
    color: '#6D3415',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});

export default PaginaInicial;
