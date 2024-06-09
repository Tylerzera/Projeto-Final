import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GrupoService } from "../../services/GrupoService";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stack";

export function CriarGrupo() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState("");
  const [quantidadeMaxima, setQuantidadeMaxima] = useState("");
  const [dataRevelacao, setDataRevelacao] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation<StackTypes>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setGroupImage(result.assets[0].uri);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataRevelacao;
    setShowDatePicker(Platform.OS === "ios");
    setDataRevelacao(currentDate);
  };

  const showDatePickerMode = () => {
    setShowDatePicker(true);
  };

  const grupoService = new GrupoService();

  const createGroup = async () => {
    const { data } = await grupoService.criar({
      nome: groupName,
      descricao: groupDescription,
      imagem: groupImage,
      quantidadeMaxima: parseInt(quantidadeMaxima),
      dataRevelacao,
    });

    alert(data.message);

    if (data.success) {
      navigation.push("Grupo");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Grupo"
        onChangeText={setGroupName}
        value={groupName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição do Grupo"
        onChangeText={setGroupDescription}
        value={groupDescription}
      />
      <Button title="Escolher Imagem" onPress={pickImage} />
      {groupImage && (
        <Image source={{ uri: groupImage }} style={styles.image} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Quantidade Máxima"
        onChangeText={setQuantidadeMaxima}
        value={quantidadeMaxima}
        keyboardType="numeric"
      />
      <Button title="Escolher Data de Revelação" onPress={showDatePickerMode} />
      {showDatePicker && (
        <DateTimePicker
          value={dataRevelacao}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <Text style={styles.dateText}>
        Data de Revelação: {dataRevelacao.toLocaleDateString()}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Criar Grupo" onPress={createGroup} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderRadius: 20, // Arredonda os inputs
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10, // Adiciona padding horizontal para melhorar a aparência
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    alignSelf: "center", // Centraliza a imagem
  },
  dateText: {
    marginBottom: 10,
    textAlign: "center", // Centraliza o texto da data
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    marginRight: 10,
  },
});
