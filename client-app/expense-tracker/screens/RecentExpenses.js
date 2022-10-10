import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Colors } from "../../login&signup/constants/style";
import ExpenseOutput from "../components/expense-output/ExpenseOutput";
import OutlineButton from "../components/OutlineButton";
import { ExpenseContext } from "../store/expense-context";

export default function RecentExpenses({ navigation })
{
    const expCtx = useContext(ExpenseContext);

    const recentExpences = expCtx.expenses.reverse().filter((m) =>
    {

        const today = new Date();
        const sevenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

        return m.date.slice(0, 10) >= sevenDaysAgo.toISOString().slice(0, 10) && m.date.slice(0, 10) <= today.toISOString().slice(0, 10);
    });

    return (
        <LinearGradient colors={[Colors.secondary100, Colors.secondary200]} style={styles.container}>
            <ImageBackground
                source={require('../../assets/Making-A-Monthly-Budget-960x502.png')}
                style={{ flex: 1 }} resizeMode='contain' imageStyle={{ opacity: 0.85 }} >
                <View style={styles.container}>
                    <ExpenseOutput expenses={recentExpences} />
                    <View style={styles.link}>
                        <OutlineButton title='Go to All Expenses' onPress={() => navigation.navigate('LoginRoute',
                            {
                                screen: 'AuthenticatedStack',
                                params: {
                                    screen: "ExpenseRoute",
                                    params: { screen: 'AllExpenses' }
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
    container: { flex: 1 },
    link: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});