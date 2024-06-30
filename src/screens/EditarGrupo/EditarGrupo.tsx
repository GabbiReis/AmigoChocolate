import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GrupoService from '../../service/GrupoService/GrupoService';
import { StackTypes } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';

const EditarGrupo = () => {
  const [grupoId, setGrupoId] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [quantidadeMaxParticipantes, setQuantidadeMaxParticipantes] = useState('');
  const [valor, setValor] = useState('');
  const [dataRevelacao, setDataRevelacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [icone, setIcone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackTypes>();
  const route = useRoute();

  useEffect(() => {
    const { grupoId } = route.params as { grupoId: number };
    setGrupoId(grupoId);
  }, []);

  const handleEditarGrupo = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('tokenJwt');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        throw new Error('Token ou userId não encontrado');
      }

      const grupoService = new GrupoService(token);
      const formData = new FormData();
      formData.append('Nome', nome);
      formData.append('QuantidadeMaxParticipantes', quantidadeMaxParticipantes);
      formData.append('Valor', valor);
      formData.append('DataRevelacao', dataRevelacao);
      formData.append('Descricao', descricao);
      
      if (icone) {
        formData.append('Icone', {
          uri: icone,
          name: 'icone_grupo.jpg',
          type: 'image/jpeg',
        } as any);
      }

      await grupoService.editarGrupo(grupoId!, formData);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao editar grupo:', error);
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setIcone(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao escolher imagem:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require('../../../assets/images/carregando.gif')} style={styles.loadingImage} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('../../../assets/images/Choco_GABI.svg')} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />
        </View>
        <View></View>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.label}>Nome do Grupo</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o nome do grupo"
          />
          
          <Text style={styles.label}>Quantidade Máxima de Participantes</Text>
          <TextInput
            style={styles.input}
            value={quantidadeMaxParticipantes}
            onChangeText={setQuantidadeMaxParticipantes}
            keyboardType="numeric"
            placeholder="Digite a quantidade máxima de participantes"
          />
          
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
            placeholder="Digite o valor"
          />
          
          <Text style={styles.label}>Data de Revelação</Text>
          <TextInput
            style={styles.input}
            value={dataRevelacao}
            onChangeText={setDataRevelacao}
            placeholder="Digite a data de revelação"
          />
          
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={4}
            placeholder="Digite a descrição"
          />
          
          <TouchableOpacity style={styles.selectImageButton} onPress={pickImage}>
            <Text style={styles.selectImageText}>Selecionar Ícone do Grupo</Text>
          </TouchableOpacity>
          
          {icone && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: icone }} style={styles.imagePreview} />
            </View>
          )}
          
          <TouchableOpacity style={styles.button} onPress={handleEditarGrupo}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>
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
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    padding: 10,
  },
  selectImageButton: {
    backgroundColor: '#6D3415',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectImageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  imagePreviewContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#6D3415',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
});

export default EditarGrupo;
