const FlightModel = require("../model/FlightModel");


const addFlight = (req, res) => {

    const {flight_no,flight_name,flight_type,pasengers,departure,arrival} = req.body;

    const addflight = new FlightModel({
        flight_no,
        flight_name,
        flight_type,
        pasengers,
        departure,
        arrival,
    });

//addFlight
    addflight.save().then((makeflight)=>{
        res.json(makeflight);
    }).catch((err)=>{
        console.log(console.error);     
    });
};

//getAllFlight
const getFlight = async (req, res) => {
  
    try{
      const cors = await FlightModel.find();
      res.json(cors);
  
    }catch(error){
      res.status(400).json(error);
    }
  }

//update
  const UpdateFlight = async (req, res) => {
    const FlightID = req.params.id;
  
    try {
      const cRs = await FlightModel.findById(FlightID);
  
      if(!cRs){
        return res.status(404).json("There is a no Flight ID");
      }
  
      const {flight_no,flight_name,flight_type,pasengers,departure,arrival} = req.body;
      
      const cor = await FlightModel.findByIdAndUpdate(FlightID, {flight_no,flight_name,flight_type,pasengers,departure,arrival});
  
    } catch (error) { 
      res.status(400).json(error.message);
    }
  }

  //deleteResult
  const removerFlight = async (req,res) => {
    const FlightID = req.params.id;
  
    try{
      const crs = await FlightModel.findById(FlightID);
      if(!crs){
        return res.status(404).json("There is no flight Result to remove");
      }
  
      const removerFlight = await FlightModel.findByIdAndDelete(FlightID);
      res.status(200).json(removerFlight)
    }catch(error){
      res.status(400).json(error.message);
  
    }
  }


  //get spesific

  const getSpecFlight = async (req,res) => {

    let FlightID = req.params.id;
    const flight = await  FlightModel.findById(FlightID)
        .then((flight) => {

            res.status(200).send({status: "search success",flight})

        }).catch(() => {

            console.log(err.message);
            res.status(500).send({status: "Error ", error: err.message});

        })

}



  module.exports ={
    addFlight,
    getFlight,
    UpdateFlight,
    removerFlight,
    getSpecFlight,
    
  }