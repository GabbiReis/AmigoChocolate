import axios, { AxiosResponse, AxiosError } from 'axios';
import { Grupo } from '../../types/Grupo';
import { User } from '../../types/User';
import { Sorteio } from '../../types/Sorteio';

const BASE_URL = 'https://localhost:7147/api';

class GrupoService {
  private token: string | null = null;

  constructor(token: string) {
    this.token = token;
  }

  public async criarGrupo(grupo: Grupo): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('Nome', grupo.Nome);
      formData.append('QuantidadeMaxParticipantes', grupo.QuantidadeMaxParticipantes.toString());
      formData.append('Valor', grupo.Valor.toString());
      formData.append('DataRevelacao', grupo.DataRevelacao.toISOString());
      formData.append('Descricao', grupo.Descricao);

      if (grupo.Icone) {
        const responsePhoto = await fetch(grupo.Icone.toString());
        const blob = await responsePhoto.blob();
        formData.append('Icone', blob, 'photo.jpg');
      }

      const response = await axios.post(`${BASE_URL}/Grupos/Cadastrar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: this.token ? `Bearer ${this.token}` : '',
        },
      });

      return response.status === 201;
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      throw new Error('Não foi possível criar o grupo. Verifique sua conexão e tente novamente.');
    }
  }

  

  async getSorteioUsuario(grupoId: number, usuarioId: number): Promise<Sorteio | null> {
    try {
      const response = await axios.get<Sorteio>(`${BASE_URL}/Sorteios/UsuarioSorteio/${grupoId}/${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter sorteio do usuário:', error);
      return null;
    }
  }
  
  async sortearAmigoSecreto(grupoId: number): Promise<Sorteio[]> {
    try {
      const response = await axios.post(`${BASE_URL}/Sorteios/SortearAmigoSecreto/${grupoId}`, {}, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao sortear amigo secreto:', error);
      throw error;
    }
  }

  public async editarGrupo(grupoId: number, grupo: FormData): Promise<void> {
    try {
      const response = await axios.put(`${BASE_URL}/Grupos/Editar/${grupoId}`, grupo, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: this.token ? `Bearer ${this.token}` : '',
        },
      });

      console.log('Resposta da API ao editar grupo:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Erro na resposta do servidor ao editar grupo:', axiosError.response.data);
          console.error('Status do erro:', axiosError.response.status);
        } else {
          console.error('Erro ao fazer a requisição para editar grupo:', axiosError.message);
        }
      } else {
        console.error('Erro desconhecido ao editar grupo:', error);
      }
      throw new Error(`Erro ao editar grupo com ID ${grupoId}`);
    }
  }


  public async getGruposDoUsuario(): Promise<Grupo[]> {
    try {
      const response: AxiosResponse<any> = await axios.get(`${BASE_URL}/Grupos/DoUsuario`, {
        headers: {
          Authorization: this.token ? `Bearer ${this.token}` : '',
        },
      });

      if (response.data && response.data.$values) {
        return response.data.$values as Grupo[];
      }

      throw new Error('Resposta inesperada da API');
    } catch (error) {
      console.error('Erro ao buscar os grupos do usuário:', error);
      throw new Error('Não foi possível buscar os grupos do usuário. Verifique sua conexão e tente novamente.');
    }
  }

  public async getDetalhesGrupo(grupoId: number): Promise<Grupo> {
    try {
      const response: AxiosResponse<any> = await axios.get(`${BASE_URL}/Grupos/${grupoId}`, {
        headers: {
          Authorization: this.token ? `Bearer ${this.token}` : '',
        },
      });
  
      if (response.data) {
        console.log('Resposta da API:', response.data);
  
        const base64Icone = `data:image/png;base64,${response.data.icone}`;
        const grupoDetalhes: Grupo = {
          grupoId: response.data.id,
          Nome: response.data.nome,
          QuantidadeMaxParticipantes: response.data.quantidadeMaxParticipantes,
          Valor: response.data.valor,
          DataRevelacao: new Date(response.data.dataRevelacao),
          Descricao: response.data.descricao,
          Icone: { uri: base64Icone },
          administradorId: response.data.administradorId,
          UsuariosGrupos: response.data.usuariosGrupos && response.data.usuariosGrupos.$values
            ? response.data.usuariosGrupos.$values.map((user: any) => ({
                userId: user.id,
                Nome: user.nome,
                Email: user.email,
              }))
            : [],
        };
  
        console.log('Detalhes do Grupo Formados:', grupoDetalhes);
  
        return grupoDetalhes;
      }
  
      throw new Error('Resposta inesperada da API');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Erro na resposta do servidor:', axiosError.response.data);
          console.error('Status do erro:', axiosError.response.status);
        } else {
          console.error('Erro ao fazer a requisição:', axiosError.message);
        }
      } else {
        console.error('Erro desconhecido:', error);
      }
      throw new Error(`Erro ao buscar detalhes do grupo com ID ${grupoId}`);
    }
  }  
  
  public async getUsuariosDoGrupo(grupoId: number): Promise<User[]> {
    try {
      const response: AxiosResponse<any> = await axios.get(`${BASE_URL}/Grupos/UsuariosDoGrupo/${grupoId}`, {
        headers: {
          Authorization: this.token ? `Bearer ${this.token}` : '',
        },
      });
  
      if (response.data && response.data.$values) {
        return response.data.$values.map((user: any) => ({
          Id: user.id,
          Nome: user.nome,
          Email: user.email,
        }));
      }
  
      throw new Error('Resposta inesperada da API');
    } catch (error) {
      console.error(`Erro ao buscar usuários do grupo com ID ${grupoId}:`, error);
      throw new Error('Não foi possível buscar os usuários do grupo. Verifique sua conexão e tente novamente.');
    }
  }

  async excluirGrupo(grupoId: number): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/grupos/${grupoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao excluir grupo');
      }
  
      console.log('Resposta da API ao excluir grupo:', response.status);
  
    } catch (error) {
      console.error('Erro ao excluir grupo:', error);
      throw new Error('Não foi possível excluir o grupo. Verifique sua conexão e tente novamente.');
    }
  }
}

export default GrupoService;
