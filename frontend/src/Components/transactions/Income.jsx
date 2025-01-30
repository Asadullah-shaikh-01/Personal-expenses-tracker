import { useState } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import UserMenu from "../Layout/UserMenu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Income = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [date, setDate] = useState<string>(""); // Added date state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !amount || !category || !type || !date) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1003/api/v1/add-income",
        {
          title,
          description,
          amount,
          category,
          type,
          date,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-4">
              <h3>Add Income</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Title:</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Description:</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Amount:</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <div className="mb-3">
                  <label>Category:</label>
                  <select
                    required
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a Category</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Salary">Salary</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Payment Method:</label>
                  <select
                    required
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Select a Payment Method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Date:</label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  ADD INCOME
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Income;
