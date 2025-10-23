import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {getUserById, getUsers, updateUser} from "../api";
import type {User} from "../types";


// --- Получение списка пользователей ---
export const useUsers = (page: number) =>
    useQuery({
        queryKey: ["users", page],
        queryFn: () => getUsers(page),
    });

// --- Получение пользователя по ID ---
export const useUser = (id: number | string) =>
    useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserById(id),
        enabled: !!id,
    });

// --- Обновление пользователя ---
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number | string; payload: Partial<User> }) =>
            updateUser(id, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
        },
    });
};