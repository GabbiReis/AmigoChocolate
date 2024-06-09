import axios from 'axios';
import { User } from '../../types/User';

const BASE_URL = 'https://localhost:7147/api/Usuarios/';

class CadastroService {
  constructor() {
    // Se necessário, adicione inicializações aqui
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

      const response = await axios.post(BASE_URL + 'Cadastrar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Resposta da API:', response.status, response.data);

      // Aceite tanto o status 200 quanto o 201
      return response.status === 200 || response.status === 201;
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return false; // Retorna false em caso de erro
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


  // Descomente e ajuste esses métodos conforme necessário
  // async updateUser(CadastroUsuario: CadastroUsuario): Promise<boolean> {
  //   try {
  //     const formData = new FormData();
  //     formData.append('Nome', CadastroUsuario.Nome);
  //     formData.append('Email', CadastroUsuario.Email);
  //     formData.append('Senha', CadastroUsuario.Senha);

  //     if (CadastroUsuario.Foto) {
  //       const responsePhoto = await fetch(CadastroUsuario.Foto);
  //       const blob = await responsePhoto.blob();
  //       formData.append('Foto', blob, 'photo.*');
  //     }

  //     const editResponse = await axios.put(BASE_URL + `UpdateUser/${CadastroUsuario.id}`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (editResponse.status === 200) {
  //       return true;
  //     } else {
  //       console.error('Erro ao editar usuário:', editResponse.statusText);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Erro ao editar usuário:', error);
  //     return false;
  //   }
  // }

  // public async getUsuario(id: number): Promise<CadastroUsuario> {
  //   try {
  //     const response = await axios.get<CadastroUsuario>(`${BASE_URL}${id}`);
  //     return response.data;
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error(`Erro ao obter usuário com ID ${id}`, error.response?.data || error.message);
  //     } else {
  //       console.error(`Erro desconhecido ao obter usuário com ID ${id}`, error);
  //     }
  //     throw error;
  //   }
  // }
}

export default CadastroService;
