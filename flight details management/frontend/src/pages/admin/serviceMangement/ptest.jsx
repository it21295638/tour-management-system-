import React, { useEffect, useState } from "react";
import "../client/client.css";
import axios from "axios";
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useParams} from "react-router-dom";

const Service = () => {
  
  
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [service_id, setService_id] = useState('');
    const [service_category, setService_category] = useState('');
    const [service_description, setService_description] = useState('');
    const [price_title, setPrice_title] = useState('');
    const [price, setPrice] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [itemId, setItemId] = useState();
    // const [searchedClient, setSearchedClient] = useState("");
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/service/all').then((response) => {
          setData(response.data);
        });
      }, []);

      const handleDelete = (item) => {
        console.log(item._id);
        axios.delete(`http://localhost:8000/api/service/${item._id}`)
        .then(() => {
          setData(data.filter((d) => d.id !== item._id));
          
        });
        
      };
       
      const handleEdit = (item) => {
        setIsEditing(true);
        // setItemId(item.id);
        setService_id(item.service_id);
        setService_category(item.service_category);
        setService_description(item.service_description);
        setPrice_title(item.price_title);
        setPrice(item.price);
      };

      const handleUpdate = (event) => {
        event.preventDefault();
        console.log(id)
        axios.put(`http://localhost:8000/api/service/${itemId}`, { service_id, service_category, service_description, price_title, price }).then(() => {
          setData(data.map((item) => (item.id === itemId ? { id: itemId, service_id, service_category, service_description, price_title, price } : item)));
          setIsEditing(false);
          setService_id('');
          setService_category('');
          setService_description('');
          setPrice_title('');
          setPrice('');
        });
      };


      //update start

    //   const handleUpdate = () => {
    //     const data = {
    //       service_id,
    //       service_category,
    //       service_description,
    //       price_title,
    //       price,


    //     }

    //     console.log(id);
    //     axios.put(`http://localhost:8000/api/service/${id}`, data)
    //         .then((res) => {
    //             alert("Update Successful");
                
    //         })
    //         .catch((err) => {
    //             alert("Update Unsuccessful");
    //         })
    //         console.log(id);
    // }


      //update end






    
      const handleCreate = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/service/', { service_id, service_category, service_description, price_title, price }).then((response) => {
          setData([...data, { id: response.data.id, service_id, service_category, service_description, price_title, price }]);
          setService_id('');
          setService_category('');
          setService_description('');
          setPrice_title('');
          setPrice('');
        });
      };





    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        <form onSubmit={isEditing ? handleUpdate : handleCreate}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={service_id} onChange={(e) => setService_id(e.target.value)} />
        <label htmlFor="age">Age:</label>
        <input type="text" id="age" value={service_category} onChange={(e) => setService_category(e.target.value)} />
        <input type="text" id="age" value={service_description} onChange={(e) => setService_description(e.target.value)} />
        <input type="text" id="age" value={price_title} onChange={(e) => setPrice_title(e.target.value)} />
        <input type="text" id="age" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>service_id</th>
            <th>service_id</th>
            <th>service_category</th>
            <th>service_description</th>
            <th>price_title</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.id}</td>
              <td>{item.service_id}</td>
              <td>{item.service_category}</td>
              <td>{item.service_description}</td>
              <td>{item.price_title}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                {/* <button onClick={() => handleUpdate(item)}>Edit</button> */}
                <button onClick={() => handleDelete(item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
           
        </div>
    );
};

export default Service;
