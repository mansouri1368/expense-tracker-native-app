import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    authenticate: (token) => { },
    authenticated: false,
    logout: () => { }
});

export default function AuthContextProvider({ children })
{
    const [tokenState, setToken] = useState('');

    async function authenticate(token)
    {
        try
        {
            await AsyncStorage.setItem('token', token);
            setToken(token);

        }
        catch (error)
        {
            console.log(error);
        }
    }
    async function logout()
    {
        try
        {
            await AsyncStorage.removeItem('token');
            setToken(null);

        }
        catch (error)
        {
            console.log(error);
        }

    }
    const value = {
        token: tokenState,
        authenticated: !!tokenState,
        authenticate: authenticate,
        logout: logout
    };
    return (<AuthContext.Provider value={value} >{children}</AuthContext.Provider>);
}
