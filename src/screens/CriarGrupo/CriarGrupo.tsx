import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import GrupoService from '../../service/GrupoService/GrupoService';
import { Grupo } from '../../types/Grupo';
import { ImageSourcePropType } from 'react-native';
import UserService from '../../service/UserService/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../types/User';

const CriarGrupo = () => {
  const [nomeGrupo, setNomeGrupo] = useState('');
  const [maxParticipantes, setMaxParticipantes] = useState<number>(0);
  const [profileImageIcon, setProfileImage] = useState<string | null>(null);
  const [valor, setValor] = useState<number | null>(null);
  const [dataRevelacao, setDataRevelacao] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [descricao, setDescricao] = useState<string>('');
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [grupoService, setGrupoService] = useState<GrupoService | null>(null);
  const [usuario, setUsuario] = useState<User | null>(null);
  const navbarAnimation = useRef(new Animated.Value(-1000)).current;

  const navigation = useNavigation<StackTypes>();
  const userService = new UserService();

  useEffect(() => {
    const token = userService.getToken();
    if (token) {
      setGrupoService(new GrupoService(token));
      userService.setToken(token);
      userService.getUsuarioAutenticado().then(setUsuario);
    }
  }, []);

  const MenuIcon = () => (
    <View style={styles.menuIcon}>
      <Image
        source={require('../../../assets/images/MenuIcon.png')}
        style={{ width: 30, height: 30 }}
      />
    </View>
  );
  const salvarGrupo = async () => {
    if (!grupoService || !usuario) {
      console.error('Erro: serviço de grupo ou usuário não está disponível.');
      return;
    }
    
    try {
      const token = await AsyncStorage.getItem('tokenJwt');
      const userId = await AsyncStorage.getItem('userId');
    
      if (!token || !userId) {
        throw new Error('Token JWT ou ID do usuário não encontrado.');
      }
    
      const grupo: Grupo = {
        Nome: nomeGrupo,
        QuantidadeMaxParticipantes: maxParticipantes,
        Valor: valor || 0,
        DataRevelacao: dataRevelacao,
        Descricao: descricao,
        Icone: profileImageIcon as ImageSourcePropType,
        UsuariosGrupos: [usuario],
        administradorId: userId,
      };
      

      const sucesso = await grupoService.criarGrupo(grupo);

      if (sucesso) {
        navigation.navigate('PaginaInicial');
      } else {
        throw new Error('Não foi possível criar o grupo. Por favor, tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao criar o grupo:', error);
    }
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão da câmera para continuar!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const formatarValor = (valor: number | null) => {
    if (valor === null) return '';
    return `R$ ${valor.toFixed(2)}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dataRevelacao;
    setShowDatePicker(false);
    setDataRevelacao(currentDate);
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
    <View style={styles.container}>
      <Image style={styles.background} source={require('../../../assets/images/Choco_GABI.svg')} />
      <View style={styles.header}>
        <TouchableOpacity>
          <Image style={styles.profileImageIconNavbar} source={require('../../../assets/images/Icon.svg')} />
        </TouchableOpacity>
        <Image style={styles.logo} source={require('../../../assets/images/Logo1.png')} />
        <TouchableOpacity onPress={toggleNavbar}>
            <MenuIcon/>
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Criar Grupo</Text>
          <View style={styles.groupContainer}>
            <TouchableOpacity onPress={selectImage}>
              <Text style={styles.input}>Adicionar Icone do Grupo</Text>
            </TouchableOpacity>
            {profileImageIcon && (
              <Image style={styles.profileImageIcon} source={{ uri: profileImageIcon }} />
            )}
            <TextInput
              placeholder="Nome do Grupo"
              style={styles.input}
              value={nomeGrupo}
              onChangeText={setNomeGrupo}
            />
            <TextInput
              placeholder="Máximo de Participantes"
              style={styles.input}
              value={maxParticipantes ? maxParticipantes.toString() : ''}
              onChangeText={(text) => setMaxParticipantes(parseInt(text, 10))}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Valor"
              style={styles.input}
              value={formatarValor(valor)}
              onChangeText={(text) => {
                const parsedValue = parseFloat(text.replace('R$', '').replace(',', '.'));
                if (!isNaN(parsedValue)) setValor(parsedValue);
              }}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text>{dataRevelacao.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dataRevelacao}
                mode="date"
                display="calendar"
                onChange={handleDateChange}
              />
            )}
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  profileImageIconNavbar: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  profileImageIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
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

export default CriarGrupo;
