import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../queries";
import { Image, Paper, Loader, Center, Text, Button, Stack, Group, Alert } from "@mantine/core";
import EditUserModal from "../modals/UserEdit.tsx";

const UserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: user, isLoading, isError, error } = useUser(id as string);
    const [editOpen, setEditOpen] = useState(false);

    if (isLoading)
        return (
            <Center h="100vh">
                <Loader size="lg" />
            </Center>
        );

    if (isError)
        return (
            <Center h="100vh">
                <Alert color="red" title="Ошибка">
                    Ошибка загрузки пользователя
                    {error instanceof Error && <p>Текст ошибки: {error.message}</p>}
                </Alert>
            </Center>
        );

    return (
        <>
            <Paper
                shadow="lg"
                radius="md"
                p="xl"
                style={{
                    maxWidth: 700,
                    margin: "40px auto",
                    display: "flex",
                    gap: 24,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                <Image
                    src={user?.avatar}
                    radius="md"
                    alt={`${user?.first_name} ${user?.last_name}`}
                    style={{
                        width: 140,
                        height: 140,
                        objectFit: "cover",
                        flexShrink: 0,
                    }}
                />

                <Stack style={{ flex: 1 }}>
                    <Text size="lg">
                        <b>ID:</b> {user?.id}
                    </Text>
                    <Text size="lg">
                        <b>Имя:</b> {user?.first_name} {user?.last_name}
                    </Text>
                    <Text size="lg">
                        <b>Email:</b> {user?.email}
                    </Text>

                    <Group mt="md" style={{ gap: "12px" }}>
                        <Button onClick={() => navigate(-1)} variant="outline">
                            Вернуться к пользователям
                        </Button>
                        <Button onClick={() => setEditOpen(true)}>Редактировать</Button>
                    </Group>
                </Stack>
            </Paper>

            {user && (
                <EditUserModal
                    user={user}
                    opened={editOpen}
                    onClose={() => setEditOpen(false)}
                />
            )}
        </>
    );
};

export default UserPage;
