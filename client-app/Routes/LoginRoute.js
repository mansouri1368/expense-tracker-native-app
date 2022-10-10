import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import IconButton from '../login&signup/components/IconButton';
import { Colors } from '../login&signup/constants/style';
import Login from '../login&signup/screens/Login';
import Signup from '../login&signup/screens/Signup';
import { AuthContext } from '../login&signup/store/auth-context';
import ExpenseRoute from './ExpenseRoute';

const Stack = createNativeStackNavigator();

function AuthStack({ navigation })
{

    return (
        < Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
                gestureEnabled: false,
                headerLeft: () => <IconButton size={24} color='white' onPress={() => navigation.goBack()} icon={'arrow-back'} />
            }
            }
        >
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={Signup} />
        </Stack.Navigator >);
}

function AuthenticatedStack()
{
    const authCtx = useContext(AuthContext);
    const navigation = useNavigation();

    async function logoutHandler()
    {
        await authCtx.logout();
        navigation.replace('Home');
    }

    return (
        < Stack.Navigator >
            <Stack.Screen name='ExpenseRoute' component={ExpenseRoute}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle:
                        { fontSize: 22, fontWeight: 'bold', color: 'white', },
                    headerStyle: { backgroundColor: '#0066FF', },
                    headerTintColor: 'white',
                    headerRight: () => <IconButton size={24} color='white' onPress={logoutHandler} icon={'exit'} />,
                    gestureEnabled: false,
                    headerBackVisible: false,


                }}
            />
        </Stack.Navigator >);

}

function Navigation()
{
    const authCtx = useContext(AuthContext);

    return (

        < Stack.Navigator>
            {authCtx.authenticated && < Stack.Screen name='AuthenticatedStack' component={AuthenticatedStack} options={{ headerShown: false }} />}
            {!authCtx.authenticated && <Stack.Screen name='AuthStack' component={AuthStack} options={{ headerShown: false }} />}
        </Stack.Navigator>

    );


}


export default function LoginRoute()
{

    const authCtx = useContext(AuthContext);
    useEffect(() =>
    {
        async function fetchToken()
        {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) { await authCtx.authenticate(storedToken); }
        }
        fetchToken();
    }, []);

    return <Navigation />;
}
