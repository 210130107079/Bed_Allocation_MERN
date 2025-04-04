import { Patient } from "../models/Patient.js";
import { Room } from "../models/Room.js";


// Get Admitted patients
export const getAdmittedPatients = async (req,res) => {
    try {
        const patients = await Patient.find({dischargeDate:null})
        res.json(patients);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

//Get Discharged Patients
export const getDischargedPatients = async (req,res) => {
    try
  {

    let filter = {
      dischargeDate: { $ne:null},
      // name:{$ne:"Bhavya"}
      // age:{$eq:21},
      // doctorName:{$eq:"Ajay Bhai"}
    }
    // const limit = req.query.limit
    const page = req.query.page
    const patients = await Patient.paginate(filter,{limit:8,page:page})
    res.json(patients)
  }
  catch(error)
  {
    res.status(500).json({ message: error.message });
  }
}

//Get All The Patients
export const getAllPatients = async (req,res) => {
    try
      {
        const patients = await Patient.find()
        res.json(patients)
      }
      catch(error)
      {
        res.status(500).json({ message: error.message });
      }
}

//Admin A Patient
export const admitPatient = async (req,res) => {
    const { name, age, roomNumber, bedNumber, totalDays , doctorName } = req.body;
      
      try {
        // Check if the bed is available
        const room = await Room.findOne({ roomNumber });
        
        if (!room) {
          return res.status(404).json({ message: 'Room not found' });
        }
        
        const bedIndex = room.beds.findIndex(bed => bed.bedNumber === bedNumber && !bed.isOccupied);
        
        if (bedIndex === -1) {
          return res.status(400).json({ message: 'Bed is not available' });
        }
        
        // Create a new patient
        const patient = new Patient({
          name,
          age,
          roomNumber,
          bedNumber,
          totalDays,
          doctorName,
          admissionDate: new Date()
        });
        
        // Mark the bed as occupied
        room.beds[bedIndex].isOccupied = true;
        
        await room.save();
        await patient.save();
        
        res.status(201).json(patient);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

//Discharge A Patient
export const dischargePatient = async (req,res) => {
    try {
        console.log(req.params.id);
        const patient = await Patient.findById(req.params.id);
        console.log(patient);
        
        if (!patient) {
          return res.status(404).json({ message: 'Patient not found' });
        }
        
        if (patient.dischargeDate) {
          return res.status(400).json({ message: 'Patient already discharged' });
        }
        
        // Update patient discharge date
        patient.dischargeDate = new Date();
        await patient.save();
        
        // Free up the bed
        const room = await Room.findOne({ roomNumber: patient.roomNumber });
        const bedIndex = room.beds.findIndex(bed => bed.bedNumber === patient.bedNumber);
        
        if (bedIndex !== -1) {
          room.beds[bedIndex].isOccupied = false;
          await room.save();
        }
        
        res.json(patient);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

//