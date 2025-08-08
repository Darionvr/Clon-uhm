import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token") || "")
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const logout = () => {
        setToken(null);
    }

    useEffect(() => {

        if (!token || currentUser) {
            setLoading(false);
            return;
        }


        const validateToken = async () => {

            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) {
                    logout(); 
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setCurrentUser(data.user); 
            } catch (error) {
                console.error("Error validando token:", error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Login error:", errorData);
                return false;
            }

            const data = await response.json();
            if (data.token && data.user) {
                setToken(data.token);
                setCurrentUser(data.user);
                localStorage.setItem("token", data.token);
                return data;
            }

        } catch (error) {
            console.error("Network or unexpected error:", error);
            setToken(null);
            return false;
        }
    };

    const register = async (registerForm) => {

        try {
            const formData = new FormData();
            formData.append("first_name", registerForm.first_name);
            formData.append("last_name", registerForm.last_name);
            formData.append("email", registerForm.email);
            formData.append("password", registerForm.password);
            formData.append("rut", registerForm.rut);
            if (registerForm.photo) {
                formData.append("photo", registerForm.photo);
            }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            console.log("Respuesta del registro:", data);

            if (!response.ok) {
                console.error("Registro fallido:", data.message);
                return false;
            }

            if (data.token && data.user) {
                setToken(data.token);
                setCurrentUser(data.user);
                localStorage.setItem("token", data.token);
                return data;
            } else {
                console.error("Faltan datos en la respuesta del backend");
                return false;
            }

        } catch (error) {
            console.error("Error en el registro:", error);
            setToken(null);
            return false;
        }
    };

    return (
        <UserContext.Provider value={{
            token, setToken, login, logout, register, currentUser, setCurrentUser, loading
        }}>

            {children}
        </UserContext.Provider>
    )

}

export default UserProvider