import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Layout } from "../../Layouts/Layout";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stack";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Grupo, GrupoService } from "../../services/GrupoService";

export function Grupos() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const navigation = useNavigation<StackTypes>();

  const grupoService = new GrupoService();

  useEffect(() => {
    async function loadGrupos() {
      console.log("Carregando Grupos");
      const { data } = await grupoService.listar();
      console.log("Grupos", data);
      setGrupos(data);
    }

    loadGrupos();
  }, []);

  return (
    <Layout>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <Text>Grupos</Text>
          <Text onPress={() => navigation.push("CriarGrupo")}>Criar Grupo</Text>
        </View>
        <FlatList
          data={grupos}
          renderItem={({ item }) => <Card grupo={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Layout>
  );
}
const Card = ({ grupo }: { grupo: Grupo }) => {
  const navigation = useNavigation<StackTypes>();
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: grupo.imagem }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.nameDescriptionContainer}>
          <Text style={styles.nome}>{grupo.nome}</Text>
          <Text style={styles.descricao}>{grupo.descricao}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.data}>
            Data de Revelação:{" "}
            {new Date(grupo.dataRevelacao).toLocaleDateString()}
          </Text>
          <Text style={styles.quantidade}>
            Quantidade Máxima: {grupo.quantidadeMaxima}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Ionicons
            name="create"
            size={28}
            color="blue"
            onPress={() => navigation.push("EditarGrupo", { id: grupo.id })}
          />
          <Ionicons
            name="mail"
            size={28}
            color="green"
            onPress={() => navigation.push("Convites", { id: grupo.id })}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    flexDirection: "row", // Alinha os itens horizontalmente
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 10,
  },
  imageContainer: {
    width: 100, // Ajuste o tamanho conforme necessário
    marginRight: 10, // Adicionado para dar espaço entre a imagem e o texto
  },
  image: {
    width: 100, // Mesma largura do container
    height: 100, // Mesma altura do container
    borderRadius: 50, // Metade da largura/altura para formar um círculo
    resizeMode: "cover", // Redimensiona a imagem para cobrir completamente a área, mantendo a proporção
  },
  infoContainer: {
    flex: 1, // Permite que o container de informações ocupe o espaço restante
    width: "100%", // Necessário para o flex funcionar
  },
  nameDescriptionContainer: {
    flexDirection: "column", // Alinha o nome e a descrição horizontalmente
    justifyContent: "space-between", // Espaça o nome e a descrição igualmente
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descricao: {
    fontSize: 14,
    flexWrap: "wrap", // Permite que o texto quebre em várias linhas
  },
  detailsContainer: {
    marginTop: 10, // Adiciona espaço entre o nome/descrição e os detalhes
  },
  data: {
    fontSize: 14,
  },
  quantidade: {
    fontSize: 14,
  },
});
