import { useState } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import UserMenu from "../Layout/UserMenu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Income = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


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
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        navigate("/dashboard");
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
                    type="text"
                    required
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
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
                    <option value="Salary">Salary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Investments">Investments</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Type:</label>
                  <select
                    required
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Other">Other</option>
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
                <button
                  type="submit"
                  className="btn btn-primary"
                 
                >
                  Add Income
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
