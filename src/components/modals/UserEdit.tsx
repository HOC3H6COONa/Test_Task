import { useEffect } from "react";
import { Modal, TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdateUser } from "../../queries";
import { showNotification } from "@mantine/notifications";
import type { User } from "../../types";
import {validateEmail} from "../../utils/validators/EmailValidation.ts";

interface EditUserModalProps {
    user: User;
    opened: boolean;
    onClose: () => void;
}

export const EditUserModal = ({ user, opened, onClose }: EditUserModalProps) => {
    const { mutateAsync, isPending } = useUpdateUser();

    const form = useForm({
        initialValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        },
        validate: {
            first_name: (value) => (value.trim().length === 0 ? "Обязательное поле" : null),
            last_name: (value) => (value.trim().length === 0 ? "Обязательное поле" : null),
            email: (value) => validateEmail(value),
        },
    });

    useEffect(() => {
        if (opened) {
            form.reset();
            form.setValues({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            });
        }
    }, [opened, user]);

    const handleSubmit = async (values: typeof form.values) => {
        try {
            await mutateAsync({ id: user.id, payload: values });
            showNotification({
                title: "Успех",
                message: "Пользователь успешно обновлён",
                color: "green",
                autoClose: 3000,
                styles: () => ({
                    root: {
                        width: 'fit-content',
                        minWidth: 250,
                        maxWidth: 400,
                    },
                    title: { fontWeight: 600 },
                }),
            });
            onClose();
        } catch {
            showNotification({
                title: "Ошибка",
                message: "Ошибка при обновлении пользователя",
                color: "red",
                autoClose: 5000,
                styles: () => ({
                    root: {
                        width: 'fit-content',
                        minWidth: 250,
                        maxWidth: 400,
                    },
                    title: { fontWeight: 600 },
                }),
            });
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Редактирование пользователя" centered>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="Имя" placeholder="Введите имя" {...form.getInputProps("first_name")} required />
                <TextInput label="Фамилия" placeholder="Введите фамилию" mt="sm" {...form.getInputProps("last_name")} required />
                <TextInput label="Email" placeholder="Введите email" mt="sm" {...form.getInputProps("email")} required />

                <Group mt="md" style={{ justifyContent: "flex-end" }}>
                    <Button type="submit" loading={isPending}>
                        Сохранить
                    </Button>
                </Group>
            </form>
        </Modal>
    );
};

export default EditUserModal;
