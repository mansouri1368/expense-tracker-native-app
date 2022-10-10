import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ColorsForExpenses } from "../../constants/style";
import { getFormattedDate } from "../../util/Date";

export default function ExpenseItem({ id, description, date, cost })
{
    const navigation = useNavigation();

    function pressHandler()
    {
        navigation.navigate('ManageExpense', {
            expenseId: id
        });

    }

    return <Pressable onPress={pressHandler} style={({ pressed }) => pressed ? [styles.Container, styles.pressed] : styles.Container}>
        <View style={styles.leftSide}>
            <Text style={styles.text}>{description}</Text>
            <Text style={styles.text}>{date}</Text>
        </View>
        <View style={styles.rightSide}>
            <Text style={styles.rightText}>{cost}</Text>
        </View>
    </Pressable>;
}
const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        backgroundColor: ColorsForExpenses.primary400,
        justifyContent: 'space-between',
        margin: 10,
        borderRadius: 6

    },
    pressed: {
        opacity: 0.25
    },
    leftSide: {
        flexDirection: 'column',
        margin: 3,

        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: 'white'
    },

    rightSide: {
        backgroundColor: '#CC00CC',
        borderRadius: 4,
        width: '20 %',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'

    }
});