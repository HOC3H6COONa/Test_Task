import {Button, Center, Stack, Text} from "@mantine/core";
import {Link} from "react-router-dom";


const  NotFoundPage = () => {
    return (
        <Center style={{ height: "100vh" }}>
            <Stack align="center">
                <Text size="xl" >
                    404 — Страница не найдена
                </Text>
                <Button component={Link} to="/">
                    Вернуться на главную
                </Button>
            </Stack>
        </Center>
    );
}

export default NotFoundPage;