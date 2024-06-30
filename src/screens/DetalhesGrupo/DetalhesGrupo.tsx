import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GrupoService from '../../service/GrupoService/GrupoService';
import { StackTypes } from '../../routes/stack';
import { Grupo } from '../../types/Grupo';
import { User } from '../../types/User';
import { Sorteio } from '../../types/Sorteio';


const DetalhesGrupo = () => {
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [loading, setLoading] = useState(true);
  const [usuariosDoGrupo, setUsuariosDoGrupo] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [meuSorteio, setMeuSorteio] = useState<Sorteio | null>(null);
  const [sorteioRealizado, setSorteioRealizado] = useState(false);

  const navigation = useNavigation<StackTypes>();
  const route = useRoute();

  const { grupoId } = route.params as { grupoId: number };

  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        const token = await AsyncStorage.getItem('tokenJwt');
        const userId = await AsyncStorage.getItem('userId');

        if (!token) {
          throw new Error('Token JWT não encontrado.');
        }

        if (!userId) {
          throw new Error('User ID não encontrado.');
        }

        const grupoService = new GrupoService(token);
        const grupoDetalhes = await grupoService.getDetalhesGrupo(grupoId);
        setGrupo(grupoDetalhes);

        const usuarios = await grupoService.getUsuariosDoGrupo(grupoId);
        setUsuariosDoGrupo(usuarios);

        const sorteio = await grupoService.getSorteioUsuario(grupoId, parseInt(userId, 10));
        setMeuSorteio(sorteio);

        if (parseInt(grupoDetalhes.administradorId, 10) === parseInt(userId, 10)) {
          setIsAdmin(true);
        }

        if (sorteio) {
          setSorteioRealizado(true);
        }

        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar detalhes do grupo:', error);
        setLoading(false);
      }
    };
    fetchGrupo();
  }, [grupoId]);

  const sortearAmigoSecreto = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('tokenJwt');
      if (!token) throw new Error('Token não encontrado.');

      const grupoService = new GrupoService(token);
      const sorteios = await grupoService.sortearAmigoSecreto(grupoId);
      console.log('Sorteio realizado:', sorteios);
      setLoading(false);
      Alert.alert('Amigo secreto sorteado com sucesso!');
      setMeuSorteio(null);
      setSorteioRealizado(true);
    } catch (error) {
      console.error('Erro ao sortear amigo secreto:', error);
      setLoading(false);
      Alert.alert('Erro ao sortear amigo secreto. Por favor, tente novamente mais tarde.');
    }
  };

  const excluirGrupo = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenJwt');
      if (!token) throw new Error('Token não encontrado.');

      const grupoService = new GrupoService(token);
      await grupoService.excluirGrupo(grupoId);

      Alert.alert('Grupo excluído com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao excluir grupo:', error);
      Alert.alert('Erro ao excluir grupo. Por favor, tente novamente mais tarde.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require('../../../assets/images/carregando.gif')} style={styles.loadingImage} />
        <Text style={styles.loadingText}>Carregando detalhes do grupo...</Text>
      </View>
    );
  }

  if (!grupo) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Não foi possível carregar os detalhes do grupo.</Text>
      </View>
    );
  }

  const { Nome, QuantidadeMaxParticipantes, Valor, DataRevelacao, Descricao, Icone } = grupo;

  const getNomeParticipante = (id: number) => {
    const participante = usuariosDoGrupo.find((user) => user.userId === id);
    return participante ? participante.Nome : 'Desconhecido';
  };

  const navigateToEdicaoGrupo = () => {
    navigation.navigate('EditarGrupo', { grupoId: grupo.grupoId } as never);
  };

  const navigateConviteGrupo = () => {
    console.log('Navigating to ConviteGrupo with grupoId:', grupo.grupoId);
    navigation.navigate('ConviteGrupo', { grupoId: grupo.grupoId } as never);
  };


  const formatarData = (data: Date | string) => {
    if (typeof data === 'string') {
      return new Date(data).toLocaleDateString();
    } else {
      return data.toLocaleDateString();
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('../../../assets/images/Choco_GABI.svg')} />
      <View style={styles.header}>
        <TouchableOpacity>
          <Image style={styles.profileImage} source={require('../../../assets/images/Icon.svg')} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.headerText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Image style={styles.groupIcon} source={Icone} />
          </View>
          <Text style={styles.groupName}>
            {Nome}
            {isAdmin && (
              <TouchableOpacity onPress={navigateToEdicaoGrupo}>
                <AntDesign name="edit" size={24} color="white" style={styles.editIcon} />
              </TouchableOpacity>
            )}
          </Text>
          <Text style={styles.participants}>{usuariosDoGrupo.length}/{QuantidadeMaxParticipantes} Participantes</Text>
          <ScrollView style={styles.participantList}>
            {usuariosDoGrupo.length > 0 ? (
              usuariosDoGrupo.map((participant, index) => (
                <View key={index} style={styles.participant}>
                  <Text style={styles.participantName}>{participant.Nome}</Text>
                  <Text style={styles.participantEmail}>{participant.Email}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.participant}>Nenhum participante</Text>
            )}
          </ScrollView>

          <View style={styles.centerContainer}>
               <TouchableOpacity onPress={navigateConviteGrupo}>
              <AntDesign name="sharealt" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.groupInfoContainer}>
            <View style={styles.groupInfoItem}>
              <Text style={styles.groupInfoLabel}>Valor:</Text>
              <Text style={styles.groupInfoValue}>{Valor ? Valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'N/A'}</Text>
            </View>
            <View style={styles.groupInfoItem}>
              <Text style={styles.groupInfoLabel}>Data de Revelação:</Text>
              <Text style={styles.groupInfoValue}>{DataRevelacao ? formatarData(DataRevelacao) : 'N/A'}</Text>
            </View>
            <View style={styles.groupInfoItem}>
              <Text style={styles.groupInfoLabel}>Descrição:</Text>
              <Text style={styles.groupInfoValue}>{Descricao || 'Nenhuma descrição disponível'}</Text>
            </View>
          </View>

          {meuSorteio ? (
            <View style={styles.groupInfoContainer}>
              <View style={styles.groupInfoItem}>
                <Text style={styles.groupInfoLabel}>Você tirou:</Text>
                <Text style={styles.groupInfoValue}>{getNomeParticipante(meuSorteio.ParticipanteSorteadoId)}</Text>
              </View>
            </View>
          ) : (
            <View style={[styles.groupInfoContainer, styles.centerContainer]}>
              {isAdmin && !sorteioRealizado && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.button, styles.excluirButton]} onPress={excluirGrupo}>
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.sortearButton]} onPress={sortearAmigoSecreto}>
                    <Text style={styles.buttonText}>Sortear</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
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
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 60,
    marginBottom: 20,
  },
  groupIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  groupName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  participants: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  participantList: {
    width: '100%',
    maxHeight: 200,
    marginBottom: 20,
  },
  participant: {
    marginBottom: 10,
  },
  participantName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  participantEmail: {
    fontSize: 14,
    color: 'white',
  },
  shareButton: {
    marginTop: 10,
    backgroundColor: '#6D3415',
    padding: 10,
    borderRadius: 10,
  },
  groupInfoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  groupInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  groupInfoLabel: {
    fontSize: 18,
    color: 'white',
    marginRight: 10,
  },
  groupInfoValue: {
    fontWeight: 'bold',
    fontSize: 18,
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
  editIcon: {
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    width: 100,
    height: 100,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetalhesGrupo;