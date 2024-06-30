import { ImageSourcePropType } from 'react-native';

export interface User {
    userId?: number;
    Nome: string;
    Email: string;
    Senha: string;
    ConfirmacaoSenha: string;
    Foto: ImageSourcePropType;
  }