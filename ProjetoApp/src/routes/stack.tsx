import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import EsqueceuSenha from "../screens/EsqueceuSenha";
import { Grupos } from "../screens/Grupo";
import { CriarGrupo } from "../screens/CriarGrupo";
import { EditarGrupo } from "../screens/Editar Grupo";
import { Convites } from "../screens/Convites";

const Stack = createNativeStackNavigator();

type StackNavigation = {
  Home: undefined;
  Login: undefined;
  Cadastro: undefined;
  EsqueceuSenha: undefined;
  Grupo: undefined;
  CriarGrupo: undefined;
  EditarGrupo: { id: string };
  Convites: { id: string };
  Perfil: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EsqueceuSenha"
          component={EsqueceuSenha}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Grupo" component={Grupos} />
        <Stack.Screen
          name="CriarGrupo"
          component={CriarGrupo}
          options={{
            headerTitle: "Criar Grupo",
          }}
        />
        <Stack.Screen name="EditarGrupo" component={EditarGrupo} />
        <Stack.Screen name="Convites" component={Convites} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
