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

    const [flight_no, setFlight_no] = useState('');
    const [flight_name, setFlight_name] = useState('');
    const [flight_type, setFlight_type] = useState('');
    const [pasengers, setPasengers] = useState('');
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [itemId, setItemId] = useState();
    const [formData, setFormData] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { flight_no, flight_name, flight_type, pasengers, departure, arrival};
        axios.post('http://localhost:8000/api/flight/', newUser)
            .then(response => console.log(response))
            .catch(error => console.log(error));
            setFlight_no('');
            setFlight_name('');
            setFlight_type('');
            setPasengers('');
            setDeparture('');
            setArrival('');

    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/flight/all')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    const handleDelete = (item) => {
        console.log(item._id);
        axios.delete(`http://localhost:8000/api/flight/${item._id}`)
        .then(() => {
          setData(data.filter((d) => d.id !== item._id));
          
        });
        
      };

      const handleEdit = (item) => {
        setIsEditing(true);
        setItemId(item._id);
        setFlight_no(item.flight_no);
        setFlight_name(item.flight_name);
        setFlight_type(item.flight_type);
        setPasengers(item.pasengers);
        setDeparture(item.departure);
        setArrival(item.arrival);
        
        
      };

      const handleUpdate = (event) => {
        event.preventDefault();
        console.log(id)
        
        axios.put(`http://localhost:8000/api/flight/${itemId}`, { flight_no, flight_name, flight_type, pasengers, departure, arrival}).then(() => {
          setData(data.map((item) => (item.id === itemId ? { id: itemId, flight_no, flight_name, flight_type, pasengers, departure, arrival } : item)));
          setIsEditing(false);
          setFlight_no('');
          setFlight_name('');
          setFlight_type('');
          setPasengers('');
          setDeparture('');
          setArrival('');
        });
      
      };

      const handleCreate = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/flight/', { flight_no, flight_name, flight_type, pasengers, departure, arrival}).then((response) => {
          setData([...data, { id: response.data.id, flight_no, flight_name, flight_type, pasengers, departure, arrival }]);
          setFlight_no('');
          setFlight_name('');
          setFlight_type('');
          setPasengers('');
          setDeparture('');
          setArrival('');
        });
      };


    const displayAllClients = () => {
        return data.map(user => (
            <tr key={user.id}>

                <td>{user.flight_no}</td>
                <td>{user.flight_name}</td>
                <td>{user.flight_type}</td>
                <td>{user.pasengers}</td>
                <td>{user.departure}</td>
                <td>{user.arrival}</td>
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

        const head = [['ID', 'Flight No', 'Flight Name',
            'Flight Type', 'Passenger Count', 'Departure Time', 'Arrival Time']];
        const elements = data.map(client => [client._id, client.flight_no, client.flight_name,
            client.flight_type, client.pasengers, client.departure, client.arrival]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("clientDetails.pdf");
    }





    return (
        <div>
            <div className="main_container">
                <div className="item fw-bold">Flight Management</div>


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
                                        <th scope="col">Flight No</th>
                                        <th scope="col">Flight Name</th>
                                        <th scope="col">Flight Type</th>
                                        <th scope="col">Passenger Count</th>
                                        <th scope="col">Departure Time</th>
                                        <th scope="col">Arrival Time</th>
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
                            <h1><b>Edit Flight  Details</b></h1>
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
                                                placeholder="Flight No"
                                                value={flight_no}
                                                onChange={(event) => setFlight_no(event.target.value)}

                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Flight Name"
                                                value={flight_name}
                                                onChange={(event) => setFlight_name(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Flight Type"
                                                value={flight_type}
                                                onChange={(event) => setFlight_type(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <input
                                            type="number"
                                                className="form-control"
                                                placeholder="passenger count"
                                                value={pasengers}
                                                onChange={(event) => setPasengers(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="time"
                                                className="form-control"
                                                placeholder="Departrure Time"
                                                value={departure}
                                                onChange={(event) => setDeparture(event.target.value)}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="time"
                                                className="form-control"
                                                placeholder="Arrival Time"
                                                value={arrival}
                                                onChange={(event) => setArrival(event.target.value)}
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
