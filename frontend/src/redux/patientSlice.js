import { createSlice , createAsyncThunk, current } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAvailableBeds = createAsyncThunk('/beds/fetch',async () => {
    try
    {
        const response = await axios.get('http://localhost:5000/api/beds/available')
        return response.data;
    }
    catch(error)
    {
        console.log(error);
        console.log("Error Fetching Available Beds !")
    }
})

export const admitPatient = createAsyncThunk('/patient/admit', async (patientData) => {
    try {
        const res = await axios.post('http://localhost:5000/api/patients/admit',{
            name:patientData.name,
            age:patientData.age,
            roomNumber:patientData.roomNumber,
            bedNumber:parseInt(patientData.bedNumber),
            totalDays:patientData.totalDays,
            doctorName:patientData.doctorName,
        });
        return res.data;
    } catch (error) {
        console.error("Error admitting patient")
    }
});

export const fetchAdmittedPatients = createAsyncThunk('/patients/admitted',async()=>{
    try
    {
        const responseAdmitted = await axios.get('http://localhost:5000/api/patients/admitted')
        return responseAdmitted.data
    }
    catch(error)
    {
        console.log(error);
        console.log("Error Fetching Admitted Patients Data !");
    }
})

export const dischargePatient = createAsyncThunk('patient/discharge',async(id,dispatch)=>{
    try
    {
        await axios.put(`http://localhost:5000/api/patients/${id}/discharge`)
        dispatch(fetchAdmittedPatients())
    }
    catch(error)
    {
        console.log(error);
        console.log("Error while Discharging Patient !");
    }
})

export const fetchDischargedPatients = createAsyncThunk('/patients/fetch-discharged',async(page)=>{
    try
    {
        const responseDischarged = await axios.get(`http://localhost:5000/api/patients/discharged?page=${page}`)
        return responseDischarged.data

    }
    catch(error)
    {
        console.log(error);
        console.log("Error Fetching Discharged Patients Data !");
    }
})

export const fetchAll = createAsyncThunk('/patients/add',async()=>{
    try
    {
        const responseAll = await axios.get('http://localhost:5000/api/patients/all')
        return responseAll.data
    }
    catch(error)
    {
        console.log(error);
        console.log("Error Fetching Patients Data !");
    }
})


const patientSlice = createSlice({
    name:'patients',
    initialState:{
        availableRooms:[],
        listOne:[],
        listTwo:[],
        listThree:[],
        loading:false,
        error:null,
        success:null,
        totalPages:null
    },
    reducer:{},

    extraReducers:(builder) => {
        builder
            .addCase(fetchAvailableBeds.pending , (state) => {
                state.loading = true
            })
            .addCase(fetchAvailableBeds.fulfilled , (state,action) => {
                state.loading = false
                state.availableRooms = action.payload
            })
            .addCase(fetchAvailableBeds.rejected , (state,action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(admitPatient.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(fetchAdmittedPatients.pending,(state)=>{
                state.loading = true
            })
            .addCase(fetchAdmittedPatients.fulfilled , (state,action) =>{
                state.loading = false
                state.list = action.payload
            })
            .addCase(fetchAdmittedPatients.rejected , (state,action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(dischargePatient.pending , (state) => {
                state.loading = true
            })
            .addCase(dischargePatient.fulfilled , (state,action) => {
                state.loading = false
                state.success = "Patient Discharged Successfully !"
                state.error = null
            })
            .addCase(dischargePatient.rejected , (state,action) => {
                state.success = false
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchDischargedPatients.pending , (state) => {
                state.loading = true
            })
            .addCase(fetchDischargedPatients.fulfilled , (state,action) => {
                state.error = null
                state.loading = false
                state.listTwo = action.payload
                state.totalPages = action.payload.totalPages
            })
            .addCase(fetchDischargedPatients.rejected , (state,action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(fetchAll.pending , (state) => {
                state.loading = true
            })
            .addCase(fetchAll.fulfilled , (state,action) => {
                state.loading = false
                state.listThree = action.payload
            })
            .addCase(fetchAll.rejected , (state,action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default patientSlice.reducer