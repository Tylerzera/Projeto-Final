import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StackTypes } from "../../routes/stack";
import { Layout } from "../../Layouts/Layout";

const Home = () => {
  const navigation = useNavigation<StackTypes>();

  const handleParticipar = () => {
    navigation.navigate("Grupo"); // Navega para a tela de grupo
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Seja, Bem vindo!</Text>
        <Image
          style={styles.imageStyle}
          source={require("../../../assets/chocolate.png")}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipar}>
          <Text style={styles.buttonText}>Lista de Grupos</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ControlText",
    paddingTop: 150, // Ajuste este valor conforme desejado para subir o conteúdo
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4E342E",
    textAlign: "center",
    marginBottom: 20,
  },
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
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
});

export default Home;
