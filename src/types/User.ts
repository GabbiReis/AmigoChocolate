import { ImageSourcePropType } from 'react-native';

export interface User {
    id?: number;
    Nome: string;
    Email: string;
    Senha: string;
    Foto: ImageSourcePropType;
  }