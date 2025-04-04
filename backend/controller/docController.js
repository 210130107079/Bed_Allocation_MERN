import { Doctor } from '../models/Doctor.js';
import cloudinary from '../config/cloudInary.js'

//Add New Doctor
export const addNewDoctor = async (req,res) =>{
  if(!req.file){
    return res.status(400).json({ message: "No file uploaded!" });
  }
  const { profileImage } = req.file
  try
  {
    const profileImage_url = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' });
    if (!profileImage_url) {
      return res.status(500).json({ message: "Error Uploading the Image!" });
    }

    const { name, age, degree } = req.body;
    const doctorExists = await Doctor.findOne({ name })
    if (doctorExists) {
        return res.status(409).json({ message: 'Doctor Already Exists!' });
    }

    const newDoctor = new Doctor({name,age,degree,profileImage:profileImage_url.secure_url})
    await newDoctor.save();
    res.status(201).json({ newDoctor, message: "Doctor Added Successfully!" });
    console.log(newDoctor)
  }
  catch(error)
  {
    res.status(500).json({ message: error.message })
  }
}

//Get All Doctor
export const getAllDoctor = async (req,res) => {
    try
      {
        const doctors = await Doctor.find()
        res.json(doctors)
      }
      catch(error)
      {
        res.status(500).json({ message: error.message });
      }
}

export const updateProfilePic = async (req,res) => {
  try
  {
    const doctorId = req.params.id
    if(!doctorId){
      return res.status(400).json({ message: "Doctor not Found!" });
    }

    const doctor = await Doctor.findById(doctorId)
    if(!doctor){
      return res.status(404).json({ message: "Doctor not Found!" });
    }

    if(doctor.profileImage){
      const start = doctor.profileImage.lastIndexOf("/") + 1;
      const end = doctor.profileImage.lastIndexOf(".");
      const public_id = doctor.profileImage.slice(start, end)
      await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }
    const profileImageUpload = await cloudinary.uploader.upload(req.file.path,{ resource_type: 'image' });
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId,{profileImage:profileImageUpload.secure_url},{new:true})
    res.status(200).json({ updatedDoctor, message: "Profile Pic Updated Successfully!" });
  }
  catch(error)
  {
    res.status(500).json({ message: error.message })
    console.log("Error in Doctor Profile Pic Update Route !");
  }
}