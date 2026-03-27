import { StyleSheet, View, Image, Text } from "react-native"
import { useRoute } from '@react-navigation/native';


export const DetailScreen = () => {
    const route = useRoute();
    const { image, title } = route.params;
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Image source={{ uri: image }} style={styles.logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        height: 250,
        width: 250,
        borderRadius: 12,
        marginVertical: 10,
    }
});