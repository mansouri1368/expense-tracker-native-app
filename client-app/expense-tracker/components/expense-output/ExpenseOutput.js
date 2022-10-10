
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";

export default function ExpenseOutput({ expenses })
{
    const totalExpense = expenses.reduce((a, b) => { return a + +b.cost; }, 0);

    return (
        <>
            <ExpenseSummary totalExpense={totalExpense} />
            <ExpenseList expenses={expenses} />
        </>
    );
}
