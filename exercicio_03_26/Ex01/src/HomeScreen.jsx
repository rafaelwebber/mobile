import { View, FlatList, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";

export const HomeScreen = () => {

    const [movies, setMovies] = useState([]);


    async function getMovieData() {
        try {
            const response = await fetch("https://www.omdbapi.com/?s=spider%20man&apikey=1cd66749");
            const data = await response.json();
            setMovies(data.Search);
        } catch (err) {
            alert("ERRO")
        }
    }

    useEffect(() => {
        getMovieData();
    }, []);

    return (
        <View style={{ padding: 16 }}>
            <ScrollView>
                {movies.map((movie, index) => (
                    <Card
                        key={index}
                        title={movie.Title}
                        image={movie.Poster}
                        year={movie.Year}
                        description={movie.Type}
                    />
                ))
                }
            </ScrollView>

        </View>
    );
};