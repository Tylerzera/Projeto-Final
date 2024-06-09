import { useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StackTypes } from "../routes/stack";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation<StackTypes>();
 
  return (
     <View style={{ flex: 1 }}>
       <View style={{ flex: 9, padding: 10 }}>
         {children}
       </View>
       <View
         style={{
           flex: 0.1,
           flexDirection: "row",
           justifyContent: "space-around",
           alignItems: "center",
           position: 'absolute', // Mantém os botões fixos na parte inferior
           bottom: 0, // Alinha os botões com a parte inferior da tela
           width: '100%', // Garante que os botões ocupem toda a largura da tela
           backgroundColor: 'white', // Fundo branco para os botões
           padding: 10, // Espaçamento interno
         }}
       >
         <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
           <Text>Home</Text>
         </Pressable>
         <Pressable style={styles.button} onPress={() => navigation.navigate("Grupo")}>
           <Text>Grupos</Text>
         </Pressable>
        
       </View>
     </View>
  );
 }
 
 const styles = StyleSheet.create({
  button: {
     alignItems: "center",
     justifyContent: "center",
     width: "20%",
     height: 40,
     borderRadius: 10,
     borderColor: "black",
     borderWidth: 1,
  },
  text: {
     fontSize: 16,
     lineHeight: 21,
     fontWeight: "bold",
     letterSpacing: 0.25,
     color: "white",
  },
 });