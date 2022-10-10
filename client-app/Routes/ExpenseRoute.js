import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "../expense-tracker/components/IconButton";
import AllExpenses from "../expense-tracker/screens/AllExpenses";
import ManageExpense from "../expense-tracker/screens/ManageExpense";
import RecentExpenses from "../expense-tracker/screens/RecentExpenses";




const Stack = createNativeStackNavigator();

export default function ExpenseRoute()
{


    return (

        <Stack.Navigator screenOptions={{
            headerTitleStyle:
                { fontSize: 22, fontWeight: 'bold', color: 'white' },
            headerStyle: { backgroundColor: '#0066FF' },
            headerTintColor: 'white',

        }} >

            <Stack.Screen name='AllExpenses' component={AllExpenses}
                options={({ navigation }) =>
                ({
                    headerRight: () =>
                        <IconButton name='add' size={30} color='white'
                            onPress={() => navigation.navigate('ManageExpense')} />,

                    gestureEnabled: false,
                    headerLeft: () => <IconButton size={24} color='white' onPress={() => navigation.goBack()} name={'arrow-back'} />
                })} />
            <Stack.Screen name='RecentExpenses' component={RecentExpenses} />
            <Stack.Screen name='ManageExpense' component={ManageExpense} />


        </Stack.Navigator>

    );
};
