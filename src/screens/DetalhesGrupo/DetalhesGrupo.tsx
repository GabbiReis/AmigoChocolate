import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';

const DetalhesGrupo = () => {
  // Dados fictícios do grupo para exemplo
  const nomeGrupo = 'Grupo do Amigo Secreto';
  const participantes = ['Ana', 'Pedro', 'Maria'];
  const numeroParticipantes = participantes.length;
  const maxParticipantes = 20;
  const sorteioRealizado = false; // Altere para true se o sorteio já foi realizado

  const navigation = useNavigation<StackTypes>();

  // Função para excluir o grupo
  const excluirGrupo = () => {
    // Lógica para excluir o grupo
    console.log('Grupo excluído');
  };

  // Função para sortear o amigo secreto
  const sortearAmigoSecreto = () => {
    // Lógica para sortear o amigo secreto
    console.log('Amigo secreto sorteado');
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
        <Text style={styles.groupName}>{nomeGrupo}</Text>
        <Text style={styles.participants}>{numeroParticipantes}/{maxParticipantes} Participantes</Text>
        <View style={styles.participantList}>
          {participantes.map((participant, index) => (
            <Text key={index} style={styles.participant}>{participant}</Text>
          ))}
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={() => { navigation.navigate('ConviteGrupo'); }}>
          <AntDesign name="sharealt" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.sorteioRealizado}>
          Sorteio: {sorteioRealizado ? 'Realizado' : 'Ainda não realizado'}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.excluirButton]} onPress={excluirGrupo}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.sortearButton]} onPress={sortearAmigoSecreto}>
            <Text style={styles.buttonText}>Sortear</Text>
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
  groupName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  participants: {
    fontSize: 18,
    color: 'white',
  },
  participantList: {
    marginTop: 10,
    marginBottom: 20,
  },
  participant: {
    fontSize: 16,
    color: 'white',
  },
  shareButton: {
    marginTop: 10,
  },
  sorteioRealizado: {
    marginTop: 10,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '45%',
  },
  excluirButton: {
    backgroundColor: 'red',
  },
  sortearButton: {
    backgroundColor: '#FFD100',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DetalhesGrupo;
