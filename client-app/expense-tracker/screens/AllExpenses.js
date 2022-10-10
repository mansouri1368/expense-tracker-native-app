
import { Link } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import LoadingOverlay from "../../login&signup/components/LoadingOverlay";

import ExpenseOutput from "../components/expense-output/ExpenseOutput";
import { ColorsForExpenses } from "../constants/style";
import { ExpenseContext } from "../store/expense-context";
import { fetchExpense } from "../util/http";

import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../login&signup/constants/style";
import OutlineButton from "../components/OutlineButton";

export default function AllExpenses({ navigation })
{
    const expCtx = useContext(ExpenseContext);
    const expenses = expCtx.expenses.reverse();

    const [isFetching, setIsFetching] = useState(true);


    useEffect(() =>
    {
        async function getExpenses()
        {
            setIsFetching(true);
            try
            {
                const expenses = await fetchExpense();
                expCtx.setExpenses(expenses);
            } catch (error)
            {
                console.log(error);
            }

            return setIsFetching(false);

        };
        getExpenses();

    }, []);

    if (isFetching)
    {
        return <LoadingOverlay />;
    }
    return (
        <LinearGradient colors={[Colors.secondary100, Colors.secondary200]} style={styles.container}>
            <ImageBackground
                source={require('../../assets/Making-A-Monthly-Budget-960x502.png')}
                style={{ flex: 1 }} resizeMode='contain' imageStyle={{ opacity: 0.85 }} >
                <View style={styles.container}>
                    <ExpenseOutput expenses={expenses} />
                    <View style={styles.link}>
                        <OutlineButton title='Go to Recent Expenses' onPress={() => navigation.navigate('LoginRoute',
                            {
                                screen: 'AuthenticatedStack',
                                params: {
                                    screen: "ExpenseRoute",
                                    params: { screen: 'RecentExpenses' }
                                }
                            })} />
                        <OutlineButton title='Home' onPress={() => navigation.navigate('Home')} />
                    </View>

                </View>
            </ImageBackground>
        </LinearGradient >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        flex: 1,
        justifyContent: "center"
    },
    link: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});;