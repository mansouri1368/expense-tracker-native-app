import { Pressable, StyleSheet, Text } from "react-native";

export default function OutlineButton({ title, onPress, style })
{
    return <Pressable onPress={onPress} style={({ pressed }) =>
        pressed ? [styles.innerContainer, styles.pressed] : [styles.innerContainer, style]}>
        <Text style={styles.text}>{title}</Text>
    </Pressable>;
}

const styles = StyleSheet.create({
    innerContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',

        marginVertical: 12,
        marginHorizontal: 10,


    },
    pressed: {
        opacity: 0.5
    },
    text: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'


    }
});