import axios, { AxiosResponse } from 'axios';
import { Grupo } from '../../types/Grupo';

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

  // Outros métodos do serviço...
}

export default GrupoService;
