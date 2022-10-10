
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpenseContextProvider from './expense-tracker/store/expense-context';
import Home from './Home/Home';
import { Colors } from './login&signup/constants/style';
import AuthContextProvider from './login&signup/store/auth-context';
import LoginRoute from './Routes/LoginRoute';

const Stack = createNativeStackNavigator();

export default function App()
{

    return (
        <>
            <AuthContextProvider>
                <ExpenseContextProvider>
                    <NavigationContainer >
                        <Stack.Navigator>
                            <Stack.Screen name='Home' component={Home} options={{
                                headerTitleAlign: 'center',
                                headerStyle: { backgroundColor: Colors.primary500, },
                                headerTintColor: 'white',
                                contentStyle: { backgroundColor: Colors.primary100, },
                                headerTitleStyle: {
                                    fontWeight: 'bold', fontSize: 18
                                }
                            }} />
                            <Stack.Screen name='LoginRoute' component={LoginRoute} options={{ headerShown: false }} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ExpenseContextProvider>
            </AuthContextProvider>
        </>
    );
}


