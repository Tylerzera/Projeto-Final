import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Layout } from "../../Layouts/Layout";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stack";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Grupo, GrupoService } from "../../services/GrupoService";

export function Grupos() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [gruposParticipante, setGruposParticipante] = useState<Grupo[]>([]);
  const navigation = useNavigation<StackTypes>();

  const grupoService = new GrupoService();

  useEffect(() => {
    async function loadGrupos() {
      const { data } = await grupoService.listar();
      setGrupos(data);
    }

    async function loadGruposParticipante() {
      const { data } = await grupoService.participando();
      setGruposParticipante(data);
    }

    loadGruposParticipante();
    loadGrupos();
  }, []);

  const aceitarConvite = async () => {
    let codigo: string | null = "";

    if (Platform.OS === "web") {
      codigo = prompt("Digite o código do convite");
      if (Number.isNaN(parseInt(codigo || ""))) {
        alert("Código deve ser um numero");
        return;
      }
    } else if (Platform.OS === "android") {
      Alert.prompt(
        "Digite o código do convite",
        "",
        async (codigoInput) => {
          codigo = codigoInput;
        },
        "plain-text"
      );
    }

    if (codigo) {
      await grupoService.aceitarConvite(parseInt(codigo));
      const { data } = await grupoService.participando();
      setGruposParticipante(data);
    }
  };

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
          <Text>Grupos que sou dono</Text>
          <Text onPress={() => navigation.push("CriarGrupo")}>Criar Grupo</Text>
        </View>
        <FlatList
          data={grupos}
          renderItem={({ item }) => <Card grupo={item} mostrarParticipantes />}
          keyExtractor={(item) => item.id}
        />
        {grupos.length === 0 && <Text>Nenhum grupo encontrado</Text>}
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <Text>Grupos que estou participando</Text>
          <Text onPress={() => aceitarConvite()}>Aceitar convite</Text>
        </View>

        <FlatList
          data={gruposParticipante}
          renderItem={({ item }) => <Card grupo={item} />}
          keyExtractor={(item) => item.id}
        />
        {gruposParticipante.length === 0 && (
          <Text>Nenhum grupo encontrado</Text>
        )}
      </View>
    </Layout>
  );
}
const Card = ({
  grupo,
  mostrarParticipantes,
}: {
  grupo: Grupo;
  mostrarParticipantes?: boolean;
}) => {
  const navigation = useNavigation<StackTypes>();

  const [expanded, setExpanded] = useState(false);

  const grupoService = new GrupoService();

  function toggleItem() {
    setExpanded((prev) => !prev);
  }

  async function sortear() {
    if (Platform.OS === "web") {
      const confirma = confirm("Deseja realmente sortear?");
      if (!confirma) return;
    }

    const { data } = await grupoService.sortear(grupo.id);

    alert(data.message);
  }

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
          {grupo.sorteado ? (
            <Text>Sorteado: {grupo.sorteado?.nome || "Sem nome"}</Text>
          ) : (
            <Text>Não sorteado ainda</Text>
          )}
          {expanded && (
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text>Participantes</Text>
              <FlatList
                data={grupo.participantes}
                renderItem={({ item }) => (
                  <Text>{item?.usuario?.nome || "Sem nome"}</Text>
                )}
                keyExtractor={(item) => item.id}
              />
              {grupo.participantes.length === 0 && (
                <Text>Nenhum participante</Text>
              )}
            </View>
          )}
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
          {!grupo.sorteado && (
            <Ionicons
              name="shuffle"
              size={28}
              color="red"
              onPress={() => sortear()}
            />
          )}
          {mostrarParticipantes && (
            <Ionicons
              name={expanded ? "chevron-up" : "chevron-down"}
              size={28}
              color="black"
              onPress={toggleItem}
            />
          )}
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
