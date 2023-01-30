import { Card, Image, Text, Badge, Button, Group, AspectRatio, Container } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
export default function TitleCard({ item }) {
    const navigate = useNavigate();
    return <Card shadow="sm" p="sm" radius="md" withBorder>
        <Card.Section>
            <Image
                src={item.image?.url}
                alt="Norway"
                height={180}
                fit="contain"
            />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{item.title}</Text>
        </Group>
        <Group position="right"></Group>
        <Badge color="pink" variant="light">
            {item.titleType}
        </Badge>
        <Text size="sm" color="dimmed">
            Year - {item.year}
        </Text>

        <Button onClick={() => navigate("../addMovie/" + `${item.id.slice(7, -1)}`)} variant="light" color="blue" fullWidth mt="md" radius="md">
            Rate and Review
        </Button>
    </Card>

}