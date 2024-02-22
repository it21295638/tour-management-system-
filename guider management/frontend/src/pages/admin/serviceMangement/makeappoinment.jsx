import React, { useEffect, useState } from "react";
import "../client/client.css";
import axios from "axios";
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';

const Service = () => {

    const [appo_id, setAppo_id] = useState('');
    const [appo_category, setAppo_category] = useState('');
    const [apppo_description, setApppo_description] = useState('');
    const [appo_date, setAppo_date] = useState('');
    const [appo_time, setAppo_time] = useState('');
    const [data, setData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { appo_id, appo_category, apppo_description, appo_date, appo_time };
        axios.post('http://localhost:8000/api/service/appo', newUser)
            .then(response => console.log(response))
            .catch(error => console.log(error));
            setAppo_id('');
            setAppo_category('');
            setApppo_description('');
            setAppo_date('');
            setAppo_time('');

    };

  

    const handleClear = () => {
        //  clear input value
        setAppo_id('');
        setAppo_category('');
        setApppo_description('');
        setAppo_date('');
        setAppo_time('');
      };

    useEffect(() => {
        axios.get('http://localhost:8000/api/service/all/')
          .then(response => setData(response.data))
          .catch(error => console.log(error))
      }, []);


      const displayAllClients = () => {
        return data.map(user => (
            <tr key={user.id}>
               
                        <td>{user.service_id}</td>
                        <td>{user.service_category}</td>
                        
                        
                    
               
               
            </tr>
                ));
    };





    return (
        <div>
            <div className="main_container">
                <div className="item fw-bold">Make an Appoinment</div>

                
                <div className="item">
                    <div className="row mt-5 ps-3">
                        <div className="row">
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                                <div className="row">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-6">
                        <div className="col">
                        <h1>Create your Appoinment...</h1>
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
                                        <div className="col-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Service Category"
                                                value={appo_category}
                                                onChange={(event) => setAppo_category(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <textarea
                                                className="form-control"
                                                placeholder="Service Description"
                                                value={apppo_description}
                                                onChange={(event) => setApppo_description(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="date"
                                                className="form-control"
                                                placeholder="Appoinment Date"
                                                value={appo_date}
                                                onChange={(event) => setAppo_date(event.target.value)}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="time"
                                                className="form-control"
                                                placeholder="Prefer Time"
                                                value={appo_time}
                                                onChange={(event) => setAppo_time(event.target.value)}
                                            />
                                        </div>
                                    </div>


                                    <div className="row mt-5">
                                        <div className="d-flex justify-content-around align-items-center">
                                            <button
                                                type="submit"
                                                className="btn btn-success"

                                            >
                                                Make an Appoinment
                                            </button>
                                           
                                            <button
                                                
                                                type="button"
                                                className="btn btn-danger"

                                                onClick={handleClear}
                                            >
                                                Clear
                                            </button>
                                            <Link to="/admin/appomgmt">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                
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
                        <div className="col">

                        <h1>Available Services</h1>
                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignLabsTable">
                                <thead>
                                <tr>
                                    
                                    <th scope="col">Sub Service Category</th>
                                    <th scope="col">Service Price</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                {displayAllClients()}
                                </tbody>
                            </table>
                        </div>





                        </div>
                    </div>





                </div>
            </div>
        </div>
    );
};

export default Service;
