import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { API_URL } from "../apis/apiUrl";
import "../styles/EditModel.css";

function EditModel({ editId, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    id: editId,
    amount: null,
    description: "",
    date: "",
    category: "",
  });

  // Fetch single expense
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await fetch(`${API_URL}/${editId}`);
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpense();
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
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");

      onUpdate(); 
      onClose(); 
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return createPortal(
    <>
      <div className="model" onClick={onClose}></div>

      <div className="form-box">
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
    </>,
    document.getElementById("modal-root")
  );
}

export default EditModel;
