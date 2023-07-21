import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import './TourCard.css'

function Tour(props) {
    return (
        <div className="tour-card">
            {props.tour.thumbnail ? (
                <img src={props.tour.thumbnail} alt="tour" />
            ) : (
                <img src='images/thumbnail.jpg' alt="tour" />
            )}
            
            <h5 className="mt-3">{props.tour.title}</h5> 
            <Rating value={props.tour.rating} readOnly />
            <div className="row">
                <div className="col-xl-6">
                    <p className="text-muted mb-0">Tour Length</p>
                    <b>{`${props.tour.durationCount} ${props.tour.duration}`}</b>
                </div>
                <div className="col-xl-6 align-self-center">
                    <p className="text-muted mb-0">Starting from</p>
                    <b>${props.tour.amount}.00</b>
                </div>
            </div>
            <Link to={`/tour/${props.tour._id}`} className="btn btn-blue mt-3">View Tour</Link>
        </div>
    )
}

export default Tour