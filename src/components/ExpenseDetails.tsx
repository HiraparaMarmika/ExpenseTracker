import { useEffect, useState } from 'react'
import '../styles/ExpenseDetails.css'
import {useParams } from 'react-router-dom';
import type { Expense } from '../types';
import { API_URL } from '../apis/apiUrl';
function ExpenseDetails() {
    const { id } = useParams<{ id: string }>();
    const [expense, setExpense] = useState<Expense | null>(null);

    const fetchExpense = async () => {
        try {
            const res = await fetch(`${API_URL}/${id}`);
            if (res.ok) {
                const data: Expense = await res.json();
                setExpense(data);
            } else {
                console.error('Failed to fetch expense');
            }
        } catch (error) {
            console.error('Error fetching expense:', error);
        }
    };

    useEffect(() => {
        fetchExpense();
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