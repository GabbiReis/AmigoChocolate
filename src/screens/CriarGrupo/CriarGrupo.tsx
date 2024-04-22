import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';
import axios, { AxiosResponse } from 'axios';


const CriarGrupo= () => {
  const [nomeGrupo, setNomeGrupo] = useState<string>('');
  const [maxParticipantes, setMaxParticipantes] = useState<string>('');
  const [valor, setValor] = useState<string>('');
  const [dataRevelacao, setDataRevelacao] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');

  const navigation = useNavigation<StackTypes>();

  const salvarGrupo = async () => {
    try {
        // Enviar os dados do grupo para o servidor
        const response = await axios.post('http://endereco-do-seu-backend/api/Grupos', {
          nome: nomeGrupo,
          maxParticipantes,
          valor,
          dataRevelacao,
          descricao
        });
        
        // Verificar se o grupo foi salvo com sucesso
        if (response.status === 201) {
          // Grupo salvo com sucesso, redirecionar para a página inicial ou outra página
          navigation.navigate('PaginaInicial');
        }
      } catch (error) {
        console.error('Erro ao salvar o grupo:', error);
        alert('Ocorreu um erro ao salvar o grupo. Por favor, tente novamente mais tarde.');
    }

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
        <Text style={styles.welcomeText}>Criar Grupo</Text>
        <View style={styles.groupContainer}>
          <TextInput
            placeholder="Nome do Grupo"
            style={styles.input}
            value={nomeGrupo}
            onChangeText={setNomeGrupo}
          />
          <TextInput
            placeholder="Máximo de Participantes"
            style={styles.input}
            value={maxParticipantes}
            onChangeText={setMaxParticipantes}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Valor"
            style={styles.input}
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Data da Revelação"
            style={styles.input}
            value={dataRevelacao}
            onChangeText={setDataRevelacao}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Descrição"
            style={[styles.input, styles.textarea]}
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={salvarGrupo}>
            <Text style={styles.buttonText}>Salvar</Text>
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
    width: '80%',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FFD100',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CriarGrupo;
