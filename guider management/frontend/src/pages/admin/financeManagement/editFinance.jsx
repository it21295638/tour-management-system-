import React, { useEffect, useState } from "react";
import "../client/client.css";
import axios from "axios";
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';
import { useParams} from "react-router-dom";

const Service = () => {

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [reference, setReference] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [itemId, setItemId] = useState();
    const [formData, setFormData] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { amount, category, type, date, reference, description};
        axios.post('http://localhost:8000/api/finance/', newUser)
            .then(response => console.log(response))
            .catch(error => console.log(error));
            setAmount('');
            setCategory('');
            setType('');
            setDate('');
            setReference('');
            setDescription('');

    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/finance/all')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    const handleDelete = (item) => {
        console.log(item._id);
        axios.delete(`http://localhost:8000/api/finance/${item._id}`)
        .then(() => {
          setData(data.filter((d) => d.id !== item._id));
          
        });
        
      };

      const handleEdit = (item) => {
        setIsEditing(true);
        setItemId(item._id);
        setAmount(item.amount);
        setCategory(item.category);
        setType(item.type);
        setDate(item.date);
        setReference(item.reference);
        setDescription(item.description);
        
        
      };

      const handleUpdate = (event) => {
        event.preventDefault();
        console.log(id)
        
        axios.put(`http://localhost:8000/api/finance/${itemId}`, { amount, category, type, date, reference, description}).then(() => {
          setData(data.map((item) => (item.id === itemId ? { id: itemId, amount, category, type, date, reference, description } : item)));
          setIsEditing(false);
          setAmount('');
          setCategory('');
          setType('');
          setDate('');
          setReference('');
          setDescription('');
        });
      
      };

      const handleCreate = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/finance/', { amount, category, type, date, reference, description }).then((response) => {
          setData([...data, { id: response.data.id, amount, category, type, date, reference, description }]);
          setAmount('');
          setCategory('');
          setType('');
          setDate('');
          setReference('');
          setDescription('');
        });
      };


    const displayAllClients = () => {
        return data.map(user => (
            <tr key={user.id}>

                <td>{user.amount}</td>
                <td>{user.category}</td>
                <td>{user.type}</td>
                <td>{user.date}</td>
                <td>{user.reference}</td>
                <td>{user.description}</td>
                <td>
                <button  className="btn btn-success" onClick={() => handleEdit(user)}>Edit</button>
                {/* <button onClick={() => handleUpdate(item)}>Edit</button> */}
                <button className="btn btn-danger" onClick={() => handleDelete(user)}>Delete</button>
              </td>




            </tr>
        ));
    };


    const generatePDF = () => {
        const specialElementHandlers = {
            '.no-export': function (element, renderer) {
                return true;
            }
        };
        const doc = new jsPDF('p', 'pt', 'a4');

        doc.text(305, 20, 'Client Details', 'center');

        const head = [['ID', 'Amount', 'Category',
            'Type', 'Date', 'Reference', 'Description']];
        const elements = data.map(client => [client._id, client.amount, client.category,
            client.type, client.date, client.reference, client.description]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("clientDetails.pdf");
    }





    return (
        <div>
            <div className="main_container">
                <div className="item fw-bold">Finance Management</div>


                <div className="item">
                    <div className="row mt-5 ps-3">
                        <div className="row">
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                <div className="d-flex justify-content-start align-items-center">
                                        <button onClick={() => {
                                            generatePDF()
                                        }} id="btn-generate-report" className="btn me-3">Generate Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-6">


                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignLabsTable">
                                <thead>
                                    <tr>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Reference</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Action</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayAllClients()}
                                </tbody>
                            </table>
                        </div>


                        <div className="col">
                            <br />  <br />  <br />
                            <h1><b>Edit Finance Details</b></h1>
                            <div className="row mt-5 px-3">



                                <form id="clientForm" onSubmit={isEditing ? handleUpdate : handleCreate}>

                                    <div className="row">
                                        <div className="col d-flex justify-content-end align-items-center">
                                            <div className="col d-flex justify-content-end">

                                                <div>

                                                    <button
                                                        hidden
                                                        className="btn btnEditImg"
                                                        id="btnEditImg"
                                                        type="button"
                                                    >
                                                        <i className="fa-solid fa-pen text-white" />
                                                    </button>
                                                    <button
                                                        hidden
                                                        className="btn btnImgDelete"
                                                        id="btnImgDelete"
                                                        type="button"
                                                    >
                                                        <i className="fa-solid fa-trash-can d-inline text-white" />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>




                                    <div className="row mt-4">
                                        <div className="col">
                                            
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Amount"
                                                value={amount}
                                                onChange={(event) => setAmount(event.target.value)}

                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Category"
                                                value={category}
                                                onChange={(event) => setCategory(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Type"
                                                value={type}
                                                onChange={(event) => setType(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <input
                                            type="date"
                                                className="form-control"
                                                placeholder="Date"
                                                value={date}
                                                onChange={(event) => setDate(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Reference"
                                                value={reference}
                                                onChange={(event) => setReference(event.target.value)}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Description"
                                                value={description}
                                                onChange={(event) => setDescription(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                  

                                   


                                    <div className="row mt-5">
                                        <div className="d-flex justify-content-around align-items-center">
                                            <button
                                                type="submit"
                                                className="btn btnRegister"

                                            >
                                                {isEditing ? 'Update' : 'Create'}
                                            </button>
                                            
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </div>
    );
};

export default Service;
