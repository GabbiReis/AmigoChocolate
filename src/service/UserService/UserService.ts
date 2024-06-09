import axios from 'axios';


class UserService {
  private BASE_URL = 'https://localhost:7147/api/Usuarios'; // Atualize a URL base conforme necessário
  private token: string | null = null;

  // Método de autenticação
  async login(email: string, senha: string): Promise<boolean> {
    try {
        const response = await axios.post(`${this.BASE_URL}/Login`, new URLSearchParams({ email, senha }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('Resposta do servidor:', response.data); // Adicionando log para depuração
        if (response.status === 200 && response.data.tokenJwt) {
          const token = response.data.tokenJwt;
          // Armazena o token no localStorage
          localStorage.setItem('jwtToken', token);
          this.token = token; // Defina o token para uso posterior
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

  // Método para obter o token JWT
  public getToken(): string | null {
    return this.token || localStorage.getItem('jwtToken');
}

  // Método para definir o token JWT (útil para restaurar o token de um armazenamento persistente, como localStorage)
  public setToken(token: string | null): void {
    this.token = token;
  }

  // Exemplo de método para buscar dados protegidos usando o token JWT
  public async getProtectedData(): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/Grupos`, {
        headers: {
          Authorization: this.token ? `Bearer ${this.token}` : '', // Inclui o token no cabeçalho de autorização
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

  // Método para solicitação de recuperação de senha
  public async esqueciSenha(email: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.BASE_URL}/EsqueciSenha`, { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.status === 200; // Retorna true se a solicitação foi bem-sucedida
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao solicitar recuperação de senha:', error.response?.data || error.message);
      } else {
        console.error('Erro desconhecido ao solicitar recuperação de senha', error);
      }
      throw error;
    }
  }

  // Método para redefinição de senha
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
}

export default UserService;
