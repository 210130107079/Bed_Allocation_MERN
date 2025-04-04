import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Room } from './models/Room.js';
import bedsRouter from './routes/bedRoutes.js'
import patientRouter from './routes/patientRoutes.js'
import docRouter from './routes/docRoutes.js'

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))


// Connect to MongoDB
mongoose.connect('mongodb+srv://sohamtarabada2003:soham9898@cluster0.hgodl.mongodb.net/bed_db?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Initialize rooms and beds if they don't exist
async function initializeRoomsAndBeds() {
  const roomCount = await Room.countDocuments();
  
  if (roomCount === 0) {
    const rooms = [
      { roomNumber: 101, totalBeds: 30 },
      { roomNumber: 102, totalBeds: 30 },
      { roomNumber: 103, totalBeds: 30 }
    ];
    
    for (const room of rooms) {
      const newRoom = new Room(room);
      const beds = [];
      
      for (let i = 1; i <= room.totalBeds; i++) {
        beds.push({
          bedNumber: i,
          isOccupied: false
        });
      }
      
      newRoom.beds = beds;
      await newRoom.save();
    }
    
    console.log('Rooms and beds initialized');
  }
}

initializeRoomsAndBeds();


//Routes
app.use('/api/beds',bedsRouter)
app.use('/api/patients',patientRouter)
app.use('/api/doctor',docRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});