import React, { useEffect, useState } from "react";
import "../client/client.css";
import axios from "axios";
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';



const Service = () => {

    const [guidence_id, setGuidence_id] = useState('');
    const [guidence_name, setGuidence_name] = useState('');
    const [guidence_age, setGuidence_age] = useState('');
    const [guidence_nic, setGuidence_nic] = useState('');
    const [guidence_description, setGuidence_description] = useState('');
    const [data, setData] = useState([]);

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



    const handleClear = () => {
        //  clear input value
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








    return (
        <div>
            <div className="main_container">
                <br />
                <br />
                <div className="item fw-bold">Guide Management</div>


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
                            <h1>Add Guide Details</h1>
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
                                                placeholder="Enter Guide No"
                                                value={guidence_id}
                                                onChange={(event) => setGuidence_id(event.target.value)}

                                            />
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Guide Name"
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
                                                placeholder="Enter Guide Age"
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
                                                placeholder="Enter Guide NIC"
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
                                                placeholder="Enter About Guide"
                                                value={guidence_description}
                                                onChange={(event) => setGuidence_description(event.target.value)}
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
                                            <Link to="/admin/guideedit">
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
