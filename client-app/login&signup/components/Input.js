import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../constants/style";

export default function Input({ label, inputConfig, isInvalid })
{
    return <View style={styles.inputContainer}>
        <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text>
        <TextInput style={[styles.input, isInvalid && styles.inputInvalid]}  {...inputConfig} />
    </View>;
};


const styles = StyleSheet.create({

    inputContainer: {
        marginVertical: 8,
    },
    label: {
        color: 'white',
        marginBottom: 4,
    },
    labelInvalid: {
        color: Colors.error500,
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        fontSize: 16,

    },
    inputInvalid: {
        backgroundColor: Colors.error100,
    },
});