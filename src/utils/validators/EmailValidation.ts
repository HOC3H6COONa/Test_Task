export const validateEmail = (email: string): string | null => {
    if (!email || email.trim().length === 0) {
        return "Email обязателен";
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
        return "Неверный формат email";
    }

    return null;
};