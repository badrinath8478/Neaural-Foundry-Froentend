import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button
} from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate()
    const [loading, isLoading] = useState(false)
    const handleEmailChange = (event) => {
        event.preventDefault();
        setEmail(event.currentTarget.value);
    };
    const handlePasswordChange = (event) => {
        event.preventDefault();
        setPass(event.currentTarget.value);
    };
    const handleNameChange = (event) => {
        event.preventDefault();
        setName(event.currentTarget.value);
    };
    const handleSubmit = () => {
        isLoading(true)
        const url = "http://localhost:3330/user/register";
        const data = {
            password: pass,
            Name: name,
            email: email
        };
        const headers = {
            "Content-Type": "application/json"
        };
        axios.post(url, data, headers)
            .then((response) => {
                sessionStorage.setItem("mruserid", response.data.userId);
                navigate("/verifyotp", { state: response });

            })
            .catch((err) => console.log(err));
        isLoading(false)
    };
    return (
        <>
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({
                        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                        fontWeight: 200
                    })}
                >
                    Sign Up , MovieReviews
                </Title>

                <Paper
                    style={{ textAlign: "start" }}
                    withBorder
                    shadow="md"
                    p={30}
                    mt={30}
                    radius="md"
                >
                    <TextInput
                        label="Name"
                        placeholder="username"
                        required
                        onChange={(event) => handleNameChange(event)}
                    />

                    <TextInput
                        label="Email"
                        placeholder="you@mantine.dev"
                        required
                        mt="md"
                        onChange={(event) => handleEmailChange(event)}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required
                        mt="md"
                        onChange={(event) => handlePasswordChange(event)}
                    />
                    <Checkbox
                        mt="md"
                        label="I accept terms and conditions"
                        sx={{ lineHeight: 1 }}
                    />

                    <Group position="apart" mt="lg">
                        <Anchor
                            onClick={(event) => event.preventDefault()}
                            href="#"
                            size="sm"
                        >
                            Already have an account? Login{" "}
                        </Anchor>
                        <Button disabled={loading} onClick={() => handleSubmit()}>Register</Button>
                    </Group>
                </Paper>
            </Container>
        </>
    );
}
