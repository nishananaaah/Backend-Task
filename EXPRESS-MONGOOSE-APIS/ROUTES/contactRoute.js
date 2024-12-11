//Conatct routes
// CRUD api

const express = require("express");
const router = express.Router();
const Contact = require("../MODELS/contactModel");

//CREATE Functionality
router.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact
      .save()
      .then((savedContact) => {
        console.log(savedContact);
        res.status(201).json({ message: "Contact saved Successfully" });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 11000 && error.keyPattern.emailAddress) {
          //we can write custome messages
          res.status(500).json({ message: "Email Address already in use" });
        } else {
          res.status(500).json({ message: "Unable to create new  contact " });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to save new  contact" });
  }
});

//READ Functionality - Read all contacts
router.get("/contact", async (req, res) => {
  try {
    Contact.find()
      .then((contacts) => {
        console.log(contacts);
        res.status(200).json({ contacts: contacts });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Unable to get contacts" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to get contacts" });
  }
});

//Read specific contact - getbyID
router.get("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "idddddddddd");

    Contact.findById(id)
      .then((contact) => {
        console.log(contact);
        res.status(200).json({ contact: contact });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Unable to find the contact" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to find the contact" });
  }
});

//Search functionality - Search contacts
router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    console.log(searchTerm)
    const searchRegex = RegExp(searchTerm, "i"); // casesensitive i-converted to lowercase
    await Contact.find({//match these any of the fields return the data
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { emailAddress: searchRegex },
      ],
    })
    .then((contacts)=>{
        if(contacts.length){
            res.status(200).json({contacts:contacts})
        }else{
            res.status(500).json({contact:[],message:"No matching record found"})
        }
        res.status(200).json({contacts:contacts})


    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({message:"Unable to find contacts"})
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No matching records found" });
  }
});

//UPDATE - Functionality
router.put("/contact/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const updatedContact= req.body;
        await Contact.findOneAndUpdate({_id:id},updatedContact,{new:true})//if it didnt find anaything creating a new  one
        .then((updatedContact)=>{
            console.log(updatedContact);
            res.status(200).json({message:"Contact updated successfully",contact:updatedContact})

        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({message:"Unable to update the contact"})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Unable to update the contact"})
        
    }
})

module.exports = router;
