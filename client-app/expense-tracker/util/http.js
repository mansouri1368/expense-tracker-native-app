import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "http://10.0.2.2:5000/api/expenses";

axios.interceptors.response.use(async (response) =>
{
    return response;
}, (error: AxiosError) =>
{
    const { data, status, config } = error.response;

    console.log(error.response);

    //switch (status)
    //{
    //    case 404:
    //        history.push("not-found");
    //        break;
    //    case 400:
    //        if (typeof data === 'string')
    //        {
    //            toast.error(data);
    //        }
    //        if (config.method === 'get' && data.errors.hasOwnProperty('id'))
    //        {
    //            history.push('not-found');
    //        }
    //        if (data.errors)
    //        {
    //            const modelStateError = [];
    //            for (const key in data.errors)
    //            {
    //                if (data.errors[key])
    //                    modelStateError.push(data.errors[key]);
    //            }
    //            throw modelStateError.flat();
    //        }
    //        break;
    //    case 401:
    //        toast.error("Unauthorized");
    //        break;
    //    case 500:
    //        store.commonStore.setServerError(data);
    //        history.push('server-error');
    //        break;
    //}

    return Promise.reject(error);
});

export async function storeExpense(expensesData)
{

    const token = await AsyncStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(BACKEND_URL, expensesData, config);
    const id = response.data;
    return id;
}


export async function fetchExpense()
{
    const token = await AsyncStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.get(BACKEND_URL, config);
    const expenses = [];

    for (let index of response.data)
    {
        const date = index.date.slice(0, 10);
        expenses.push({ ...index, date: date });
    }
    return expenses;
}

export async function updateExpense(id, expenseData)
{
    const token = await AsyncStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.put(BACKEND_URL + `/${id}`, expenseData, config);

}

export async function deleteExpense(id)
{
    const token = await AsyncStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.delete(BACKEND_URL + `/${id}`, config);

}

