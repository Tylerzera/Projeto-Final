import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image, Pressable } from "react-native";
import { StackTypes } from "../../routes/stack";
import { Feather } from "@expo/vector-icons";
import { UserService } from "../../services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const userService = new UserService();

  const navigation = useNavigation<StackTypes>();
  
  const handleNavegarCadastro = () => {
    navigation.navigate("Cadastro");
  };

  const handleNavegarEsqueceuSenha = () => {
    navigation.navigate("EsqueceuSenha");
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("TOKEN");
      if (token) {
        navigation.navigate("Home");
      }
    };
    getToken();
  }, []);

  const handleLogin = async () => {
    const user = await userService.login(login, password);
    alert(user.data.message);

    if (user.data.success) {
      await AsyncStorage.setItem("TOKEN", user.data.data);
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Image
        style={styles.imageStyle}
        source={require("../../../assets/chocolate.png")}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, usernameError && styles.errorInput]}
          placeholder="Login"
          onChangeText={setLogin}
          value={login}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            secureTextEntry={!hidePassword}
            onChangeText={setPassword}
            value={password}
          />
          <Pressable
            onPress={() => setHidePassword((prev) => !prev)}
            style={styles.eyeIcon}
          >
            <Feather name={hidePassword ? "eye" : "eye-off"} size={24} color="#Window" />
          </Pressable>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button} activeOpacity={0.1}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavegarCadastro} style={styles.button} activeOpacity={0.1}>
        <Text style={styles.buttonText}>Ir para cadastro</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavegarEsqueceuSenha} style={styles.button} activeOpacity={0.1}>
        <Text style={styles.buttonText}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D7CCC8", // Fundo em um tom de caramelo claro
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4E342E", // Um azul escuro acinzentado para o título
    textAlign: "center",
    marginBottom: 20, // Aumente este valor conforme necessário para descer o texto
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#D3A46F", // Borda em tom de bronze claro
    backgroundColor: "#FFFAF2", // Fundo do input em um tom de marfim
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#5C3A21", // Texto em tom de marrom escuro
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1, // Ensure input takes available width
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 20,
    backgroundColor: "#5D4037", // Botão em tom de marrom-avermelhado
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#2D2926", // Sombra para dar profundidade
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: "#FFFFFF", // Texto do botão em marfim claro
    fontSize: 18,
    fontWeight: "bold",
  },
  imageStyle: {
    width: 120, // Tamanho aumentado para que a imagem seja mais destacada
    height: 120, // Tamanho aumentado para que a imagem seja mais destacada
    borderRadius: 60, // Metade da largura/altura para manter a forma circular
    alignSelf: "center",
    marginTop: 5, // Aumente esta margem para diminuir a proximidade com o texto "Login"
    marginBottom: 20, // Adicionado para dar espaço antes dos campos de entrada
  },
  errorInput: {
    borderColor: "#FF3D00",
    borderWidth: 1,
  },
});

export default Login;
