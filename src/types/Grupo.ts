import { ImageSourcePropType } from 'react-native';

export interface Grupo {
  Nome: string;
  QuantidadeMaxParticipantes: number;
  Valor: number;
  DataRevelacao: Date;
  Descricao: string;
  Icone: ImageSourcePropType;
}