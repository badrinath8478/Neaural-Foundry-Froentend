import React, { useState } from "react";
import {
    Paper,
    Title,
    Text,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    Input,
    InputWrapper,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 26,
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    controls: {
        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column-reverse",
        },
    },

    control: {
        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            textAlign: "center",
        },
    },
}));

function OtpInput() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const { classes } = useStyles();
    const state = useLocation();
    const otpUrl =
        "http://localhost:3330/user/verifyOtp/" +
        sessionStorage.getItem("mruserid");
    const handleChange = (e) => {
        setOtp(e.currentTarget.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(otpUrl, { otp: otp }).then((res) => {
            navigate("/login");
        });
    };
    return (
        <>
            <Container size={460} my={30}>
                <Title className={classes.title} align="center">
                    Otp Verification
                </Title>
                <Text color="dimmed" size="sm" align="center">
                    Enter Otp send to your registered email to complete your signup
                    process
                </Text>

                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <Input.Wrapper label="Otp" required>
                        <Input placeholder="Enter code" onChange={handleChange} />
                    </Input.Wrapper>

                    <Group position="apart" mt="lg" className={classes.controls}>
                        <Anchor color="dimmed" size="sm" className={classes.control}>
                            <Center inline>
                                {/* <ArrowLeftIcon size={12} /> */}
                                <Box ml={5}>Resent Otp</Box>
                            </Center>
                        </Anchor>
                        <Button className={classes.control} onClick={handleSubmit}>
                            Verify Otp
                        </Button>
                    </Group>
                </Paper>
            </Container>
        </>
    );
}
export default OtpInput;
