import axios, { AxiosResponse } from 'axios';
import { Grupo } from '../../types/Grupo';

const BASE_URL = 'https://localhost:7217/';

class GrupoService {

    constructor() {
        // Se necessário, adicione inicializações aqui
    }

    async criarGrupo(grupo: Grupo): Promise<boolean> {
        try {
            const response = await axios.post(`${BASE_URL}/api/Grupos`, grupo);
            return response.status === 201; // Verifica se o status é 201 (Created)
        } catch (error) {
            console.error('Erro ao criar grupo:', error);
            return false;
        }
    }

    async buscarGrupos(): Promise<Grupo[]> {
        try {
            const response: AxiosResponse<Grupo[]> = await axios.get(`${BASE_URL}/api/Grupos`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar grupos:', error);
            return []; // Retorna um array vazio em caso de erro
        }
    }

    async excluirGrupo(id: number): Promise<boolean> {
        try {
            const response = await axios.delete(`${BASE_URL}/api/Grupos/${id}`);
            return response.status === 204; // Verifica se o status é 204 (No Content)
        } catch (error) {
            console.error('Erro ao excluir grupo:', error);
            return false;
        }
    }
}

export default GrupoService;
