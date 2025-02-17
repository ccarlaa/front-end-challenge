import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = import.meta.env.VITE_URL_API;

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [ erroSignUp, setErroSignUp ] = useState(false);
    const [ erroSignIn, setErroSignIn ] = useState(false);

    const navigate = useNavigate();

    const postSignUp = (signUp) => {
        const body = {
            user: {
                email: signUp.email,
                password: signUp.password,
                role: "admin",
            },
        }

        axios.post(`${URL}/users`, body)
        .then(() => navigate("/"))
        .catch((e) => {
            setErroSignUp(true);
        })
    }

    const postSignIn = (signIn) => {
        const body = {
            user: {
                email: signIn.email,
                password: signIn.password,
            },
        }

        axios.post(`${URL}/users/login`, body)
        .then((answer) => {
            localStorage.setItem("user", JSON.stringify({
                token: answer.headers.authorization,
            }));
            navigate('/homepage');
        })
        .catch((e) => {
            setErroSignIn(true);
        })
    }


    return (
        <AuthContext.Provider
            value = {{
                postSignUp,
                setErroSignUp,
                erroSignUp,
                postSignIn,
                erroSignIn,
                setErroSignIn
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}