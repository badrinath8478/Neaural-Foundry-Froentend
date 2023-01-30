import { Card, Image, Text, Badge, Button, Group, Container, Paper, SimpleGrid } from '@mantine/core';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Home() {

    const navigate = useNavigate();
    const [result, setResults] = useState(null)
    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:3330/user/get',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("mruser")).authToken}`
            }
        };

        axios(config)
            .then(function (response) {
                setResults(response.data.message)
            })
            .catch(function (error) {
            });
    }, [])

    return (
        <>
            <Container mt="lg">
                {result != null && result.length == 0 ? <Paper
                    style={{ textAlign: "center" }}
                    shadow="sm"
                    radius="md"
                    p="lg"
                    withBorder
                >
                    <Text weight="bold" size="lg">
                        You have not reviewed any movies yet!</Text>
                    <Text size="xs" color="dimmed">
                        Use the below "Add Room" button to add a movie review
                    </Text>
                    <Group position="center" mt="sm">
                        <Button onClick={() => navigate("/addreview")}>Add review</Button>
                    </Group>
                </Paper>
                    : ""}
                <SimpleGrid mt="lg" cols={3}>

                    {result != null ? result.map((movie) => <Card key={movie.Title} shadow="sm" p="sm" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src={movie.Poster}
                                alt="Norway"
                                height={180}
                                fit="contain"
                            />
                        </Card.Section>

                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>{movie.Title}</Text>
                        </Group>
                        <Group position="right"></Group>
                        <Badge color="pink" variant="light">
                            Movie
                        </Badge>
                        <Text size="sm" color="dimmed">
                            Year - {movie.Year}
                        </Text>
                        <Text>Review - {movie.Review}</Text>
                        <Text>short message - {movie.ShortMessage}</Text>
                    </Card>
                    ) : ""}
                </SimpleGrid>
            </Container>

        </>
    );
}
