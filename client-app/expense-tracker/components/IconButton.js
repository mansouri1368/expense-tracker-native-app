import { Pressable, StyleSheet, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function IconButton({ onPress, size, color, name })
{
    return <Pressable onPress={onPress} style={({ pressed }) =>
        pressed ? [styles.innerContainer, styles.pressed] : styles.innerContainer}>
        <Ionicons name={name} color={color} size={size} />
    </Pressable>;
}

const styles = StyleSheet.create({
    innerContainer: {
        padding: 2,
    },
    pressed: {
        opacity: 0.5
    },
    text: {
        fontSize: 12,
        color: 'black'

    }
});
