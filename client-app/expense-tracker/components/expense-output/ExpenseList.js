import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses })
{
    function renderHandler(itemData)
    {
        return <ExpenseItem {...itemData.item} />;
    }
    return <SafeAreaView style={styles.container}>
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={renderHandler}
        />
    </SafeAreaView>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});