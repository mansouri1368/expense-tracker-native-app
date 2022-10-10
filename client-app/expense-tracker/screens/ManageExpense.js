import { useContext, useLayoutEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import { ColorsForExpenses } from "../constants/style";
import { ExpenseContext } from "../store/expense-context";

import ExpenseForm from "../components/expense-output/ExpenseForm";
import IconButton from "../components/IconButton";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

export default function ManageExpense({ navigation, route })
{
    const expCtx = useContext(ExpenseContext);

    const editedExpenseId = route.params?.expenseId;

    const isEditing = !!editedExpenseId;

    useLayoutEffect(() =>
    {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    const selectedItem = expCtx.expenses.find((m) => (m.id === editedExpenseId));

    function cancelHandler()
    {
        navigation.goBack();
    }
    async function removeHandler()
    {
        try
        {
            await deleteExpense(editedExpenseId);
            expCtx.removeExpense(editedExpenseId);
        } catch (error)
        {
            console.log(error);
        }
        navigation.goBack();
    }

    async function confirmHandler(expenseData)
    {
        if (isEditing)
        {
            try
            {
                await updateExpense(editedExpenseId, expenseData);
                expCtx.updateExpense(editedExpenseId, expenseData);
            } catch (error)
            {
                console.log(error);
            }
        } else
        {
            try
            {
                const id = await storeExpense(expenseData);

                expCtx.addExpense({ ...expenseData, id: id });
            } catch (error)
            {
                console.log(error);
            }

        }
    }
    return (
        <ImageBackground
            source={require('../../assets/Making-A-Monthly-Budget-960x502.png')}
            style={{ flex: 1 }} resizeMode='cover' imageStyle={{ opacity: 0.75 }} >
            <View style={styles.container} >
                <View style={styles.buttons}>
                    <ExpenseForm onCancel={cancelHandler}
                        submitButtonLabel={isEditing ? "Update" : "Add"}
                        onSubmit={confirmHandler}
                        defaultValue={selectedItem} />
                </View>
                <View >
                    {isEditing && <View style={styles.deleteContainer}>
                        <IconButton size={32} color='red' name='trash' onPress={removeHandler} />
                    </View>}
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,

    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: ColorsForExpenses.primary200,
        alignItems: "center",
    },
});;