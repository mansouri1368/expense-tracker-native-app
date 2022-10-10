import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
    expenses: '',
    addExpense: ({ expense, date, description }) => { },
    updateExpense: (id, { expense, date, description }) => { },
    removeExpense: (id) => { },
    setExpenses: (expenses) => { }
});

function reducer(state, action)
{
    switch (action.type)
    {
        case "Add":
            const id = Math.random() + new Date().toISOString();
            return [{ ...action.payload, id: id }, ...state];
        case "Update":
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;

        case "Remove":
            return state.filter((expense) => expense.id !== action.payload);
        case "Set":
            return action.payload;
        default:
            state;
    }
}

export default function ExpenseContextProvider({ children })
{
    const [expenseState, dispatch] = useReducer(reducer, []);

    function addExpense(expenseData)
    {
        dispatch({ type: "Add", payload: expenseData });
    }
    function updateExpense(id, expenseData)
    {
        dispatch({ type: "Update", payload: { id: id, data: expenseData } });
    }
    function removeExpense(id)
    {
        dispatch({ type: "Remove", payload: id });
    }
    function setExpenses(expenses)
    {
        dispatch({ type: 'Set', payload: expenses });
    }
    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        removeExpense: removeExpense,
        setExpenses: setExpenses
    };
    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};
