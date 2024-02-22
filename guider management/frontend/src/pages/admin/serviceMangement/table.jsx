import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/data").then((response) => {
      setTableData(response.data);
    });
  }, []);

  const handleEdit = (row) => {
    setEditMode(true);
    setFormData(row);
  };

  const handleDelete = (row) => {
    axios.delete(`http://localhost:3000/data/${row.id}`).then(() => {
      setTableData((prevData) => prevData.filter((r) => r.id !== row.id));
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formData.id) {
      axios.put(`http://localhost:3000/data/${formData._id}`, formData).then(() => {
        setTableData((prevData) =>
          prevData.map((row) => (row.id === formData.id ? formData : row))
        );
        setEditMode(false);
        setFormData({});
      });
    } else {
      axios.post("http://localhost:3000/data", formData).then((response) => {
        setTableData((prevData) => [...prevData, response.data]);
        setFormData({});
      });
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.email}</td>
              <td>
                <button onClick={() => handleEdit(row)}>Edit</button>
                <button onClick={() => handleDelete(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editMode && (
        <form onSubmit={handleFormSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleFormChange}
          />
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleFormChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleFormChange}
          />
          <button type="submit">Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      )}
    </>
  );
};

export default Table;
