import React, { useEffect, useState } from "react";
import "../client/client.css";
import axios from "axios";
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';

const Service = () => {

    const [service_id, setService_id] = useState('');
    const [service_category, setService_category] = useState('');
    const [service_description, setService_description] = useState('');
    const [price_title, setPrice_title] = useState('');
    const [price, setPrice] = useState('');
    // const [searchedClient, setSearchedClient] = useState("");
    const [data, setData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { service_id, service_category, service_description, price_title, price };
        axios.post('http://localhost:8000/api/service/', newUser)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        setService_id('');
        setService_category('');
        setService_description('');
        setPrice_title('');
        setPrice('');

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
                        <td>{user.service_description}</td>
                        <td>{user.price_title}</td>           
                        <td>{user.price}</td>
                        
                    
               
               
            </tr>
                ));
    };



 

    //search service
    const searchClient = () => {
        if (service_id === null || service_id === undefined || service_id === "") {
            alert("Please insert the service ID");
        } else {
            axios.get(`http://localhost:8000/api/service/${service_id}`).then((response) => {
                let searchedClient = [];
                searchedClient.push(response.data.data)
                setData(searchedClient);
            })
        }
    };




    return (
        <div>
            <div className="main_container">
                <div className="item fw-bold">Client Management</div>

                
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
                        <h1>Update Service Details</h1>
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
                                                value={service_id}
                                                onChange={(event) => setService_id(event.target.value)}

                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Service Category"
                                                value={service_category}
                                                onChange={(event) => setService_category(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <textarea
                                                className="form-control"
                                                placeholder="Service Description"
                                                value={service_description}
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
                                                value={price_title}
                                                onChange={(event) => setPrice_title(event.target.value)}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Price"
                                                value={price}
                                                onChange={(event) => setPrice(event.target.value)}
                                            />
                                        </div>
                                    </div>


                                    <div className="row mt-5">
                                        <div className="d-flex justify-content-around align-items-center">
                                            <button
                                                type="submit"
                                                className="btn btnRegister"

                                            >
                                                Add to Service
                                            </button>
                                            <Link to="/test" >
                                            <button
                                                type="button"
                                                className="btn btnUpdate"
                                                
                                            >
                                                Update
                                            </button>
                                           </Link>
                                            <button
                                                onClick={() => { }}
                                                type="button"
                                                className="btn btnDelete"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                        {/* <div className="col"> */}

                        

                        <div className="col-6">
                            <div className="d-flex justify-content-end align-items-center">
                                <div className="d-flex justify-content-center align-items-center">
                                    <input id="searchID" type="text" className="form-control col-8 me-5"
                                           placeholder="ID" onChange={(e) => {
                                            setService_id(e.target.value)
                                    }} value={service_id}/>
                                </div>
                                <div>
                                    <input type="button" className="form-control btnSearch text-white"
                                           defaultValue="Search" onClick={() => {
                                        searchClient()
                                    }}/>
                                </div>
                            </div>
                        </div>
                        


                        <h1>Customers Suggestion</h1>
                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignLabsTable">
                                <thead>
                                <tr>
                                    
                                    <th scope="col">Service ID</th>
                                    <th scope="col">Service Category</th>
                                    <th scope="col">Service Description</th>
                                    <th scope="col">Price Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                {displayAllClients()}
                                </tbody>
                            </table>
                        </div>





                        {/* </div> */}
                    </div>





                </div>
            </div>
        </div>
    );
};

export default Service;
