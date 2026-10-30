import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExpenseForm.css';
import { API_URL } from '../apis/apiUrl';


export default function ExpenseForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: null,
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.description || !formData.category) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      navigate('/');
    } catch (error) {
      console.error('Error while adding expense:', error);
      alert('Something went wrong. Please try again.');
    }
  };


  return (
    <div className="expenseform">
      <form action="" onSubmit={handleSubmit}>
        <h1>Expense Form</h1>
        <input
          type="number"
          name="amount"
          placeholder="Enter amount.."
          value={formData?.amount || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Description.."
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="Enter Date.."
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <label htmlFor="">Category:</label>&nbsp;&nbsp;&nbsp;
        <select
          value={formData.category}
          onChange={handleChange}
          name="category"
        >
          <option>Select Category</option>
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="Transportation">Transportation</option>
          <option value="education"> Education</option>
          <option value="phoneBill"> Phone Bill</option>
          <option value="entertainment"> Entertainment</option>
        </select>
        <div className="btn">
          <button>Add Expense</button>
        </div>
      </form>
    </div>
  );
}
