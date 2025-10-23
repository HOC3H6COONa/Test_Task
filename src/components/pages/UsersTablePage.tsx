import {
    Table,
    Pagination,
    Loader,
    Center,
    Anchor,
    Container,
    Paper,
    Text,
    Alert,
    TextInput,
} from "@mantine/core";
import { Link, useSearchParams } from "react-router-dom";
import { useUsers } from "../../queries";
import { useState, useMemo } from "react";

const UsersTablePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, isError, error } = useUsers(page);

    const filteredUsers = useMemo(() => {
        const users = data?.data || [];
        if (!searchTerm.trim()) return users;

        return users.filter(
            (user) =>
                user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, data?.data]);

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
                    Не удалось загрузить пользователей.
                    {error?.message && <Text size="sm" mt="xs">{error.message}</Text>}
                </Alert>
            </Center>
        );

    return (
        <Container fluid py="xl">
            <Paper shadow="lg" radius="md" withBorder p="lg">
                <TextInput
                    placeholder="Поиск по имени, фамилии или email"
                    mb="md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    aria-label="Поиск пользователей"
                />

                {filteredUsers.length === 0 ? (
                    <Center py="xl">
                        <Text>
                            {searchTerm.trim()
                                ? "Пользователи не найдены"
                                : "Нет пользователей для отображения"}
                        </Text>
                    </Center>
                ) : (
                    <Table highlightOnHover withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>ID</Table.Th>
                                <Table.Th>First Name</Table.Th>
                                <Table.Th>Last Name</Table.Th>
                                <Table.Th>Email</Table.Th>
                            </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody>
                            {filteredUsers.map((user) => (
                                <Table.Tr key={user.id}>
                                    <Table.Td>
                                        <Anchor component={Link} to={`/users/${user.id}`}>
                                            {user.id}
                                        </Anchor>
                                    </Table.Td>
                                    <Table.Td>{user.first_name}</Table.Td>
                                    <Table.Td>{user.last_name}</Table.Td>
                                    <Table.Td>{user.email}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                )}

                <Center mt="xl">
                    <Pagination
                        total={data?.total_pages || 1}
                        value={page}
                        onChange={(p) => setSearchParams({ page: String(p) })}
                        aria-label="Навигация по страницам"
                    />
                </Center>
            </Paper>
        </Container>
    );
};

export default UsersTablePage;