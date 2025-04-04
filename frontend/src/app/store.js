import {configureStore} from '@reduxjs/toolkit'
import doctorReducer from '../redux/doctorSlice.js'
import patientReducer from '../redux/patientSlice.js'

export const store = configureStore({
    reducer:{
        doctors:doctorReducer,
        patients:patientReducer,
    }
})