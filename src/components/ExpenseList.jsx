import { useState, useEffect } from 'react';
import '../styles/ExpenseList.css';
import EditModel from './EditModel';
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';
export default function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [openModel, setOpenModel] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteExpense, setDeleteExpense] = useState(null);
    const navigate = useNavigate();

    const loadExpenses = () => {
        const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        setExpenses(savedExpenses);
    };

    useEffect(() => {
        // Safe: we only read localStorage on mount
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadExpenses();
    }, []);

    // Delete handler
    const handleDelete = (id) => {
        if (id === null) return;

        const updatedExpenses = expenses.filter((item) => item.id !== id);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        setExpenses(updatedExpenses);
        setDeleteExpense(null);
    };

    const totalAmount = expenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );
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
                    onUpdate={loadExpenses}
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
                                            onClick={() => setDeleteExpense(item)}
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
                {deleteExpense !== null && (
                <ConfirmationModal
                    title="Delete Expense"
                    message={"Are you sure you want to delete this expense "}
                    confirmText="Delete"
                    cancelText="Cancle"
                    onCancel={() => setDeleteExpense(null)}
                    onConfirm={() => handleDelete(deleteExpense.id)}
                />
            )}
        </>
    );
}
