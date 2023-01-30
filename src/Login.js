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

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate()
  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.currentTarget.value);
  };
  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPass(event.currentTarget.value);
  };
  const handleSubmit = () => {

    const data = {
      "email": email,
      "password": pass
    };

    const config = {
      method: 'post',
      url: 'http://localhost:3330/user/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        setUser({ isLoggedin: true, authToken: response.data.token, userid: response.data.userId })
        navigate("/")
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  return (
    <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor
            href="#"
            size="sm"
            onClick={(event) => event.preventDefault()}
          >
            Create account
          </Anchor>
        </Text>
        <Paper
          style={{ textAlign: "start" }}
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
        >
          {/* <Text color="dark" size="md" align="left" mt={5}>
          Email
</Text> */}
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            onChange={(event) => handleEmailChange(event)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            onChange={(event) => handlePasswordChange(event)}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Anchor
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={() => handleSubmit()}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}
