import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";
import LoadingOverlay from "../components/LoadingOverlay";
import AuthContent from "./AuthContent";
import { Alert } from "react-native";


export default function Login({ navigation })
{
    const authCtx = useContext(AuthContext);
    const [isAuthenticating, setIsAuthenticating] = useState(false);



    async function loginHandler(email, password)
    {
        setIsAuthenticating(true);
        try
        {
            const token = await login(email, password);
            await authCtx.authenticate(token);
            setIsAuthenticating(false);
        } catch (error)
        {
            Alert.alert('Could not Log in', 'You have not signed up yet, Error 401');
            navigation.navigate('LoginRoute', { screen: 'AuthStack', params: { screen: 'Signup' } });
            setIsAuthenticating(false);
        }


        

        navigation.navigate('LoginRoute',
            {
                screen: 'AuthenticatedStack',
                params: {
                    screen: "ExpenseRoute",
                    params: { screen: 'AllExpenses' }
                }
            });
    }


if (isAuthenticating) { return <LoadingOverlay message='Logging user....' />; }

return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;

};
