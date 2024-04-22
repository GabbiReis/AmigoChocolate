import axios, { AxiosResponse } from 'axios';
import { User } from '../../types/User';

const BASE_URL = 'https://localhost:7217/' //'http://localhost:3000/User/';

class UserService {

    constructor() {
        // Se necessário, adicione inicializações aqui
    }

    async cadastrarUser(user: User): Promise<boolean> {
        try {
            const response = await axios.post(`${BASE_URL}/api/Usuarios/Cadastrar`, user);
            return response.status === 200;
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            return false;
        }
    }

    async validateUser(Nome: string, Email: string, Senha: string): Promise<boolean> {
        try {
            const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}?Email=${Email}&Senha=${Senha}`);
            // Na aplicação de vocês não retorna array e o método será um post que retorna um único usuário.
            if (response.data.length === 0) {
                return false;
            }

            return response.status === 200;
        } catch (error) {
            console.error('Erro ao validar usuário:', error);
            return false; // Retorna false em caso de erro
        }
    }
}

export default UserService;
