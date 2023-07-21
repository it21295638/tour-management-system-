import { Box, Chip, FormControl, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Rating, Select, Stack, TextField } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Tour.css'
import { MuiChipsInput } from 'mui-chips-input';

function Tour() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'fitContent',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const [isAdmin, setIsAdmin] = useState(true)
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState()
    const [country, setCountry] = useState()
    const [durationCount, setDurationCount] = useState()
    const [duration, setDuration] = useState()
    const [rating, setRating] = useState()
    const [amount, setAmount] = useState()
    const [attractions, setAttractions] = useState([])
    const [includes, setIncludes] = useState([])
    const [description, setDescription] = useState()
    const [image, setImage] = useState()

    const { id } = useParams()
    const navigate = useNavigate()

    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false);  getTourById()}

    useEffect(() => {
        getTourById()
    }, [])

    function getTourById() {
        axios.get(`http://localhost:8080/tour/${id}`).then((res)=>{
            setRating(res.data.rating)
            setTitle(res.data.title)
            setCountry(res.data.country)
            setDurationCount(res.data.durationCount)
            setDuration(res.data.duration)
            setAmount(res.data.amount)
            setAttractions(res.data.attractions)
            setIncludes(res.data.includes)
            setDescription(res.data.description)
            setImage(res.data.image)
        }).catch((error) => {
            alert("Failed to fetch tour")
            console.log(error)
        })
    }

    const handleAttractions = (attractionsArray) => {
        setAttractions(attractionsArray)
    }

    const handleIncludes = (includesArray) => {
        setIncludes(includesArray)
    }

    async function handleUpdate(e) {
        e.preventDefault()

        const data = { title, durationCount, duration, amount, attractions, includes, description }
        
        const config = {
            headers: {
                "content-Type": "application/json",
            },
        };

        await axios.put(`http://localhost:8080/tour/${id}`, data, config).then((res) => {
            alert("Tour updated successfully") 
            handleClose()
        }).catch((error) => {
            alert("Failed to update tour")
        })
    }

    async function deleteTourById(id){
        const config = {
            headers: {
                "content-Type": "application/json"
            },
        };

        if (window.confirm('Are you sure?\nThis action cannot be undone')) {
            await axios.delete(`http://localhost:8080/tour/${id}`, config).then(() => {
                alert('Tour deleted successfully')
                navigate('/tours')
            }).catch((error) => {
                alert(error.message)
            })
        }
    }

    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col-xl-8 mb-4'>
                    {image ? (
                        <img alt='slide-show' src={image} className='slide-show'/>
                    ) : (
                        <img alt='slide-show' src='/images/slideShow.jpg' className='slide-show'/>
                    )}
                </div>
                <div className='col-xl-4 mb-4 text-start'>
                    <h1>{title}</h1>
                    <div className='d-flex justify-content-around'>
                        <b>{`${durationCount} ${duration}`}</b>
                        <b>{country}</b>
                        <Rating size='large' readOnly value={rating} />
                    </div>
                    <div className='my-4'>
                        <p>Places you will visit</p>
                        <Stack direction="row" spacing={1}>
                            {attractions.map((attraction, index) => {
                                return(
                                    <Chip key={index} label={attraction} />
                                )
                            })}
                        </Stack>
                    </div>
                    <div className='mb-4'>
                        <p>Package includes</p>
                        <Stack direction="row" spacing={1}>
                            {includes.map((include, index) => {
                                return(
                                    <Chip icon={<CheckCircleIcon color='primary' />} key={index} label={include} />
                                )
                            })}
                        </Stack>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <p className='mb-0 text-muted'>from</p>
                            <div className='d-flex'>
                                <h5>us</h5>
                                <h2>${amount}.00</h2>
                            </div>
                        </div>
                        <Link to={`/payment/tour/${id}`} className="mt-4 btn btn-blue">Book Tour</Link>
                    </div>
                </div>
            </div>
            <hr></hr>
            <h3 className='mt-5'>Description</h3>
            <p>{description}</p>
            <div className='mt-5'>
                {isAdmin && (
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-red mx-2" onClick={() => {deleteTourById(id)}}>Delete Tour</button>
                        <button className="btn btn-blue mx-2" onClick={handleOpen}>Edit Tour</button>
                    </div>
                )}
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <form onSubmit={handleUpdate}>
                        <h3>Edit tour package</h3>
                        <div className="row mt-5">
                            <div className="col-xl-12">
                                <TextField 
                                    className='mb-4'
                                    label="Package title"
                                    placeholder='Enter a title for the tour package'
                                    fullWidth required value={title}
                                    onChange={(e) => {setTitle(e.target.value) }}
                                />
                            </div>  
                            <div className="col-xl-3">
                                <TextField
                                    className='mb-4'
                                    label="Package duration"
                                    placeholder='Enter the duration of tour'
                                    fullWidth required value={durationCount}
                                    onChange={(e) => {setDurationCount(e.target.value) }}
                                />
                            </div>
                            <div className="col-xl-2">
                                <FormControl fullWidth>
                                    <InputLabel>Duration</InputLabel>
                                    <Select
                                        label="Duration" value={duration} required
                                        onChange={(e) => { setDuration(e.target.value) }}
                                    >
                                        <MenuItem value={'Days'}>Days</MenuItem>
                                        <MenuItem value={'Weeks'}>Weeks</MenuItem>
                                        <MenuItem value={'Months'}>Months</MenuItem>
                                        <MenuItem value={'Years'}>Years</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-xl-3">
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel>Amount</InputLabel>
                                    <OutlinedInput
                                        className='mb-2'
                                        placeholder='Enter the tour price'
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount" required value={amount}
                                        onChange={(e) => {setAmount(e.target.value) }}
                                    />
                                </FormControl>
                            </div>
                            <div className="col-xl-6">
                                <MuiChipsInput
                                    className="mt-2 mb-4" fullWidth value={attractions} label="Attractions"
                                    onChange={handleAttractions}
                                />
                            </div>
                            <div className="col-xl-6">
                                <MuiChipsInput
                                    className="mt-2 mb-4" fullWidth value={includes} label="Includes"
                                    onChange={handleIncludes}
                                />
                            </div>
                            <div className="col-xl-12">
                                <TextField
                                    label="Description"
                                    multiline rows={4}
                                    fullWidth required value={description}
                                    onChange={(e) => {setDescription(e.target.value) }}
                                />
                            </div>
                        </div>
                        <center>
                            <button type='submit' style={{ width: '300px' }} className="btn btn-blue mt-4">
                                Update Tour Package
                            </button>
                        </center>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default Tour