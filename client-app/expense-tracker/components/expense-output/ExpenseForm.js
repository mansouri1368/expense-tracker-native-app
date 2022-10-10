import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ColorsForExpenses } from "../../constants/style";
import Button from "../Button";
import InputForExpense from "../InputForExpense";
import OutlineButton from "../OutlineButton";


export default function ExpenseForm({ onSubmit, defaultValue, submitButtonLabel, onCancel })
{
    const navigation = useNavigation();
    const [inputs, setInputs] = useState({
        cost: (defaultValue ? defaultValue.cost.toString() : ''),
        date: (defaultValue ? defaultValue.date : ''),
        description: (defaultValue ? defaultValue.description.toString() : '')
    });

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        cost: false,
        date: false,
        description: false
    });

    const {
        cost: expenseIsInvalid,
        date: dateIsInvalid,
        description: descriptionIsInvalid,
    } = credentialsInvalid;

    function onChangeHandler(identifier, enteredValue)
    {
        setInputs((current) => ({ ...current, [identifier]: enteredValue }));
        setCredentialsInvalid((current) => ({ ...current, [identifier]: !enteredValue }));
    }

    function submitHandler()
    {
        const cost = parseInt(inputs.cost);
        const date = new Date(inputs.date);
        const description = inputs.description;

        const expenseIsValid = (!isNaN(cost) && cost > 0);
        const dateIsValid = ((date !== 'Invalid Date') && (inputs.date.length === 10));
        const descriptionIsValid = description.length > 0;

        if (!expenseIsValid || !dateIsValid || !descriptionIsValid)
        {
            Alert.alert('inputs are invalid', 'enter valid inputs');
            setCredentialsInvalid({
                cost: !expenseIsValid,
                date: !dateIsValid,
                description: !descriptionIsValid
            });

            return;
        }
        onSubmit({
            cost: inputs.cost,
            date: inputs.date,
            description: inputs.description,
        });
        navigation.navigate('AllExpenses');
    }

    return <View style={styles.container}>
        <View style={styles.inputContainer}>
            <InputForExpense isInvalid={expenseIsInvalid} label='Expense' inputConfig={{
                keyboardType: "numeric",
                onChangeText: onChangeHandler.bind(this, 'cost'),
                value: inputs.cost
            }} />
            <InputForExpense isInvalid={dateIsInvalid} label='Date' inputConfig={{
                onChangeText: onChangeHandler.bind(this, 'date'),
                value: inputs.date,
                placeholder: 'YYYY-MM-DD',
                placeholderTextColor: "#CC00CC",

            }} />
        </View>
        <View style={styles.desContainer}>
            <InputForExpense isInvalid={descriptionIsInvalid} label='Description' inputConfig={{
                keyboardType: "numbers-and-punctuation",
                onChangeText: onChangeHandler.bind(this, 'description'),
                value: inputs.description,
                multiline: true,
                textAlignVertical: 'top',
                numberOfLines: 5

            }} />
        </View>

        <View style={styles.buttonContainer}>
            <OutlineButton title='Cancel' onPress={onCancel} style={{ backgroundColor: '#6666FF' }} />
            <Button title={submitButtonLabel} onPress={submitHandler} />
        </View>

    </View>;
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 100
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    desContainer: {
        marginTop: 20,
        height: 100

    }
});