import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';

const ConviteGrupo= () => {
const navigation = useNavigation<StackTypes>();

  const entrarNoGrupo = () => {
    // Lógica para entrar no grupo
    console.log('Entrou no grupo');
  };

  const recusarConvite = () => {
    // Lógica para recusar o convite
    console.log('Recusou o convite');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('../../../assets/images/Choco_GABI.svg')} />
      <View style={styles.header}>
        {/* Ícone de perfil */}
        <TouchableOpacity>
          <Image style={styles.profileImage} source={require('../../../assets/images/Icon.svg')} />
        </TouchableOpacity>
        {/* Logo */}
        <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.inviteTitle}>Convite para o Grupo</Text>
        <Text style={styles.descriptionText}>Você foi convidado para participar do grupo...</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.entrarButton]} onPress={entrarNoGrupo}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.recusarButton]} onPress={recusarConvite}>
            <Text style={styles.buttonText}>Recusar</Text>
          </TouchableOpacity>
        </View>
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
  profileImage: {
    width:90,
    height: 90,
    borderRadius: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  inviteTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '45%',
  },
  entrarButton: {
    backgroundColor: '#FFD100',
  },
  recusarButton: {
    backgroundColor: '#FFD100',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConviteGrupo;
