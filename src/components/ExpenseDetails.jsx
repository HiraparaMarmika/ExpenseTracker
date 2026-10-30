import { useEffect, useState } from 'react'
import '../styles/ExpenseDetails.css'
import {useParams } from 'react-router-dom';
function ExpenseDetails() {
    const { id } = useParams();
    const [expense, setExpense] = useState(null);

    useEffect(() => {
        const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        const savedExpense = expenses.find((item) => String(item.id) === id);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExpense(savedExpense || null);
    }, [id]);
    return (
        <>
            <div className="expense-details">
                <h1>Expense Details</h1>

                <div className="details-card">
                    <p><strong>Amount:</strong> ₹{expense?.amount}</p>
                    <p><strong>Description:</strong> {expense?.description}</p>
                    <p><strong>Date:</strong> {expense?.date}</p>
                    <p><strong>Category:</strong> {expense?.category}</p>
                </div>
            </div>
        </>
    )
}

export default ExpenseDetails
