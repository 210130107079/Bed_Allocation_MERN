import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios' 

export const fetchDoctor = createAsyncThunk('/doctor/fetch',async () => {
        try
        {
            const response = await axios.get('http://localhost:5000/api/doctor/get-doctors')
            return response.data
        }
        catch(error)
        {
            console.log(error.response?.data?.message);
            console.log("Error Fetching Doctors !");
        }
    }
)

export const addDoctor = createAsyncThunk('/doctor/add',async ({name,age,degree,profileImage}) => {
    try
    {
        const formData = new FormData()
        formData.append('name', name);
        formData.append('age', age);
        formData.append('degree', degree);
        formData.append('profileImage', profileImage);
        await axios.post('http://localhost:5000/api/doctor/add',formData,{headers: { 'Content-Type': 'multipart/form-data' }})
        console.log('Doctor Added Successfully');
        return 'Doctor Added Successfully!';
    }
    catch(error)
    {
        console.log(error);
        console.log("Error Adding a New Doctor !");
    }
})

export const updateDoctorProfilePicture = createAsyncThunk('/doctor/update',async ({id,profileImage}) => {

    try
    {
        const formData = new FormData();
        formData.append('profileImage', profileImage);

        const response = await axios.post(`http://localhost:5000/api/doctor/${id}/update-p-pic`,profileImage,{
            headers:{ "Content-Type": "multipart/form-data" }
        })
        return {
            data: response.data,
            message: "Doctor Profile Pic Updated Successfully",
        }
    }
    catch(error)
    {
        console.log(error);
        console.log("Error Updating Doctor's Profile Picture !");
    }
})

const doctorSlice = createSlice({
    name:'doctors',
    initialState:{
        doctorList:[],
        loading:false,
        error:null,
        success:null,
    },
    reducers:{
        clearStatus:(state) => {
            state.error='';
            state.success='';
        }
    },

    extraReducers:(builder) => {
        builder
            .addCase(fetchDoctor.pending , (state) => {
                state.loading = true
                state.error = ''
            })
            .addCase(fetchDoctor.fulfilled , (state,action) => {
                state.loading = false;
                state.doctorList = action.payload
            })
            .addCase(fetchDoctor.rejected , (state,action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(addDoctor.pending , (state) => {  
                state.loading = true
                state.error = ''   
            })
            .addCase(addDoctor.fulfilled , (state,action) => {
                state.loading = false
                state.success = action.payload
            })
            .addCase(addDoctor.rejected , (state,action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(updateDoctorProfilePicture.pending,(state) => {
                state.loading = true
            })
            .addCase(updateDoctorProfilePicture.fulfilled,(state,action) => {
                const updatedDoc = action.payload
                state.doctorList = state.doctorList.map((doctor)=>{
                    doctor._id === action.payload._id ? action.payload : doctor
                })
                state.success = action.payload.message
                state.loading = false
            })
            .addCase(updateDoctorProfilePicture.rejected,(state,action) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export const {clearStatus} = doctorSlice.actions
export default doctorSlice.reducer