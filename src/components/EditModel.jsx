import { useEffect, useState } from "react";
import "../styles/EditModel.css";

function EditModel({ editId, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    id: editId,
    amount: null,
    description: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const expense = expenses.find((item) => item.id === editId);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (expense) setFormData(expense);
  }, [editId]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  // Update expense
  const handleUpdate = (e) => {
    e.preventDefault();

    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const updatedExpenses = expenses.map((item) =>
      item.id === editId ? formData : item
    );

    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    onUpdate();
    onClose();
  };

  return (
    <div className="model" onClick={onClose}>
      <div className="form-box" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleUpdate}>
          <h1>Edit Expense</h1>

          <input
            type="number"
            name="amount"
            value={formData.amount || ''}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="shopping">Shopping</option>
            <option value="Transportation">Transportation</option>
            <option value="education">Education</option>
            <option value="phoneBill">Phone Bill</option>
            <option value="entertainment">Entertainment</option>
          </select>

          <div className="model-btn">
            <button type="submit" className="edit">Update</button>
            <button type="button" className="cancle" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModel;
