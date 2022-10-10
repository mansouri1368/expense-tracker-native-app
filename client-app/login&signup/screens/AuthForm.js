
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";



export default function AuthForm({ isLogin, onSubmit, credentialsInvalid })
{
    const [input, setInput] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;

    function onChangeHandler(identifier, enteredValue)
    {
        setInput((current) => { return { ...current, [identifier]: enteredValue }; });
    }
    
    function submitHandler()
    {
        onSubmit({
            email: input.email,
            confirmEmail: input.confirmEmail,
            password: input.password,
            confirmPassword: input.confirmPassword
        });

    }

    return <View style={styles.container}>

        <View style={styles.inputContainer}>

            <Input label='Email'
                inputConfig={{
                    keyboardType: 'email-address',
                    onChangeText: onChangeHandler.bind(this, 'email'),
                    value: input.email,

                }}
                isInvalid={emailIsInvalid}

            />
            {!isLogin && <Input label='Confirm Email'
                inputConfig={{
                    keyboardType: 'email-address',
                    onChangeText: onChangeHandler.bind(this, 'confirmEmail'),
                    value: input.confirmEmail
                }}
                isInvalid={emailsDontMatch}
            />}
            <Input label='Password'
                inputConfig={{
                    keyboardType: 'numbers-and-punctuation',
                    onChangeText: onChangeHandler.bind(this, 'password'),
                    value: input.password
                }}
                isInvalid={passwordIsInvalid}
            />
            {!isLogin && <Input label='Confirm Password'
                inputConfig={{
                    keyboardType: 'numbers-and-punctuation',
                    onChangeText: onChangeHandler.bind(this, 'confirmPassword'),
                    value: input.confirmPassword
                }}
                isInvalid={passwordsDontMatch}
            />}
            <View style={styles.buttons}>
                <Button onPress={submitHandler} label={isLogin ? 'Log In' : 'Sign Up'} />
            </View>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
        alignItems: 'center'
    },
});