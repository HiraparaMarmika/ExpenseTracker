import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExpenseForm.css';


export default function ExpenseForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: null,
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Enter an amount greater than 0';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.category) {
      newErrors.category = 'Select a category';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const newExpense = { ...formData, id:Math.random() };

    localStorage.setItem('expenses', JSON.stringify([...expenses, newExpense]));
    navigate('/');
  };


  return (
    <div className="expenseform">
      <form action="" onSubmit={handleSubmit} noValidate>
        <h1>Expense Form</h1>
        <input
          type="number"
          name="amount"
          placeholder="Enter amount.."
          value={formData?.amount || ''}
          onChange={handleChange}
        />
        {errors.amount && <p className="validation">{errors.amount}</p>}
        <input
          type="text"
          placeholder="Enter Description.."
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="validation">{errors.description}</p>}
        <input
          type="date"
          placeholder="Enter Date.."
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p className="validation">{errors.date}</p>}
        <label htmlFor="">Category:</label>&nbsp;&nbsp;&nbsp;
        <select
          value={formData.category}
          onChange={handleChange}
          name="category"
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="Transportation">Transportation</option>
          <option value="education"> Education</option>
          <option value="phoneBill"> Phone Bill</option>
          <option value="entertainment"> Entertainment</option>
        </select>
        {errors.category && <p className="validation">{errors.category}</p>}
        <div className="btn">
          <button>Add Expense</button>
        </div>
      </form>
    </div>
  );
}
