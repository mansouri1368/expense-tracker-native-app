import { useContext, useState } from "react";
import { Alert } from "react-native";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";
import AuthContent from "./AuthContent";


export default function Signup({ navigation })
{
    const authCtx = useContext(AuthContext);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    async function signupHandler(email, password)
    {
        setIsAuthenticating(true);
        try
        {
            const token = await createUser(email, password);
            authCtx.authenticate(token);
            setIsAuthenticating(false);
        } catch (error)
        {
            Alert.alert('Could not Sign Up', 'Email has already taken or pass is wrong please log in');
            
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

    if (isAuthenticating) { return <LoadingOverlay message='Signing up user....' />; }

    return <AuthContent onAuthenticate={signupHandler} />;
};
