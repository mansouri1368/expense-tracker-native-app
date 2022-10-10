import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import Button from "../login&signup/components/Button";


export default function Home({ navigation })
{

    return (

        <ImageBackground source={require('../assets/Making-A-Monthly-Budget-960x502.png')} style={styles.root} resizeMode='cover' imageStyle={{ opacity: 0.45 }} >
            <SafeAreaView style={styles.root}>
                <View style={styles.buttonContainer}>
                    <Button label='Log in'
                        onPress={() => navigation.navigate('LoginRoute', { screen: 'AuthStack', params: { screen: 'Login' } })} style={{ backgroundColor: 'rgb(51, 51, 204)' }} />

                    <Button label='Expense controler'
                        onPress={() =>
                            navigation.navigate('LoginRoute', { screen: 'AuthenticatedStack', params: { screen: "ExpenseRoute", params: { screen: 'AllExpenses' } } })
                        }
                        style={{ backgroundColor: 'rgb(0, 153, 255)' }} />
                </View>
            </SafeAreaView>
        </ImageBackground>


    );
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonContainer: {
        alignItems: "center"
    },

});