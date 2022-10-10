import axios from "axios";

const URL_ACCOUNT = 'http://10.0.2.2:5000/api/account/';

async function authenticate(mode, email, password)
{
    const url = `${URL_ACCOUNT}${mode}`;
    const response = await axios.post(url, {
        email: email,
        password: password,
    });

    const token = response.data.token;
    return token;
}

export function createUser(email, password)
{
    return authenticate('register', email, password);
}

export function login(email, password)
{
    return authenticate('login', email, password);
}