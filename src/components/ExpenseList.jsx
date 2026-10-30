import { useState, useEffect } from 'react';
import '../styles/ExpenseList.css';
import { API_URL } from '../apis/apiUrl';
import EditModel from './EditModel';
import { useNavigate } from 'react-router-dom';
export default function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [openModel, setOpenModel] = useState(false);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    //Fetch data
    const fetchExpenses = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setExpenses(data);

            // calculate total
            const total = data.reduce((sum, item) => sum + Number(item.amount), 0);
            setTotalAmount(total);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };
    useEffect(() => {
        // Safe: we only call fetchExpenses on mount
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchExpenses();
    }, []);
    // Delete handler
    const handleDelete = async (id) => {
        if (!id) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                // Remove deleted expense from state
                const updatedExpenses = expenses.filter((item) => item.id !== id);
                setExpenses(updatedExpenses);

                // Update total amount
                const total = updatedExpenses.reduce(
                    (sum, item) => sum + Number(item.amount),
                    0
                );
                setTotalAmount(total);
            } else {
                console.error('Failed to delete expense');
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };
    // Filtered expenses
    const filteredExpenses = expenses.filter((item) => {
        const matchesCategory = filter === 'all' || item.category === filter;
        const matchesSearch =
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Handlers
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    const editHandler = (id) => {
        setEditId(id);
        setOpenModel(true);
    };
    // Read more handler
    const handleReadMore = (id) => {
        navigate(`/expenseDetails/${id}`);
    };
    return (
        <>

            {openModel && editId !== null && (
                <EditModel
                    editId={editId}
                    onClose={() => setOpenModel(false)}
                    onUpdate={fetchExpenses}
                />
            )}

            <div className="ExpenseList">
                <div className="list-search">
                    <div>
                        <h1>Expense List</h1>
                    </div>
                    <div>
                        <select value={filter} onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="food">Food</option>
                            <option value="shopping">Shopping</option>
                            <option value="Transportation">Transportation</option>
                            <option value="education"> Education</option>
                            <option value="phoneBill"> Phone Bill</option>
                            <option value="entertainment"> Entertainment</option>
                        </select>
                        <input
                            type="search"
                            placeholder="search expense.."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />

                    </div>
                </div>

                <table>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Delete</th>
                        <th>Edit</th>
                        <th>ReadMore</th>
                    </tr>
                    {filteredExpenses.length > 0 ? (
                        <>
                            {filteredExpenses.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.amount}</td>
                                    <td> {item.description}</td>
                                    <td> {item.date}</td>
                                    <td> {item.category}</td>
                                    <td>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => editHandler(item.id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td><button
                                        className="btn-readmore"
                                        onClick={() => handleReadMore(item.id)}
                                    >
                                        Read More
                                    </button></td>
                                </tr>
                            ))}
                            <tr className="expense-total">
                                <td colSpan={7}>Total Amount:{totalAmount}</td>
                            </tr>
                        </>
                    ) : (
                        <td colSpan={7} className="no-data">No results found</td>
                    )}
                </table>
            </div>
        </>
    );
}
