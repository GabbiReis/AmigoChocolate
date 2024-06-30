import axios from 'axios';

class ConviteService {
  private BASE_URL = 'https://localhost:7147/api/Convites';
  private token: string | null = null;

  constructor(token: string | null) {
    this.token = token;
  }


  async enviarConvite(grupoId: number, email: string): Promise<boolean> {
    try {
      const pendente = await this.verificarConvitePendente(grupoId, email);
      if (pendente) {
        console.log('Já existe um convite pendente para este usuário neste grupo.');
        return false;
      }
      const formData = new FormData();
      formData.append('GrupoID', grupoId.toString());
      formData.append('EmailUsuarioConvidado', email);

      const response = await axios.post(
        `${this.BASE_URL}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.token ? `Bearer ${this.token}` : '',
          },
        }
      );
  
      return response.status === 200 || response.status === 201;
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      return false;
    }
  }
  async verificarConvitePendente(grupoId: number, email: string): Promise<boolean> {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/VerificarPendente`,
        { GrupoID: grupoId, EmailUsuarioConvidado: email },
        {
          headers: {
            Authorization: this.token ? `Bearer ${this.token}` : '',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar convite pendente:', error);
      return true;
    }
  }

  async aceitarConvite(tokenConvite: string): Promise<boolean> {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/Aceitar`,
        { tokenConvite },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.token ? `Bearer ${this.token}` : '',
          },
        }
      );
      return response.status === 200;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao aceitar convite:', error.response?.data || error.message);
      } else {
        console.error('Erro desconhecido ao aceitar convite:', error);
      }
      return false;
    }
  }
}

export default ConviteService;
