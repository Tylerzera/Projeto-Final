import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StackTypes } from "../../routes/stack";
import { UserService } from "../../services/UserService";

const EsqueceuSenha = () => {
  const [email, setEmail] = useState<string>("");

  const userService = new UserService();

  const navigation = useNavigation<StackTypes>();

  const handleNavegarLogin = () => {
    navigation.navigate("Login");
  };

  const handleEsqueceuSenha = async () => {
    const user = await userService.trocarSenha(email);

    if (user) {
      alert("Email de recuperação de senha enviado com sucesso");
    } else {
      alert("Email inválido");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu a senha?</Text>
      <Image
        style={styles.imageStyle}
        source={require("../../../assets/Chocolate-triste.png")}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input]}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <TouchableOpacity onPress={handleEsqueceuSenha} style={styles.button} activeOpacity={0.1}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavegarLogin} style={styles.button} activeOpacity={0.1}>
        <Text style={styles.buttonText}>Ir para login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE5C365", // Fundo em um tom de caramelo claro
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4E342E", // Um azul escuro acinzentado para o título
    textAlign: "center",
    marginBottom: 20, // Aumente este valor conforme necessário para descer o texto
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
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

export default EsqueceuSenha;
