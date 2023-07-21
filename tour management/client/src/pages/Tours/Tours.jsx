import { Button, FormControl, FormLabel, InputLabel, MenuItem, Select, Slider, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TourCard from '../../components/TourCard/TourCard'
import './Tours.css'

function Tours() {
    const [tours, setTours] = useState([])
    const [filterCriteria, setFilterCriteria] = useState({
        title: '',
        country: '',
        duration: '',
        durationCount: '',
    });

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

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterCriteria((prevFilterCriteria) => ({
            ...prevFilterCriteria,
            [name]: value,
        }));
    };

    const filteredData = tours.filter((tour) => {
        const titleMatch = tour.title.toLowerCase().includes(filterCriteria.title.toLowerCase());
        const countryMatch = tour.country.toLowerCase().includes(filterCriteria.country.toLowerCase());
        const durationMatch = filterCriteria.duration === '' || tour.duration === filterCriteria.duration;
        const dCountMatch = filterCriteria.durationCount === '' || tour.durationCount === filterCriteria.durationCount;
        return titleMatch && countryMatch && durationMatch && dCountMatch;
    });
    
    return (
        <div>
            <form className='row filter-area'>
                <div className='col-xl-3'>
                    <TextField 
                        label="Search title" size='small' name='title'
                        placeholder='search title'
                        fullWidth value={filterCriteria.title}
                        onChange={ handleFilterChange }
                    />
                </div>
                <div className='col-xl-2'>
                    <TextField 
                        label="Search country" size='small' name='country'
                        placeholder='search country' 
                        fullWidth value={filterCriteria.country}
                        onChange={ handleFilterChange }
                    />
                </div>
                <div className='d-flex justify-content-between pt-2 col-xl-3'>
                    <FormLabel>Tour length</FormLabel>
                    <Slider
                        style={{ width: '280px' }} min={0} max={30} valueLabelDisplay="auto"
                        onChange={handleFilterChange} name='durationCount'
                    />
                </div>
                <div className='col-xl-1'>
                    <FormControl fullWidth>
                        <InputLabel size='small'>Duration</InputLabel>
                        <Select
                            value={filterCriteria.duration}
                            size='small' label="Duration" name='duration'
                            onChange={ handleFilterChange }
                        >
                            <MenuItem value={'Days'}>Days</MenuItem>
                            <MenuItem value={'Weeks'}>Weeks</MenuItem>
                            <MenuItem value={'Months'}>Months</MenuItem>
                            <MenuItem value={'Years'}>Years</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='col-xl-1'>
                    <Button type='submit' variant="contained" color="success">Search</Button>
                </div>
                <div className='col-xl-2'>
                    <Button onClick={() => setFilterCriteria({title: '',country: '',duration: '',durationCount: '',})} variant="outlined" color="error">Reset Filters</Button>
                </div>
            </form>
            <div className='mx-5 d-flex justify-content-between'>
                <Link className='btn btn-blue my-5' to='/new_tour'>Add new tour</Link>
                <h1 className="text-uppercase my-5">Our tour packages</h1>
                <Link className='btn btn-blue my-5' to='/tour_report'>View Report</Link>
            </div>
            <div className='container page-content-tours'>
                {filteredData.map((tour, index) => {
                    return (
                        <TourCard key={index} tour={tour}/>
                    )
                })}
            </div>
        </div >
    )
}

export default Tours