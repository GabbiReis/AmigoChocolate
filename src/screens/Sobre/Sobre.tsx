import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';

const MenuIcon = () => (
  <View style={styles.menuIcon}>
    <Image
      source={require('../../../assets/images/MenuIcon.png')}
      style={{ width: 30, height: 30 }} // Defina o tamanho do ícone conforme necessário
    />
  </View>
);

const Sobre = () => {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const navigation = useNavigation<StackTypes>();

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  const closeNavbar = () => {
    if (navbarVisible) {
      setNavbarVisible(false);
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
        <View style={styles.formContainer}>
          <View style={styles.content}>
            <View style={styles.sobreContainer}>
              <Text style={styles.sobreTitle}>Bem-vindo(a) ao ChocoMigos!</Text>
              <Text style={styles.sobreDescription}>
                O ChocoMigos é uma aplicação que torna a organização de sorteios de Amigo Chocolate fácil e divertida. Com o ChocoMigos, você pode criar grupos de amigos, familiares ou colegas de trabalho, e o aplicativo cuida de todo o processo de sorteio para você.
                {"\n\n"}
                Esqueça os papéis dobrados e os sorteios manuais! O ChocoMigos faz todo o trabalho pesado para você. Basta adicionar os participantes, configurar as regras do sorteio (como restrições de presentes, valor máximo, etc.) e deixar o aplicativo fazer o resto.
                {"\n\n"}
                Além disso, o ChocoMigos permite que você mantenha o anonimato dos sorteios, garantindo uma experiência justa e emocionante para todos os participantes. Com recursos intuitivos e uma interface amigável, é fácil e conveniente usar o ChocoMigos para organizar seus sorteios de Amigo Chocolate.
              </Text>
            </View>
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
    width: 210,
    height: 100,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sobreContainer: {
    backgroundColor: 'offwhite',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  sobreTitle: {
    color: '#FFD30E',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
  },
  sobreDescription: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  navbar: {
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    justifyContent: 'center',
    top: 85,
    left: 0,
    right: 0,
    alignItems: 'center', // This aligns items to the center horizontally
  },
  navItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
    textAlign: 'center',
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
});

export default Sobre;
