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

    const [full_name, setFull_name] = useState('');
    const [delivery_address, setDelivery_address] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [land_mark, setLand_mark] = useState('');
    const [mobile, setMobile] = useState('');
    const [order_no, setOrder_no] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [itemId, setItemId] = useState();
    const [formData, setFormData] = useState({});

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

    useEffect(() => {
        axios.get('http://localhost:8000/api/delivery/all')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    const handleDelete = (item) => {
        console.log(item._id);
        axios.delete(`http://localhost:8000/api/delivery/${item._id}`)
        .then(() => {
          setData(data.filter((d) => d.id !== item._id));
          
        });
        
      };

      const handleEdit = (item) => {
        setIsEditing(true);
        setItemId(item._id);
        setFull_name(item.full_name);
        setDelivery_address(item.delivery_address);
        setCompany_name(item.company_name);
        setLand_mark(item.land_mark);
        setMobile(item.mobile);
        setOrder_no(item.order_no);
        setDate(item.date);
        setStatus(item.status);
        
      };

      const handleUpdate = (event) => {
        event.preventDefault();
        console.log(id)
        
        axios.put(`http://localhost:8000/api/delivery/${itemId}`, { full_name, delivery_address, company_name, land_mark, mobile, order_no, date, status }).then(() => {
          setData(data.map((item) => (item.id === itemId ? { id: itemId, full_name, delivery_address, company_name, land_mark, mobile, order_no, date, status } : item)));
          setIsEditing(false);
          setFull_name('');
          setDelivery_address('');
          setCompany_name('');
          setLand_mark('');
          setMobile('');
          setOrder_no('');
          setDate('');
          setStatus('');
        });
      
      };

      const handleCreate = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/service/', { full_name, delivery_address, company_name, land_mark, mobile, order_no, date, status }).then((response) => {
          setData([...data, { id: response.data.id, full_name, delivery_address, company_name, land_mark, mobile, order_no, date, status }]);
          setFull_name('');
          setDelivery_address('');
          setCompany_name('');
          setLand_mark('');
          setMobile('');
          setOrder_no('');
          setDate('');
          setStatus('');
        });
      };


    const displayAllClients = () => {
        return data.map(user => (
            <tr key={user.id}>

                <td>{user.full_name}</td>
                <td>{user.delivery_address}</td>
                <td>{user.company_name}</td>
                <td>{user.land_mark}</td>
                <td>{user.mobile}</td>
                <td>{user.order_no}</td>
                <td>{user.date}</td>
                <td>{user.status}</td>
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

        const head = [['ID', 'Full Name', 'Delivery Address',
            'Company Name', 'Land Mark', 'Mobile', 'Order No', 'Date', 'Status']];
        const elements = data.map(client => [client._id, client.full_name, client.delivery_address,
            client.company_name, client.land_mark, client.mobile, client.order_no, client.date, client.status]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("clientDetails.pdf");
    }





    return (
        <div>
            <div className="main_container">
                <div className="item fw-bold">Client Management</div>


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
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Delivery Address</th>
                                        <th scope="col">Company Name</th>
                                        <th scope="col">Land Mark</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">Order No</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Status</th>
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
                            <h1><b>Edit Service Details</b></h1>
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

                                    <div className="row mt-4">
                                        <div className="col-6">
                                        <select id="inputState" class="form-control" value={status} onChange={(event) => { setStatus(event.target.value); }} >
                                        <option selected>Choose Status</option>
                                        <option>Pending</option>
                                        <option>Process</option>
                                        <option>Complete</option>
                                    </select>
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
