import { StyleSheet, Text, View } from "react-native";

export default function ExpenseSummary({ totalExpense })
{

    return <View style={styles.box}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>{`${totalExpense}$`}</Text>
    </View>;
}

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'space-between',
        margin: 15
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#CC00CC',
        margin: 4
    }
});