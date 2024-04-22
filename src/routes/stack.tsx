import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import EsqueciSenha from '../screens/EsqueciSenha/EsqueciSenha';
import Cadastro from '../screens/Cadastro/Cadastro';
import Home from '../screens/Home/Inicio';
import PaginaInicial from '../screens/PaginaInicial/PaginaInicial';
import CriarGrupo from '../screens/CriarGrupo/CriarGrupo';
import DetalhesGrupo from '../screens/DetalhesGrupo/DetalhesGrupo';
import ConviteGrupo from '../screens/ConviteGrupo/ConviteGrupo';
import PerfilUsuario from '../screens/PerfilUsuario/PerfilUsuario'


const Stack = createNativeStackNavigator();



type StackNavigation = {
    Login : undefined;
    EsqueciSenha : undefined;
    Cadastro: undefined;
    Inicio: undefined;
    PaginaInicial: undefined;
    CriarGrupo: undefined;
    DetalhesGrupo: undefined;
    ConviteGrupo: undefined;
    PerfilUsuario: undefined;
}


export type StackTypes = NativeStackNavigationProp<StackNavigation>



export default function StackComponent(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Inicio' screenOptions={{headerShown: false}}>
                <Stack.Screen  name="Inicio" component={Home}
                options={({ route, navigation }) => ({
                    headerTitle: '',
                    headerStyle: {
                      backgroundColor: 'white',
                      elevation: 0,
                      shadowOpacity: 0,
                      borderBottomWidth: 0,
                    },
                  })}
                />
                <Stack.Screen  name="EsqueciSenha" component={EsqueciSenha} />
                <Stack.Screen  name="Login" component={Login} />
                <Stack.Screen  name="Cadastro" component={Cadastro}/>
                <Stack.Screen  name="Home" component={Home}/>
                <Stack.Screen  name="PaginaInicial" component={PaginaInicial}/>
                <Stack.Screen  name="CriarGrupo" component={CriarGrupo}/>
                <Stack.Screen name="DetalhesGrupo"component={DetalhesGrupo}/>
                <Stack.Screen name="ConviteGrupo"component={ConviteGrupo}/>
                <Stack.Screen name="PerfilUsuario"component={PerfilUsuario}/>
        
            </Stack.Navigator>
        </NavigationContainer>

    );
}