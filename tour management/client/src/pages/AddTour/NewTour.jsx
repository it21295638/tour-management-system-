 import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Autocomplete, Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { MuiChipsInput } from 'mui-chips-input'
import './NewTour.css'
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';

function NewTour() {
    const [countries, setCountries] = useState()
    const [title, setTitle] = useState()
    const [country, setCountry] = useState()
    const [durationCount, setDurationCount] = useState()
    const [duration, setDuration] = useState()
    const [amount, setAmount] = useState()
    const [attractions, setAttractions] = useState([])
    const [includes, setIncludes] = useState([])
    const [description, setDescription] = useState()
    const [thumbnail, setThumbnail] = useState()
    const [image, setImage] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        fetchCountries()
    }, [])

    async function fetchCountries() {
        await axios.get("https://restcountries.com/v3.1/all").then((res)=>{
            setCountries(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const handleAttractions = (attractionsArray) => {
        setAttractions(attractionsArray)
    }

    const handleIncludes = (includesArray) => {
        setIncludes(includesArray)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const data = { title, country, durationCount, duration, amount, attractions, includes, description, thumbnail, image}
        
        const config = {
            headers: {
                "content-Type": "application/json",
            },
        };

        axios.post(`http://localhost:8080/tour/`, data, config).then((res) => {
            alert("Tour published successfully") 
            navigate('/tours')
        }).catch((error) => {
            alert("Failed to publish tour")
            console.log(error)
        })
    }
    
    return (
        <div className="container" align="center">
            <form onSubmit={handleSubmit} className="form-card" encType="multipart/form-data">
                <h3>Create a new tour package</h3>
                <div className="row mt-5">
                    <div className="col-xl-12">
                        <TextField 
                            className='mb-4'
                            label="Package title"
                            placeholder='Enter a title for the tour package'
                            fullWidth required
                            onChange={(e) => {setTitle(e.target.value) }}
                        />
                    </div>
                    <div className="col-xl-4">
                        <Autocomplete
                            className='mb-4' required
                            onChange={(e,value) => {setCountry(value) }}
                            options={countries?.map((country) => country.name.common)}
                            renderInput={(params) => <TextField {...params} label="Country"/>}
                        />
                    </div>   
                    <div className="col-xl-3">
                        <TextField 
                            className='mb-4'
                            label="Package duration"
                            placeholder='Enter the duration of tour'
                            fullWidth required
                            onChange={(e) => {setDurationCount(e.target.value) }}
                        />
                    </div>
                    <div className="col-xl-2">
                        <FormControl fullWidth>
                            <InputLabel>Duration</InputLabel>
                            <Select label="Duration" required onChange={(e) => {setDuration(e.target.value) }}>
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
                                label="Amount" required
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
                            className="mt-2 mb-4"
                            label="Description"
                            multiline rows={4}
                            fullWidth required
                            onChange={(e) => {setDescription(e.target.value) }}
                        />
                    </div>
                    <div className="col-xl-6 mb-4">
                        <p><b>Upload Thumbnail Image</b><PhotoCamera /></p> 
                        <FileBase64
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setThumbnail(base64)}
                        />
                        <p>please upload a square image</p> 
                    </div>
                    <div className="col-xl-6 mb-4">
                        <p><b>Upload Tour Image</b><PhotoCamera /></p> 
                        <FileBase64
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setImage(base64)}
                        />
                        <p>please upload a landscape image</p> 
                    </div>
                </div>
                <center>
                    <button type='submit' style={{ width: '300px' }} className="btn btn-blue mt-4">
                        Publish Tour Package
                    </button>
                </center>
            </form>
        </div>
    )
}

export default NewTour