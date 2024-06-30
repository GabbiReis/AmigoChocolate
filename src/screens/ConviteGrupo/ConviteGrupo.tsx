import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConviteService from '../../service/ConviteService/ConviteService';

const ConviteGrupo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { grupoId } = route.params as { grupoId: number };

  const [token, setToken] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem('tokenJwt');
        if (jwtToken) {
          setToken(jwtToken);
        } else {
          throw new Error('Token não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao recuperar token:', error);
        Alert.alert('Erro', 'Você precisa estar logado para enviar convites');
        navigation.goBack();
      }
    };

    fetchToken();
  }, []);

  const enviarConvite = async () => {
    if (!token) {
      Alert.alert('Erro', 'Token não encontrado');
      return;
    }
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }
    if (!grupoId) {
      Alert.alert('Erro', 'ID do grupo não encontrado');
      return;
    }

    const conviteService = new ConviteService(token);

    try {
      const success = await conviteService.enviarConvite(grupoId, email);
      if (success) {
        setShowSuccessMessage(true);
        setShowErrorMessage(false);
        setTimeout(() => setShowSuccessMessage(false), 5000);
      } else {
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
    }
  };

  return (
    <ImageBackground source={require('../../../assets/images/Choco_GABI.svg')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.inviteTitle}>Convite para o Grupo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.sendButton} onPress={enviarConvite}>
          <Text style={styles.buttonText}>Enviar Convite</Text>
        </TouchableOpacity>
        {showSuccessMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.successMessage}>Convite enviado com sucesso</Text>
          </View>
        )}
        {showErrorMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.errorMessage}>Falha ao enviar convite</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFD100',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inviteTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#FFD100',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageContainer: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  successMessage: {
    color: 'green',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ConviteGrupo;
