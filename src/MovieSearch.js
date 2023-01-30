import { Center, Container, SimpleGrid, TextInput, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { useDebouncedValue } from '@mantine/hooks';
import axios from "axios";
import TitleCard from "./TitleCard";
export default function SearchMovie() {
    const [movie, setMovie] = useState("")
    const [mname] = useDebouncedValue(movie, 500);
    const [results, setResults] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://online-movie-database.p.rapidapi.com/title/v2/find',
            params: { title: mname, titleType: 'movie', limit: '20', sortArg: 'moviemeter,asc' },
            headers: {
                'X-RapidAPI-Key': '29cab846c5msh82f080e7fb48291p187d4bjsn38f7f03eac9c',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setResults(response.data.results)

        }).catch(function (error) {
            console.error(error);
        });
    }, [mname])
    return <Container size="sm">
        <TextInput label="Enter Movie Name" value={movie} onChange={(event) => setMovie(event.currentTarget.value)} placeholder="Enter movie name to review "></TextInput>
        <Text >Search Results for - {mname}</Text>
        <SimpleGrid mt="lg" cols={3}>
            {results ? results.map(m => <TitleCard key={m.id} item={m} />) : ""}
        </SimpleGrid>

    </Container>
}