import React, { useEffect, useState } from "react";
import "../client/client.css";
import axios from "axios";
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';

import Footer from "./footer/Footer";

const Service = () => {

    const [full_name, setFull_name] = useState('');
    const [delivery_address, setDelivery_address] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [land_mark, setLand_mark] = useState('');
    const [mobile, setMobile] = useState('');
    const [order_no, setOrder_no] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('pending');
    const [data, setData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { full_name, delivery_address, company_name, land_mark, mobile, order_no, date, status};
        axios.post('http://localhost:8000/api/delivery/', newUser)
            .then(response => console.log(response))
            .catch(error => console.log(error));
            setFull_name('');
            setDelivery_address('');
            setCompany_name('');
            setLand_mark('');
            setMobile('');
            setOrder_no('');
            setDate('');
            setStatus('');

    };

  

    const handleClear = () => {
        //  clear input value
        setFull_name('');
        setDelivery_address('');
        setCompany_name('');
        setLand_mark('');
        setMobile('');
        setOrder_no('');
        setDate('');
        setStatus('');
      };

    useEffect(() => {
        axios.get('http://localhost:8000/api/delivery/all')
          .then(response => setData(response.data))
          .catch(error => console.log(error))
      }, []);


     





    return (
        <div>
            <div className="main_container">
                <br />
                <br />
                <div className="item fw-bold">Delivery Management</div>

                
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
                        <h1>Add new Delivery</h1>
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
                                                placeholder="Full Name"
                                                value={full_name}
                                                onChange={(event) => setFull_name(event.target.value)}

                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Delivery Address"
                                                value={delivery_address}
                                                onChange={(event) => setDelivery_address(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Delivery Company Name"
                                                value={company_name}
                                                onChange={(event) => setCompany_name(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <textarea
                                                className="form-control"
                                                placeholder="Specific Land Mark"
                                                value={land_mark}
                                                onChange={(event) => setLand_mark(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Mobile No"
                                                value={mobile}
                                                onChange={(event) => setMobile(event.target.value)}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Order No"
                                                value={order_no}
                                                onChange={(event) => setOrder_no(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-6">
                                            <input
                                                type="Date"
                                                className="form-control"
                                                placeholder="Delivery Date"
                                                value={date}
                                                onChange={(event) => setDate(event.target.value)}
                                            />
                                        </div>
                                    </div>


                                    <div className="row mt-5">
                                        <div className="d-flex justify-content-around align-items-center">
                                            <button
                                                type="submit"
                                                className="btn btn-success"

                                            >
                                                Add to Service
                                            </button>
                                            <button
                                                
                                                type="button"
                                                className="btn btn-danger"

                                                onClick={handleClear}
                                            >
                                                Clear
                                            </button>
                                            <Link to="/admin/editd">
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
                     
                    </div>





                </div>
            </div>
           
            <Footer />
        </div>
    );
};

export default Service;
