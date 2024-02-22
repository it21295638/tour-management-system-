import React, { useEffect, useState } from "react";
import "../client/client.css";
import axios from "axios";
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';



const Service = () => {

    const [flight_no, setFlight_no] = useState('');
    const [flight_name, setFlight_name] = useState('');
    const [flight_type, setFlight_type] = useState('');
    const [pasengers, setPasengers] = useState('');
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [data, setData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { flight_no, flight_name, flight_type, pasengers, departure, arrival };
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



    const handleClear = () => {
        //  clear input value
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








    return (
        <div>
            <div className="main_container">
                <br />
                <br />
                <div className="item fw-bold">Flight Management</div>


                <div className="item">
                    <div className="row mt-5 ps-3">
                        <div className="row">
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                                <div className="row">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-9">
                        <div className="col">
                            <h1>Add Flight Details</h1>
                            <div className="row mt-5 px-3">



                                <form id="clientForm" onSubmit={handleSubmit}>

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
                                                placeholder="Enter Flight No"
                                                value={flight_no}
                                                onChange={(event) => setFlight_no(event.target.value)}

                                            />
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Flight Name"
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
                                                placeholder="Enter Flight Type"
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
                                                placeholder="Enter Passenger Count"
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
                                                placeholder="Enter Departure Time"
                                                value={departure}
                                                onChange={(event) => setDeparture(event.target.value)}
                                            />
                                        </div>

                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="time"
                                                className="form-control"
                                                placeholder="Enter Arrival Time"
                                                value={arrival}
                                                onChange={(event) => setArrival(event.target.value)}
                                            />
                                        </div>
                                    </div>




                                    <div className="row mt-5">
                                        <div className="d-flex justify-content-around align-items-center">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"

                                            >
                                                Submit Details
                                            </button>
                                            <button

                                                type="button"
                                                className="btn btn-danger"

                                                onClick={handleClear}
                                            >
                                                Clear
                                            </button>
                                            <Link to="/admin/editflight">
                                                <button
                                                    type="button"
                                                   
                                                    className="btn btn-success"

                                                    onClick={() => { }}
                                                >
                                                    View
                                                </button>
                                            </Link>

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
