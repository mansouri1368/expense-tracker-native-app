import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/style";

export default function Button({ label, onPress, style })
{
    return <Pressable style={({ pressed }) => pressed ?
        [styles.button, styles.pressed] : [styles.button, style]} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
    </Pressable>;
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        width: "40%",
        margin: 10
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
});