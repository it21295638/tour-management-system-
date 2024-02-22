import React, { useEffect, useState } from "react";
import "../client/client.css";
import axios from "axios";
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';

const Service = () => {

    const [new_service_id, setService_id] = useState('');
    const [new_service_category, setService_category] = useState('');
    const [new_service_description, setService_description] = useState('');
    const [new_price_title, setPrice_title] = useState('');
    const [new_price, setPrice] = useState('');
    const [data, setData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { new_service_id, new_service_category, new_service_description, new_price_title, new_price };
        axios.post('http://localhost:8000/api/service/new', newUser)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        setService_id('');
        setService_category('');
        setService_description('');
        setPrice_title('');
        setPrice('');

    };

  

    const handleClear = () => {
        //  clear input value
        setService_id('');
        setService_category('');
        setService_description('');
        setPrice_title('');
        setPrice('');
      };

    useEffect(() => {
        axios.get('http://localhost:8000/api/service/new/all')
          .then(response => setData(response.data))
          .catch(error => console.log(error))
      }, []);


      const displayAllClients = () => {
        return data.map(user => (
            <tr key={user.id}>
               
                        <td>{user.new_service_id}</td>
                        <td>{user.new_service_category}</td>
                        
                        
                    
               
               
            </tr>
                ));
    };





    return (
        <div>
            <div className="main_container">
                <div className="item fw-bold">Request New Service</div>

                
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
                        <h1>Service Suggestion</h1>
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
                                                placeholder="Service ID"
                                                value={new_service_id}
                                                onChange={(event) => setService_id(event.target.value)}

                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Service Category"
                                                value={new_service_category}
                                                onChange={(event) => setService_category(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <textarea
                                                className="form-control"
                                                placeholder="Service Description"
                                                value={new_service_description}
                                                onChange={(event) => setService_description(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Price Title"
                                                value={new_price_title}
                                                onChange={(event) => setPrice_title(event.target.value)}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Price"
                                                value={new_price}
                                                onChange={(event) => setPrice(event.target.value)}
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
                                            <Link to="/admin/update">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                
                                                onClick={() => { }}
                                            >
                                                View
                                            </button>
                                            </Link>
                                            <button
                                                
                                                type="button"
                                                className="btn btn-danger"

                                                onClick={handleClear}
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className="col">

                        <h1>Current Service Suggestiones</h1>
                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignLabsTable">
                                <thead>
                                <tr>
                                    
                                    <th scope="col">Service Category</th>
                                    <th scope="col">Service Description</th>
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
