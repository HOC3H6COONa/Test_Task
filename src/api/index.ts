import axios from "axios";
import type {User, UsersResponse} from "../types";

const BASE_URL = "https://reqres.in/api";
const API_KEY = "reqres-free-v1"; // В данном случае ключ можем хранить здесь а не в .env, так как это просто API ключ из свободного доступа


const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
    },
});

// Получаем список пользователей
export const getUsers = async (page: number = 1): Promise<UsersResponse> => {
    const { data } = await api.get(`/users?page=${page}`);
    return data;
};

// Получить пользователя по ID
export const getUserById = async (id: number | string): Promise<User> => {
    const { data } = await api.get(`/users/${id}`);
    return data.data;
};

// Запрос на обновление пользователя
export const updateUser = async (
    id: number | string,
    payload: Partial<User>
): Promise<User> => {
    const { data } = await api.put(`/users/${id}`, payload);
    return data;
};
