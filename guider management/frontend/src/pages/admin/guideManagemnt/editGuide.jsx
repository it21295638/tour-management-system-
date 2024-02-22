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

    const [guidence_id, setGuidence_id] = useState('');
    const [guidence_name, setGuidence_name] = useState('');
    const [guidence_age, setGuidence_age] = useState('');
    const [guidence_nic, setGuidence_nic] = useState('');
    const [guidence_description, setGuidence_description] = useState('');
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [itemId, setItemId] = useState();
    const [formData, setFormData] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { guidence_id, guidence_name, guidence_age, guidence_nic, guidence_description};
        axios.post('http://localhost:8000/api/guide/', newUser)
            .then(response => console.log(response))
            .catch(error => console.log(error));
            setGuidence_id('');
            setGuidence_name('');
            setGuidence_age('');
            setGuidence_nic('');
            setGuidence_description('');

    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/guide/all')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    const handleDelete = (item) => {
        console.log(item._id);
        axios.delete(`http://localhost:8000/api/guide/${item._id}`)
        .then(() => {
          setData(data.filter((d) => d.id !== item._id));
          
        });
        
      };

      const handleEdit = (item) => {
        setIsEditing(true);
        setItemId(item._id);
        setGuidence_id(item.guidence_id);
        setGuidence_name(item.guidence_name);
        setGuidence_age(item.guidence_age);
        setGuidence_nic(item.guidence_nic);
        guidence_description(item.guidence_description);
        
        
        
      };

      const handleUpdate = (event) => {
        event.preventDefault();
        console.log(id)
        
        axios.put(`http://localhost:8000/api/guide/${itemId}`, { guidence_id, guidence_name, guidence_age, guidence_nic, guidence_description}).then(() => {
          setData(data.map((item) => (item.id === itemId ? { id: itemId, guidence_id, guidence_name, guidence_age, guidence_nic, guidence_description } : item)));
          setIsEditing(false);
          setGuidence_id('');
          setGuidence_name('');
          setGuidence_age('');
          setGuidence_nic('');
          setGuidence_description('');
        });
      
      };

      const handleCreate = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/guide/', { guidence_id, guidence_name, guidence_age, guidence_nic, guidence_description}).then((response) => {
          setData([...data, { id: response.data.id, guidence_id, guidence_name, guidence_age, guidence_nic, guidence_description }]);
          setGuidence_id('');
          setGuidence_name('');
          setGuidence_age('');
          setGuidence_nic('');
          setGuidence_description('');
        });
      };


    const displayAllClients = () => {
        return data.map(user => (
            <tr key={user.id}>

                <td>{user.guidence_id}</td>
                <td>{user.guidence_name}</td>
                <td>{user.guidence_age}</td>
                <td>{user.guidence_nic}</td>
                <td>{user.guidence_description}</td>
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

        const head = [['ID', 'Guide ID', 'Guide Name',
            'Guide Age', 'Guide NIC', 'Guide Description']];
        const elements = data.map(client => [client._id, client.guidence_id, client.guidence_name,
            client.guidence_age, client.guidence_nic, client.guidence_description]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("clientDetails.pdf");
    }





    return (
        <div>
            <div className="main_container">
                <div className="item fw-bold">Guider Management</div>


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
                                        <th scope="col">Guide ID</th>
                                        <th scope="col">Guide Name</th>
                                        <th scope="col">Guide Age</th>
                                        <th scope="col">Guide NIC</th>
                                        <th scope="col">Guide Description</th>
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
                            <h1><b>Edit Guide Details</b></h1>
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
                                                placeholder="Guide ID"
                                                value={guidence_id}
                                                onChange={(event) => setGuidence_id(event.target.value)}

                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Guide Name"
                                                value={guidence_name}
                                                onChange={(event) => setGuidence_name(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Guide Age "
                                                value={guidence_age}
                                                onChange={(event) => setGuidence_age(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <input
                                            type="text"
                                                className="form-control"
                                                placeholder="Guide NIC"
                                                value={guidence_nic}
                                                onChange={(event) => setGuidence_nic(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Guide Description"
                                                value={guidence_description}
                                                onChange={(event) => setGuidence_description(event.target.value)}
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
