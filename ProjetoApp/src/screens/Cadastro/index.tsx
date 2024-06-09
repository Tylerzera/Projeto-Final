import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { StackTypes } from "../../routes/stack";
import { UserService } from "../../services/UserService";
import { Feather } from "@expo/vector-icons";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const userService = new UserService();

  const navigation = useNavigation<StackTypes>();

  const handleNavegarLogin = () => {
    navigation.navigate("Login");
  };

  const handleLogin = async () => {
    const user = await userService.registrar({
      email,
      nome,
      sobrenome,
      imagem: "",
      senha: password,
    });

    alert(user.data.message);

    if (user.data.success) {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <Image
        style={styles.imageStyle}
        source={require("../../../assets/chocolate.png")}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input]}
          placeholder="Nome"
          onChangeText={setNome}
          value={nome}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Sobrenome"
          onChangeText={setSobrenome}
          value={sobrenome}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
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
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
          activeOpacity={0.1}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavegarLogin}
          style={styles.button}
          activeOpacity={0.1}
        >
          <Text style={styles.buttonText}>Ir para login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D7CCC8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4E342E",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#D3A46F",
    backgroundColor: "#FFFAF2",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#5C3A21",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 20,
    backgroundColor: "#5D4037",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#2D2926",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 20,
  },
});

export default Cadastro;
