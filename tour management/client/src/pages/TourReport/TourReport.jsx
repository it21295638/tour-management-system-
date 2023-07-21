import { Button, Rating } from '@mui/material';
import { useReactToPrint } from "react-to-print";
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

function TourReport() {
    const [tours, setTours] = useState([])
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const componentRef = useRef();


    useEffect(() => {
        getTours()
    }, [])

    async function getTours() {
        await axios.get(`http://localhost:8080/tour/`).then((res)=>{
            setTours(res.data)
        }).catch((error) => {
            alert("Failed to fetch tours")
            console.log(error)
        })
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="container">
            <div id="report" ref={componentRef}>
            <div className="mb-5 d-flex justify-content-between">
                <h3 className="page-title">Tour Report</h3>
                <h3 className="page-title">As at - {`${date}/${month}/${year}`}</h3>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope='col'>Title</th>
                        <th scope='col'>Country</th>
                        <th scope='col'>Duration</th>
                        <th scope='col'>Attractions</th>
                        <th scope='col'>Includes</th>
                        <th scope='col'>Rating</th>
                        <th scope='col'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                {tours?.map((tour) => {
                    return (
                        <tr className='p-5 hover align-middle'>
                            <td>
                                <p>{tour.title}</p>
                            </td>
                            <td>
                                <p>{tour.country}</p> 
                            </td>
                            <td>
                                <p>{tour.durationCount} {tour.duration}</p>
                            </td>
                            <td>
                                <p>{tour.attractions.join(', ')}</p>
                            </td>
                            <td>
                                <p>{tour.includes.join(', ')}</p>
                            </td>
                            <td>
                                <Rating value={tour.rating} readOnly />
                            </td>
                            <td>
                                <p>${tour.amount}.00</p>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>               
            </div>
            <hr></hr>
            <Button variant="contained" className="mb-4" disableElevation size="large" onClick={handlePrint}
                style={{ color: 'white' }} endIcon={<CloudDownloadIcon/>}>
                Download Report
            </Button>

        </div>
    )
}

export default TourReport