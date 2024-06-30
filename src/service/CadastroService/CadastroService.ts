import axios from 'axios';
import { User } from '../../types/User';

const BASE_URL = 'https://localhost:7147/api/Usuarios/';

class CadastroService {
  constructor() {
  }

  async addUser(user: User): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('Nome', user.Nome);
      formData.append('Email', user.Email);
      formData.append('Senha', user.Senha);

      if (user.Foto) {
        const responsePhoto = await fetch(user.Foto.toString());
        const blob = await responsePhoto.blob();
        formData.append('Foto', blob, 'photo.jpg');
      }

      if (user.Senha) {
        formData.append('NovaSenha', user.Senha);
      }

      if (user.ConfirmacaoSenha) {
        formData.append('ConfirmacaoSenha', user.ConfirmacaoSenha);
      }

      const response = await axios.post(BASE_URL + 'Cadastrar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Resposta da API:', response.status, response.data);


      return response.status === 200 || response.status === 201;
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return false;
    }
  }


  public async getUsuarios(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(BASE_URL);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao obter usuários', error.response?.data || error.message);
      } else {
        console.error('Erro desconhecido ao obter usuários', error);
      }
      throw error;
    }
  }
}

export default CadastroService;
