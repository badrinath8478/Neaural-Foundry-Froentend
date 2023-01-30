import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Group, Stack, Text, Badge, Rating, Chip, Image, AspectRatio, Button, Textarea, FileInput } from "@mantine/core";
export default function AddReview() {
    const [mdetails, setMdetails] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [shortMessage, setShortMessage] = useState("")
    const navigate = useNavigate()
    const params = useParams()
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://online-movie-database.p.rapidapi.com/title/get-overview-details',
            params: { tconst: params.id, currentCountry: 'US' },
            headers: {
                'X-RapidAPI-Key': '29cab846c5msh82f080e7fb48291p187d4bjsn38f7f03eac9c',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            setMdetails(response.data)

        }).catch(function (error) {
        });
    }, [])
    const handleSubmit = () => {
        var data = new FormData();
        data.append('Title', mdetails.title.title);
        data.append('Year', mdetails.title.year);
        data.append('Rating', rating);
        data.append('ShortMessage', shortMessage);
        data.append('Review', review);
        data.append('Poster', mdetails.title.image?.url ?? "");

        var data = {
            "Title": mdetails.title.title,
            "Year": mdetails.title.year,
            "Rating": rating,
            "ShortMessage": shortMessage,
            "Review": review,
            "Poster": mdetails.title.image?.url ?? ""
        };
        var config = {
            method: 'post',
            url: 'http://localhost:3330/user/add',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("mruser")).authToken}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                navigate("/")
            })
            .catch(function (error) {
            });
    }
    return <Container mt="lg">
        {mdetails == null ? "" :
            <Group >
                <Stack>
                    <Group>
                        <Text sx={{ fontSize: "48px" }} >{mdetails.title.title}</Text>
                        <Badge color="green">{mdetails.title.titleType}</Badge>

                    </Group>
                    <Group >
                        <Text>{mdetails.title.year}</Text>
                        &#x2022;
                        <Text>{mdetails.certificates?.US[0]?.certificate}</Text>
                        &#x2022;
                        <Text>{mdetails.title.runningTimeInMinutes} minutes</Text>
                    </Group>
                    <Text fz="md" fw={"bold"}>IMDB rating</Text>
                    <Group>
                        <Rating fractions={10} readOnly value={mdetails.ratings.rating / 2} />
                        <Text>{mdetails.ratings.rating}  ({mdetails.ratings.ratingCount})</Text>
                    </Group>
                    <Group>{mdetails.genres.map((genre) => <Chip key={genre} defaultChecked>{genre}</Chip>
                    )}</Group>
                </Stack>
                <Image fit="contain" width={300} height={240.8} radius="sm" src={mdetails.title.image?.url}></Image>
                <Stack align="flex-start">
                    <Text mt={"md"} weight={"bold"}>Description</Text>
                    <Text>{mdetails?.plotSummary?.text}</Text>
                    {!clicked ? <Button size="md" onClick={() => setClicked(true)} color={"green"}>Rate It</Button>
                        : ""}
                </Stack>

            </Group>}
        {clicked ? <Stack>
            <Text mt={"lg"} fw={"bold"} fz={"md"}>Please give your rating</Text>
            <Rating size="xl" count={10} onChange={setRating}></Rating>
            <Textarea label="Review" placeholder="Please write your detailed review" onChange={(event) => setReview(event.currentTarget.value)}></Textarea>
            <Text></Text>
            <Textarea label="Short Message" placeholder="Please write a short message" onChange={(event) => setShortMessage(event.currentTarget.value)} ></Textarea>
            <Button color={"green"} onClick={handleSubmit}>Save</Button>
        </Stack> : ""}
    </Container>
}