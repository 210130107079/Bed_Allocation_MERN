import {Room} from '../models/Room.js'

export const getAllAvailableBeds = async (req,res) => {
    try {
        const rooms = await Room.find();
        const availableBeds = rooms.map(room => {
          return {
            roomNumber: room.roomNumber,
            beds: room.beds.filter(bed => !bed.isOccupied).map(bed => bed.bedNumber)
          };
        });
        
        res.json(availableBeds);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}