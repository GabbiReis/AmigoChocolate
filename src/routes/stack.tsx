import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import EsqueciSenha from '../screens/EsqueciSenha/EsqueciSenha';
import Cadastro from '../screens/Cadastro/Cadastro';

const Stack = createNativeStackNavigator();



type StackNavigation = {
    Login : undefined;
    EsqueciSenha : undefined;
    Cadastro: undefined;
}


export type StackTypes = NativeStackNavigationProp<StackNavigation>



export default function StackComponent(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
                <Stack.Screen  name="Login" component={Login} />
                <Stack.Screen  name="EsqueciSenha" component={EsqueciSenha} />
                <Stack.Screen  name="Cadastro" component={Cadastro}
        />
        
            </Stack.Navigator>
        </NavigationContainer>

    );
}