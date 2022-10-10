import { Pressable, StyleSheet, Text } from "react-native";
import { ColorsForExpenses } from "../constants/style";

export default function Button({ title, onPress })
{
    return <Pressable onPress={onPress} style={({ pressed }) =>
        pressed ? [styles.innerContainer, styles.pressed] : styles.innerContainer}>
        <Text style={styles.text}>{title}</Text>
    </Pressable>;
}

const styles = StyleSheet.create({
    innerContainer: {
        backgroundColor: ColorsForExpenses.primary400,
        borderRadius: 5,
        padding: 2,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
        marginHorizontal: 10
    },
    pressed: {
        opacity: 0.5
    },
    text: {
        fontSize: 18,
        color: 'white'

    }
});
