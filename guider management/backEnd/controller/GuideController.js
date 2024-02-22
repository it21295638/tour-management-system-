const GuideModel = require("../model/GuideModel");


const addGuide = (req, res) => {

    const {guidence_id,guidence_name,guidence_age,guidence_nic,guidence_description} = req.body;

    const addguide = new GuideModel({
        guidence_id,
        guidence_name,
        guidence_age,
        guidence_nic,
        guidence_description,
        
    });

//addFlight
    addguide.save().then((makeguide)=>{
        res.json(makeguide);
    }).catch((err)=>{
        console.log(console.error);     
    });
};

//getAllFlight
const getGuide = async (req, res) => {
  
    try{
      const cors = await GuideModel.find();
      res.json(cors);
  
    }catch(error){
      res.status(400).json(error);
    }
  }

//update
  const UpdateGuide = async (req, res) => {
    const GuideID = req.params.id;
  
    try {
      const cRs = await GuideModel.findById(GuideID);
  
      if(!cRs){
        return res.status(404).json("There is a no Guide ID");
      }
  
      const {guidence_id,guidence_name,guidence_age,guidence_nic,guidence_description} = req.body;
      
      const cor = await GuideModel.findByIdAndUpdate(GuideID, {guidence_id,guidence_name,guidence_age,guidence_nic,guidence_description});
  
    } catch (error) { 
      res.status(400).json(error.message);
    }
  }

  //deleteResult
  const removerGuide = async (req,res) => {
    const GuideID = req.params.id;
  
    try{
      const crs = await GuideModel.findById(GuideID);
      if(!crs){
        return res.status(404).json("There is no flight Result to remove");
      }
  
      const removerGuide = await GuideModel.findByIdAndDelete(GuideID);
      res.status(200).json(removerGuide)
    }catch(error){
      res.status(400).json(error.message);
  
    }
  }


  //get spesific

  const getSpecGuide = async (req,res) => {

    let GuideID = req.params.id;
    const guide = await  GuideModel.findById(GuideID)
        .then((guide) => {

            res.status(200).send({status: "search success",guide})

        }).catch(() => {

            console.log(err.message);
            res.status(500).send({status: "Error ", error: err.message});

        })

}



  module.exports ={
    addGuide,
    getGuide,
    UpdateGuide,
    removerGuide,
    getSpecGuide,
    
  }