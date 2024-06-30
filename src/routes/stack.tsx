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
import ConviteGrupo from '../screens/ConviteGrupo/ConviteGrupo'
import PerfilUsuario from '../screens/PerfilUsuario/PerfilUsuario'
import Sobre from '../screens/Sobre/Sobre';
import RedefinirSenha from '../screens/RedefinirSenha/RedefinirSenha';
import Splash from '../screens/Splash/Splash';
import EntrarGrupo from '../screens/EntrarGrupo/EntrarGrupo';
import EditarGrupo from '../screens/EditarGrupo/EditarGrupo';


const Stack = createNativeStackNavigator();

type StackNavigation = {
    Splash: undefined;
    Login: undefined;
    EsqueciSenha: undefined;
    Cadastro: undefined;
    Inicio: undefined;
    PaginaInicial: undefined;
    CriarGrupo: undefined;
    DetalhesGrupo: { grupoId: number };
    ConviteGrupo: { grupoId: number };
    PerfilUsuario: undefined;
    Sobre: undefined;
    RedefinirSenha: undefined;
    EntrarGrupo: undefined;
    EditarGrupo: undefined;
}

export type RootStackParamList = {
    Splash: undefined;

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
                {/* <Stack.Screen name="Splash" component={Splash} /> */}
                <Stack.Screen  name="EsqueciSenha" component={EsqueciSenha} />
                <Stack.Screen  name="Login" component={Login} />
                <Stack.Screen  name="Cadastro" component={Cadastro}/>
                <Stack.Screen  name="Home" component={Home}/>
                <Stack.Screen  name="PaginaInicial" component={PaginaInicial}/>
                <Stack.Screen  name="CriarGrupo" component={CriarGrupo}/>
                <Stack.Screen name="DetalhesGrupo"component={DetalhesGrupo}/>
                <Stack.Screen name="ConviteGrupo" component={ConviteGrupo} />
                <Stack.Screen name="PerfilUsuario"component={PerfilUsuario}/>
                <Stack.Screen name="Sobre"component={Sobre}/>
                <Stack.Screen name="RedefinirSenha" component={RedefinirSenha} />
                <Stack.Screen name="EntrarGrupo" component={EntrarGrupo} />
                <Stack.Screen name="EditarGrupo" component={EditarGrupo} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}




// const Stack = createNativeStackNavigator();

// type StackNavigation = {
//     Splash: undefined;
//     Login: undefined;
//     EsqueciSenha: undefined;
//     Cadastro: undefined;
//     Inicio: undefined;
//     PaginaInicial: undefined;
//     CriarGrupo: undefined;
//     DetalhesGrupo: { grupoId: number };
//     ConviteGrupo: undefined;
//     PerfilUsuario: undefined;
//     Sobre: undefined;
//     RedefinirSenha: undefined;
// }

// export type RootStackParamList = {
//     Splash: undefined;

// }


// export type StackTypes = NativeStackNavigationProp<StackNavigation>



// export default function StackComponent(){
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName='Inicio' screenOptions={{headerShown: false}}>
//                 <Stack.Screen  name="Inicio" component={Home}
//                 options={({ route, navigation }) => ({
//                     headerTitle: '',
//                     headerStyle: {
//                       backgroundColor: 'white',
//                       elevation: 0,
//                       shadowOpacity: 0,
//                       borderBottomWidth: 0,
//                     },
//                   })}
//                 />
//                 <Stack.Screen name="Splash" component={Splash} />
//                 <Stack.Screen  name="EsqueciSenha" component={EsqueciSenha} />
//                 <Stack.Screen  name="Login" component={Login} />
//                 <Stack.Screen  name="Cadastro" component={Cadastro}/>
//                 <Stack.Screen  name="Home" component={Home}/>
//                 <Stack.Screen  name="PaginaInicial" component={PaginaInicial}/>
//                 <Stack.Screen  name="CriarGrupo" component={CriarGrupo}/>
//                 <Stack.Screen name="DetalhesGrupo"component={DetalhesGrupo}/>
//                 <Stack.Screen name="ConviteGrupo"component={ConviteGrupo}/>
//                 <Stack.Screen name="PerfilUsuario"component={PerfilUsuario}/>
//                 <Stack.Screen name="Sobre"component={Sobre}/>
//                 <Stack.Screen name="RedefinirSenha" component={RedefinirSenha} />
//             </Stack.Navigator>
//         </NavigationContainer>

//     );
// }