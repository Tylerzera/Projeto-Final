import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Convite, GrupoService } from "../../services/GrupoService";

export function Convites() {
  const [convites, setConvites] = useState<Convite[]>([]);

  const grupoService = new GrupoService();

  const route = useRoute();
  const { id } = route.params as { id: string };

  async function carregarConvites() {
    const response = await grupoService.listarPorId(id);
    setConvites(response.data.convites);
  }

  useEffect(() => {
    carregarConvites();
  }, []);

  async function criarConvite() {
    const { data } = await grupoService.criarConvite(id);

    if (data.success) {
      carregarConvites();
    }
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <Text>Convites</Text>
        <Text onPress={() => criarConvite()}>Novo</Text>
      </View>
      <FlatList
        data={convites}
        renderItem={({ item }) => <Card convite={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export const Card = ({ convite }: { convite: Convite }) => {
  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Código: {convite.codigo}</Text>
        <Text style={styles.code}>Usado: {convite.aceito ? "sim" : "não"}</Text>
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
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  code: {
    fontSize: 16,
    color: "#333",
  },
});
