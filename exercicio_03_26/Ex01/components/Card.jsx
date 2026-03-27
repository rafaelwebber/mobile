import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export const Card = ({ title, image, year, description }) => {
  const navigation = useNavigation();

  const handleNavigateToDetail = (obj) => {
    navigation.navigate("Detail", obj);
  };

  return (
    <View style={styles.card} >
      <TouchableOpacity onPress={() => { handleNavigateToDetail({ title, image }) }}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.description}>{year}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  team: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  description: {
    color: "#555",
    lineHeight: 20,
    marginBottom: 10,
  },
  stars: {
    fontSize: 18,
    color: "#f5a623",
  },
  row: {
    flexDirection: "row",
    gap: 5
  }
});