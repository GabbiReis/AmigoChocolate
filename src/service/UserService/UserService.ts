import axios from 'axios';
import { User } from '../../types/User';

class UserService {
  private BASE_URL = 'https://localhost:7147/api/Usuarios';
  private token: string | null = null;
  private userId: number | null = null;

  async login(email: string, senha: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.BASE_URL}/Login`, new URLSearchParams({ email, senha }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Resposta do servidor:', response.data);

      if (response.status === 200 && response.data.tokenJwt) {
        const token = response.data.tokenJwt;
        const userId = response.data.id;

        if (userId) {
          this.userId = userId;
          localStorage.setItem('userId', userId.toString());
        }

        localStorage.setItem('jwtToken', token);
        this.token = token;
        return true;
      } else {
        console.error('Erro no login: Token JWT não encontrado');
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao fazer login:', error.message);
        if (error.response) {
          console.error('Dados da resposta de erro:', error.response.data);
        }
      } else {
        console.error('Erro desconhecido ao fazer login:', error);
      }
      return false;
    }
  }

  public getToken(): string | null {
    return this.token || localStorage.getItem('jwtToken');
  }

  public getUserId(): number | null {
    return this.userId || parseInt(localStorage.getItem('userId') || '', 10) || null;
  }

  public setToken(token: string | null): void {
    this.token = token;
  }

  public async getProtectedData(): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/Grupos`, {
        headers: {
          Authorization: this.token ? `Bearer ${this.token}` : '',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao obter dados protegidos', error.response?.data || error.message);
      } else {
        console.error('Erro desconhecido ao obter dados protegidos', error);
      }
      throw error;
    }
  }

  public async esqueciSenha(email: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.BASE_URL}/EsqueciSenha`, { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.status === 200;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao solicitar recuperação de senha:', error.response?.data || error.message);
      } else {
        console.error('Erro desconhecido ao solicitar recuperação de senha', error);
      }
      throw error;
    }
  }

  async redefinirSenha(email: string, tokenRecuperacao: string, novaSenha: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.BASE_URL}/RedefinirSenha`, {
        email,
        tokenRecuperacao,
        novaSenha,
      });
      return response.status === 200;
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return false;
    }
  }

  public async getUsuarioAutenticado(): Promise<User | null> {
    try {
      const response = await axios.get(`${this.BASE_URL}/Me`, {
        headers: {
          Authorization: this.token ? `Bearer ${this.token}` : '',
        },
      });
      return response.data as User;
    } catch (error) {
      console.error('Erro ao obter usuário autenticado:', error);
      return null;
    }
  }
}

export default UserService;
