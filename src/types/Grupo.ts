import { ImageSourcePropType } from 'react-native';
import { User } from '../types/User'

export interface Grupo {
  grupoId?: number;
  Nome: string;
  QuantidadeMaxParticipantes: number;
  Valor: number;
  DataRevelacao: Date;
  Descricao: string;
  Icone: ImageSourcePropType;
  UsuariosGrupos: User[];
  administradorId: string;
  
}