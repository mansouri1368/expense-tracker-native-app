import { StyleSheet, Text, TextInput, View } from "react-native";
import { ColorsForExpenses } from "../constants/style";


export default function InputForExpense({ label, inputConfig, isInvalid })
{
    return <View style={styles.inputContainer}>
        <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text>
        <TextInput style={[styles.input, isInvalid && styles.inputInvalid]}  {...inputConfig} />
    </View>;
};


const styles = StyleSheet.create({

    inputContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
        flex: 1
    },
    label: {
        color: 'blue',
        marginBottom: 4,
        fontSize: 18,
        fontWeight: 'bold'
    },
    labelInvalid: {
        color: ColorsForExpenses.error100
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        backgroundColor: '#8D8D9B',
        borderRadius: 4,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#CC00CC'
    },
    inputInvalid: {
        backgroundColor: ColorsForExpenses.error500,
    },
});
