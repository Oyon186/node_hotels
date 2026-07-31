const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


//POST route to add a person
router.post('/',async (req,res)=>{
  try{
    const data = req.body;//assuming the request body contains the person data
    //create a new Person document using the mongoose model
    const newPerson = new Person(data);
    //save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})

//Get route to get data of a person
router.get('/:workType',async (req,res)=>{
  try{
    const workType = req.params.workType;//Extract the workType from the URL parameter
    if(workType=='chef'||workType=='manager'||workType=='waiter'){
    const response = await Person.find({work:workType});
    console.log('response fatched');
    res.status(200).json(response);
    }else{
      res.status(404).json({error:'Invalid work type'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})

//update operation
router.put('/:id',async(req,res)=>{
  try{
    const personId=req.params.id;//Extract the id from the URL parameter
    const UpdatedPersonData = req.body;//updated data for the person
    const response = await Person.findByIdAndUpdate(personId,UpdatedPersonData,{
      new:true,//return the updated document
      runValidators:true,//run mongoose validation
    })
    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log('data updated');
    res.status(200).json(response);
  }catch(err){
     console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})

//delete operation
router.delete('/:id',async(req,res)=>{
  try{
    const personId=req.params.id;//Extract the id from the URL parameter
    //assuming you have a person model
    const response = await Person.findByIdAndRemove(personId,{
    })
    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log('data deleted');
    res.status(200).json({message:"Person deleted successfully"});
  }catch(err){
     console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})


module.exports = router;